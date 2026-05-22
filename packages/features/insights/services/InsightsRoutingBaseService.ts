import type { TypedColumnFilter } from "@calcom/features/data-table/lib/types";
import {
  isMultiSelectFilterValue,
  isNumberFilterValue,
  isSingleSelectFilterValue,
  isTextFilterValue,
} from "@calcom/features/data-table/lib/utils";
import { TeamRepository } from "@calcom/features/insights/lib/repositories/TeamRepository";
import type { DateRange } from "@calcom/features/insights/server/insightsDateUtils";
import type { PrismaClient } from "@calcom/prisma";
import type { Prisma } from "@calcom/prisma/client";
import type { BookingStatus } from "@calcom/prisma/enums";
import type { FilterType } from "@calcom/types/data-table";
import { z } from "zod";

export const insightsRoutingServiceOptionsSchema = z.discriminatedUnion("scope", [
  z.object({
    scope: z.literal("user"),
    userId: z.number(),
    orgId: z.number().nullish().optional(),
  }),
  z.object({
    scope: z.literal("org"),
    userId: z.number(),
    orgId: z.number(),
  }),
  z.object({
    scope: z.literal("team"),
    userId: z.number(),
    orgId: z.number().nullish().optional(),
    teamId: z.number(),
  }),
]);

export type InsightsRoutingServicePublicOptions = {
  scope: "user" | "org" | "team";
  userId: number;
  orgId: number | null | undefined;
  teamId?: number;
};

export type InsightsRoutingServiceOptions = z.infer<typeof insightsRoutingServiceOptionsSchema>;

export type InsightsRoutingServiceFilterOptions = {
  startDate: string;
  endDate: string;
  columnFilters?: TypedColumnFilter<FilterType>[];
};

type RoutingFormResponseField = {
  fieldId: string | null;
  valueString: string | null;
  valueStringArray: string[] | null;
  valueNumber: number | null;
};

export type InsightsRoutingTableItem = {
  id: number;
  uuid: string | null;
  formId: string;
  formName: string;
  formTeamId: number | null;
  formUserId: number;
  bookingUid: string | null;
  bookingId: number | null;
  bookingUserId: number | null;
  bookingUserName: string | null;
  bookingUserEmail: string | null;
  bookingUserAvatarUrl: string | null;
  bookingStatus: BookingStatus | null;
  bookingStatusOrder: number | null;
  bookingCreatedAt: Date | null;
  bookingAssignmentReason: string | null;
  bookingAttendees: {
    name: string;
    email: string;
    phoneNumber: string | null;
  }[];
  fields: RoutingFormResponseField[];
  createdAt: Date | string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_term: string | null;
  utm_content: string | null;
  utm_campaign: string | null;
  [key: string]: unknown;
};

export type InsightsRoutingPeriodStat = {
  userId: number;
  period_start: Date;
  total: number;
};

export type InsightsRoutingPeriodUser = {
  id: number;
  name: string | null;
  avatarUrl: string | null;
  performance: "above_average" | "below_average" | "median" | "at_average" | null;
  totalBookings: number;
};

type ResponseJson = Record<string, { value?: unknown } | undefined>;

type ResponseWithForm = Prisma.App_RoutingForms_FormResponseGetPayload<{
  include: { form: { select: { id: true; name: true; teamId: true; userId: true } } };
}>;

const EMPTY_ROUTING_PERIOD_DATA = {
  users: { data: [] as InsightsRoutingPeriodUser[], total: 0 },
  periodStats: { data: [] as InsightsRoutingPeriodStat[] },
  total: 0,
};

const getFormIdFilter = (
  filters: InsightsRoutingServiceFilterOptions["columnFilters"]
): string | undefined => {
  const filter = filters?.find((columnFilter) => columnFilter.id === "formId");
  if (!filter || !isSingleSelectFilterValue(filter.value)) return undefined;
  return typeof filter.value.data === "string" ? filter.value.data : undefined;
};

const fieldFromValue = (fieldId: string, value: unknown): RoutingFormResponseField => {
  if (Array.isArray(value)) {
    return { fieldId, valueString: null, valueStringArray: value.map(String), valueNumber: null };
  }
  if (typeof value === "number") {
    return { fieldId, valueString: null, valueStringArray: null, valueNumber: value };
  }
  return {
    fieldId,
    valueString: value == null ? null : String(value),
    valueStringArray: null,
    valueNumber: null,
  };
};

const matchesText = (value: string | null, data: string, operator: string) => {
  const haystack = value?.toLowerCase() ?? "";
  const needle = data.toLowerCase();
  if (operator === "equals") return haystack === needle;
  if (operator === "notEquals") return haystack !== needle;
  if (operator === "notContains") return !haystack.includes(needle);
  return haystack.includes(needle);
};

// cal.diy keeps routing form responses, but not the enterprise analytics
// denormalized tables. Read the persisted JSON responses directly instead.
export class InsightsRoutingBaseService {
  private prisma: PrismaClient;
  private options: InsightsRoutingServiceOptions | null;
  private filters: InsightsRoutingServiceFilterOptions;

  constructor({
    prisma,
    options,
    filters,
  }: {
    prisma: PrismaClient;
    options: InsightsRoutingServicePublicOptions;
    filters: InsightsRoutingServiceFilterOptions;
  }) {
    this.prisma = prisma;
    const validatedOptions = insightsRoutingServiceOptionsSchema.safeParse(options);
    this.options = validatedOptions.success ? validatedOptions.data : null;
    this.filters = filters;
  }

  async getRoutingFormStats() {
    const responses = await this.findResponses();
    const total = responses.length;
    return { total, totalWithoutBooking: total, totalWithBooking: 0 };
  }

