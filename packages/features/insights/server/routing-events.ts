import mapKeys from "lodash/mapKeys";
import startCase from "lodash/startCase";
import dayjs from "@calcom/dayjs";
import type { InsightsRoutingBaseService } from "@calcom/features/insights/services/InsightsRoutingBaseService";
import { WEBAPP_URL } from "@calcom/lib/constants";
import { readonlyPrisma as prisma } from "@calcom/prisma";
import type { Prisma } from "@calcom/prisma/client";

type RoutingFormInsightsTeamFilter = {
  userId?: number | null;
  teamId?: number | null;
  isAll: boolean;
  organizationId?: number | null;
  routingFormId?: string | null;
};

type RoutingFormHeaderRow = {
  id: string;
  label: string;
  type: string;
  options: { id: string | null; label: string }[] | null;
};

type RoutingField = RoutingFormHeaderRow & { deleted?: boolean };
type WhereForTeamOrAllTeams = Pick<Prisma.App_RoutingForms_FormWhereInput, "id" | "teamId" | "userId">;

const SUPPORTED_FIELD_TYPES = new Set([
  "text",
  "email",
  "phone",
  "textarea",
  "number",
  "select",
  "multiselect",
]);

const parseFields = (forms: { fields: Prisma.JsonValue }[]) => {
  const ids = new Set<string>();
  const fields: RoutingField[] = [];

  for (const form of forms) {
    if (!Array.isArray(form.fields)) continue;
    for (const rawField of form.fields) {
      if (!rawField || typeof rawField !== "object" || Array.isArray(rawField)) continue;
      const field = rawField as Record<string, unknown>;
      if (
        typeof field.id !== "string" ||
        typeof field.label !== "string" ||
        typeof field.type !== "string" ||
        !SUPPORTED_FIELD_TYPES.has(field.type) ||
        ids.has(field.id) ||
        field.deleted === true
      ) {
        continue;
      }
      const options = Array.isArray(field.options)
        ? field.options
            .map((rawOption) => {
              if (!rawOption || typeof rawOption !== "object" || Array.isArray(rawOption)) return null;
              const option = rawOption as Record<string, unknown>;
              if (typeof option.label !== "string") return null;
              return { id: typeof option.id === "string" ? option.id : null, label: option.label };
            })
            .filter((option): option is { id: string | null; label: string } => option !== null)
        : null;
      if ((field.type === "select" || field.type === "multiselect") && !options?.length) continue;

      ids.add(field.id);
      fields.push({ id: field.id, label: field.label, type: field.type, options });
    }
  }

  return fields;
};

class RoutingEventsInsights {
  private static async getWhereForTeamOrAllTeams({
    userId,
    teamId,
    isAll,
    organizationId,
    routingFormId,
  }: RoutingFormInsightsTeamFilter): Promise<WhereForTeamOrAllTeams> {
    let teamIds: number[] = [];
    if (isAll && organizationId) {
      const teamsFromOrg = await prisma.team.findMany({
        where: { parentId: organizationId },
        select: { id: true },
      });
      teamIds = [organizationId, ...teamsFromOrg.map((team) => team.id)];
    } else if (teamId) {
      teamIds = [teamId];
    }

    return {
      ...(teamIds.length ? { teamId: { in: teamIds } } : { userId: userId ?? -1, teamId: null }),
      ...(routingFormId ? { id: routingFormId } : {}),
    };
  }

  static async getRoutingFormsForFilters({
    userId,
    teamId,
    isAll,
    organizationId,
  }: {
    userId: number;
    teamId?: number;
    isAll: boolean;
    organizationId?: number;
  }) {
    return await prisma.app_RoutingForms_Form.findMany({
      where: await this.getWhereForTeamOrAllTeams({ userId, teamId, isAll, organizationId }),
      select: { id: true, name: true, _count: { select: { responses: true } } },
    });
  }

  static async getRoutingFormHeaders(input: RoutingFormInsightsTeamFilter): Promise<RoutingFormHeaderRow[]> {
    const forms = await prisma.app_RoutingForms_Form.findMany({
      where: await this.getWhereForTeamOrAllTeams(input),
      select: { fields: true },
    });
    return parseFields(forms);
  }

  static async getRoutingFormFieldOptions(input: RoutingFormInsightsTeamFilter) {
    return await this.getRoutingFormHeaders(input);
  }

  static async getRoutingFormPaginatedResponsesForDownload({
    headersPromise,
    dataPromise,
    timeZone,
  }: {
    headersPromise: ReturnType<typeof RoutingEventsInsights.getRoutingFormHeaders>;
    dataPromise: ReturnType<typeof InsightsRoutingBaseService.prototype.getTableData>;
    timeZone: string;
  }) {
    const [headers, data] = await Promise.all([headersPromise, dataPromise]);
    const dataWithFlatResponse = data.data.map((item) => {
      const createdAt = new Date(item.createdAt);
      const fields = headers.reduce(
        (acc, header) => {
          const field = item.fields.find((responseField) => responseField.fieldId === header.id);
          if (!field) {
            acc[header.label] = "";
          } else if (header.type === "select") {
            acc[header.label] = header.options?.find((option) => option.id === field.valueString)?.label;
          } else if (header.type === "multiselect") {
            acc[header.label] = (field.valueStringArray ?? [])
              .map((value) => header.options?.find((option) => option.id === value)?.label)
              .filter((label): label is string => label !== undefined)
              .join(", ");
          } else if (header.type === "number") {
            acc[header.label] = field.valueNumber?.toString() ?? "";
          } else {
            acc[header.label] = field.valueString ?? "";
          }
          return acc;
        },
        {} as Record<string, string | undefined>
      );

      return {
        "Booking UID": item.bookingUid,
        "Booking Link": item.bookingUid ? `${WEBAPP_URL}/booking/${item.bookingUid}` : "",
        "Response ID": item.id,
        "Form Name": item.formName,
        "Submitted At": createdAt.toISOString(),
        "Submitted At_date": dayjs(createdAt).tz(timeZone).format("YYYY-MM-DD"),
        "Submitted At_time": dayjs(createdAt).tz(timeZone).format("HH:mm:ss"),
        "Has Booking": item.bookingUid !== null,
        "Booking Status": item.bookingStatus ?? "NO_BOOKING",
        ...mapKeys(fields, (_, key) => startCase(key)),
      };
    });
    return { data: dataWithFlatResponse, total: data.total };
  }
}

export { RoutingEventsInsights };
