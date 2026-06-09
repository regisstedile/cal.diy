import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { WatchlistType } from "@calcom/prisma/enums";

import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";
import {
  ZAcceptDeclineInviteInputSchema,
  ZCreateOrganizationInputSchema,
  ZInviteMemberInputSchema,
  ZListMembersInputSchema,
  ZRemoveMemberInputSchema,
  ZSaveSamlConnectionInputSchema,
  ZUpdateMemberRoleInputSchema,
  ZUpdateOrganizationInputSchema,
} from "./schema";

export const organizationsRouter = router({
  getCurrent: authedProcedure.query(async ({ ctx }) => {
    const { getCurrentHandler } = await import("./getCurrent.handler");

    return getCurrentHandler({ ctx });
  }),

  create: authedProcedure.input(ZCreateOrganizationInputSchema).mutation(async ({ ctx, input }) => {
    const { createHandler } = await import("./create.handler");

    return createHandler({ ctx, input });
  }),

  update: authedProcedure.input(ZUpdateOrganizationInputSchema).mutation(async ({ ctx, input }) => {
    const { updateHandler } = await import("./update.handler");

    return updateHandler({ ctx, input });
  }),

  listMembers: authedProcedure.input(ZListMembersInputSchema).query(async ({ ctx, input }) => {
    const { listMembersHandler } = await import("./listMembers.handler");

    return listMembersHandler({ ctx, input });
  }),

  inviteMember: authedProcedure.input(ZInviteMemberInputSchema).mutation(async ({ ctx, input }) => {
    const { inviteMemberHandler } = await import("./inviteMember.handler");

    return inviteMemberHandler({ ctx, input });
  }),

  removeMember: authedProcedure.input(ZRemoveMemberInputSchema).mutation(async ({ ctx, input }) => {
    const { removeMemberHandler } = await import("./removeMember.handler");

    return removeMemberHandler({ ctx, input });
  }),

  updateMemberRole: authedProcedure.input(ZUpdateMemberRoleInputSchema).mutation(async ({ ctx, input }) => {
    const { updateMemberRoleHandler } = await import("./updateMemberRole.handler");

    return updateMemberRoleHandler({ ctx, input });
  }),

  listPendingInvites: authedProcedure.query(async ({ ctx }) => {
    const { listPendingInvitesHandler } = await import("./listPendingInvites.handler");

    return listPendingInvitesHandler({ ctx });
  }),

  acceptInvite: authedProcedure.input(ZAcceptDeclineInviteInputSchema).mutation(async ({ ctx, input }) => {
    const { acceptInviteHandler } = await import("./acceptInvite.handler");

    return acceptInviteHandler({ ctx, input });
  }),

  declineInvite: authedProcedure.input(ZAcceptDeclineInviteInputSchema).mutation(async ({ ctx, input }) => {
    const { declineInviteHandler } = await import("./declineInvite.handler");

    return declineInviteHandler({ ctx, input });
  }),

  getSamlSettings: authedProcedure.query(async ({ ctx }) => {
    const { getSamlSettingsHandler } = await import("./saml.handler");

    return getSamlSettingsHandler({ ctx });
  }),

  saveSamlConnection: authedProcedure.input(ZSaveSamlConnectionInputSchema).mutation(async ({ ctx, input }) => {
    const { saveSamlConnectionHandler } = await import("./saml.handler");

    return saveSamlConnectionHandler({ ctx, input });
  }),

  deleteSamlConnection: authedProcedure.mutation(async ({ ctx }) => {
    const { deleteSamlConnectionHandler } = await import("./saml.handler");

    return deleteSamlConnectionHandler({ ctx });
  }),

  getOtherTeam: authedProcedure
    .input(z.object({ teamId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { findCurrentOrganizationMembership } = await import("./organizationUtils");
      const membership = await findCurrentOrganizationMembership({ userId: ctx.user.id });
      if (!membership) throw new TRPCError({ code: "NOT_FOUND" });
      return ctx.prisma.team.findFirst({
        where: { id: input.teamId, parentId: membership.team.id },
        select: {
          id: true, name: true, slug: true, bio: true, logoUrl: true,
          isPrivate: true, metadata: true,
          parent: { select: { slug: true } },
          members: { select: { role: true, accepted: true, userId: true } },
        },
      });
    }),

  getMembers: authedProcedure
    .input(z.object({ teamIdToExclude: z.number().optional(), distinctUser: z.boolean().optional() }))
    .query(async ({ ctx }) => {
      const { findCurrentOrganizationMembership } = await import("./organizationUtils");
      const membership = await findCurrentOrganizationMembership({ userId: ctx.user.id });
      if (!membership) return [];
      return ctx.prisma.membership.findMany({
        where: { teamId: membership.team.id, accepted: true },
        select: {
          userId: true, role: true,
          user: { select: { id: true, name: true, email: true, username: true, avatarUrl: true } },
        },
      });
    }),

  listOtherTeamMembers: authedProcedure
    .input(z.object({ teamId: z.number(), limit: z.number().optional(), cursor: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { findCurrentOrganizationMembership } = await import("./organizationUtils");
      const orgMembership = await findCurrentOrganizationMembership({ userId: ctx.user.id });
      if (!orgMembership) throw new TRPCError({ code: "FORBIDDEN" });
      const team = await ctx.prisma.team.findFirst({
        where: { id: input.teamId, parentId: orgMembership.team.id },
        select: { id: true },
      });
      if (!team) throw new TRPCError({ code: "NOT_FOUND" });
      const limit = input.limit ?? 10;
      const members = await ctx.prisma.membership.findMany({
        where: { teamId: team.id, accepted: true },
        take: limit + 1,
        ...(input.cursor && { skip: 1, cursor: { userId_teamId: { userId: input.cursor, teamId: team.id } } }),
        select: {
          id: true, role: true, accepted: true, userId: true,
          user: { select: { id: true, name: true, email: true, username: true, avatarUrl: true } },
        },
      });
      const hasMore = members.length > limit;
      const rawRows = hasMore ? members.slice(0, -1) : members;
      const baseUrl = process.env.NEXT_PUBLIC_WEBAPP_URL ?? "";
      const rows = rawRows.map((m) => ({
        ...m,
        bookerUrl: baseUrl,
        user: {
          ...m.user,
          profile: { id: null as null, username: m.user.username, organizationId: null as null, organization: null as null },
        },
      }));
      const nextCursor = hasMore ? rawRows[rawRows.length - 1].userId : undefined;
      return { rows, nextCursor };
    }),

  listOtherTeams: authedProcedure.query(async ({ ctx }) => {
    const { findCurrentOrganizationMembership } = await import("./organizationUtils");
    const membership = await findCurrentOrganizationMembership({ userId: ctx.user.id });
    if (!membership) return [];
    return ctx.prisma.team.findMany({
      where: { parentId: membership.team.id, isOrganization: false },
      select: { id: true, name: true, slug: true, logoUrl: true, isPrivate: true },
    });
  }),

  deleteTeam: authedProcedure
    .input(z.object({ teamId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { assertCanManageOrganization } = await import("./organizationUtils");
      const membership = await assertCanManageOrganization({ userId: ctx.user.id });
      const team = await ctx.prisma.team.findFirst({
        where: { id: input.teamId, parentId: membership.team.id },
        select: { id: true },
      });
      if (!team) throw new TRPCError({ code: "NOT_FOUND" });
      await ctx.prisma.team.delete({ where: { id: team.id } });
      return { success: true };
    }),

  pendingReportsCount: authedProcedure.query(async () => 0),

  listWatchlistEntries: authedProcedure
    .input(z.object({ limit: z.number().optional(), offset: z.number().optional(), searchTerm: z.string().optional() }))
    .query(async () => ({
      rows: [] as Array<{
        id: string; value: string; type: WatchlistType; description: string | null;
        source?: string; isGlobal?: boolean; isReadOnly?: boolean;
        latestAudit?: { changedByUserId: number | null; changedByUser?: { id: number; email: string; name: string | null } } | null;
      }>,
      meta: { totalRowCount: 0 },
    })),

  listBookingReports: authedProcedure
    .input(z.object({
      limit: z.number().optional(), offset: z.number().optional(),
      searchTerm: z.string().optional(), sortBy: z.string().optional(),
      filters: z.any().optional(),
    }))
    .query(async () => ({
      rows: [] as Array<{
        id: string; bookerEmail: string; reason: string; description: string | null;
        reporter?: { email: string } | null;
        booking: { uid: string; title: string | null };
        organization?: { name: string } | null;
        reportCount: number;
        reports: Array<{ id: string; bookerEmail: string; reason: string; description: string | null; reporter?: { email: string } | null; booking: { uid: string; title: string | null }; organization?: { name: string } | null }>;
      }>,
      meta: { totalRowCount: 0 },
    })),

  getWatchlistEntryDetails: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (): Promise<{
      entry: { id: string; value: string; type: WatchlistType; description: string | null; source?: string; bookingReports?: Array<{ booking: { uid: string; title: string | null } }> };
      auditHistory: Array<{ id: string; value: string; changedAt: Date; changedByUser?: { name: string | null; email: string } | null }>;
    } | undefined> => undefined),

  createWatchlistEntry: authedProcedure
    .input(z.object({ value: z.string(), type: z.string(), description: z.string().optional() }))
    .mutation(async () => ({ success: true })),

  deleteWatchlistEntry: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async () => ({ success: true })),

  addToWatchlist: authedProcedure
    .input(z.object({
      email: z.string().optional(),
      type: z.string().optional(),
      bookingReportId: z.string().optional(),
      value: z.string().optional(),
    }))
    .mutation(async () => ({ success: true })),

  dismissBookingReport: authedProcedure
    .input(z.object({ email: z.string().optional(), id: z.string().optional() }))
    .mutation(async () => ({ success: true })),
});