  async getTableData({
    sorting,
    limit,
    offset,
  }: {
    sorting?: Array<{ id: string; desc: boolean }>;
    limit?: number;
    offset?: number;
  }) {
    const data = this.sortTableData(
      (await this.findResponses()).map((response) => this.toTableItem(response)),
      sorting
    );
    const responseOffset = offset ?? 0;
    const responseLimit = limit ?? 100;
    return { data: data.slice(responseOffset, responseOffset + responseLimit), total: data.length };
  }

  async getFailedBookingsByFieldData() {
    return {};
  }

  async getRoutedToPerPeriodData(_params: { period: string; limit?: number; searchQuery?: string }) {
    return EMPTY_ROUTING_PERIOD_DATA;
  }

  async getRoutedToPerPeriodCsvData(_params: { period: string; searchQuery?: string }) {
    return [];
  }

  async getRoutingFunnelData(dateRanges: DateRange[]) {
    const responses = await this.findResponses();
    return dateRanges.map((range) => ({
      name: range.formattedDate,
      formattedDateFull: range.formattedDateFull,
      totalSubmissions: responses.filter((response) => {
        const createdAt = response.createdAt.getTime();
        return (
          createdAt >= new Date(range.startDate).getTime() && createdAt <= new Date(range.endDate).getTime()
        );
      }).length,
      successfulRoutings: 0,
      acceptedBookings: 0,
    }));
  }

  private async getResponseWhere(): Promise<Prisma.App_RoutingForms_FormResponseWhereInput> {
    const formWhere = await this.getFormWhere();
    const formId = getFormIdFilter(this.filters.columnFilters);
    if (formId) formWhere.id = formId;

    return {
      createdAt: { gte: new Date(this.filters.startDate), lte: new Date(this.filters.endDate) },
      form: formWhere,
    };
  }

  private async getFormWhere(): Promise<Prisma.App_RoutingForms_FormWhereInput> {
    if (!this.options) return { id: "__invalid_insights_scope__" };
    if (this.options.scope === "user") return { userId: this.options.userId, teamId: null };
    if (this.options.scope === "team") return { teamId: this.options.teamId };

    const teamRepository = new TeamRepository(this.prisma);
    const childTeams = await teamRepository.findAllByParentId({
      parentId: this.options.orgId,
      select: { id: true },
    });

    return {
      OR: [
        { teamId: { in: [this.options.orgId, ...childTeams.map((team) => team.id)] } },
        { userId: this.options.userId, teamId: null },
      ],
    };
  }

  private async findResponses(): Promise<ResponseWithForm[]> {
    const responses = await this.prisma.app_RoutingForms_FormResponse.findMany({
      where: await this.getResponseWhere(),
      include: { form: { select: { id: true, name: true, teamId: true, userId: true } } },
    });
    return responses.filter((response) => this.matchesColumnFilters(this.toTableItem(response)));
  }

  private toTableItem(response: ResponseWithForm): InsightsRoutingTableItem {
    const responseJson = (response.response ?? {}) as ResponseJson;
    return {
      id: response.id,
      uuid: null,
      formId: response.form.id,
      formName: response.form.name,
      formTeamId: response.form.teamId,
      formUserId: response.form.userId,
      bookingUid: null,
      bookingId: null,
      bookingUserId: null,
      bookingUserName: null,
      bookingUserEmail: null,
      bookingUserAvatarUrl: null,
      bookingStatus: null,
      bookingStatusOrder: null,
      bookingCreatedAt: null,
      bookingAssignmentReason: null,
      bookingAttendees: [],
      fields: Object.entries(responseJson).map(([fieldId, answer]) => fieldFromValue(fieldId, answer?.value)),
      createdAt: response.createdAt,
      utm_source: null,
      utm_medium: null,
      utm_term: null,
      utm_content: null,
      utm_campaign: null,
    };
  }

  private matchesColumnFilters(item: InsightsRoutingTableItem) {
    return (this.filters.columnFilters ?? []).every((filter) => {
      if (filter.id === "formId") return true;
      const field = item.fields.find((answer) => answer.fieldId === filter.id);
      if (!field) return true;

      if (isSingleSelectFilterValue(filter.value)) return field.valueString === String(filter.value.data);
      if (isMultiSelectFilterValue(filter.value)) {
        const selected = new Set(filter.value.data.map(String));
        return field.valueStringArray
          ? field.valueStringArray.some((value) => selected.has(value))
          : field.valueString != null && selected.has(field.valueString);
      }
      if (isNumberFilterValue(filter.value)) {
        const expected = filter.value.data.operand;
        if (field.valueNumber == null || Number.isNaN(expected)) return false;
        if (filter.value.data.operator === "gt") return field.valueNumber > expected;
        if (filter.value.data.operator === "gte") return field.valueNumber >= expected;
        if (filter.value.data.operator === "lt") return field.valueNumber < expected;
        if (filter.value.data.operator === "lte") return field.valueNumber <= expected;
        return field.valueNumber === expected;
      }
      if (isTextFilterValue(filter.value)) {
        return matchesText(field.valueString, filter.value.data.operand, filter.value.data.operator);
      }
      return true;
    });
  }

  private sortTableData(data: InsightsRoutingTableItem[], sorting?: Array<{ id: string; desc: boolean }>) {
    const sort = sorting?.[0];
    const multiplier = sort?.desc === false ? 1 : -1;
    const column = sort?.id === "formName" ? "formName" : sort?.id === "id" ? "id" : "createdAt";

    return data.sort((left, right) => {
      if (column === "id") return (left.id - right.id) * multiplier;
      if (column === "formName") return left.formName.localeCompare(right.formName) * multiplier;
      return (new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()) * multiplier;
    });
  }
}
