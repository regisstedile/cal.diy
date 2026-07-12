import type { PrismaClient } from "@calcom/prisma";
import { MembershipRole } from "@calcom/prisma/enums";
import { TRPCError } from "@trpc/server";
import { organizationSelect } from "./organizationUtils";

const canManageOrganization = (role: MembershipRole) =>
  role === MembershipRole.OWNER || role === MembershipRole.ADMIN;

async function getCurrentOrganizationMembership({
  prisma,
  userId,
}: {
  prisma: PrismaClient;
  userId: number;
}) {
  return prisma.membership.findFirst({
    where: {
      userId,
      accepted: true,
      team: {
        isOrganization: true,
      },
    },
    select: {
      role: true,
      accepted: true,
      team: {
        select: organizationSelect,
      },
    },
  });
}

export async function listCurrentOrganization({ prisma, userId }: { prisma: PrismaClient; userId: number }) {
  const membership = await getCurrentOrganizationMembership({ prisma, userId });

  if (!membership) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "You do not belong to an organization." });
  }

  return {
    ...membership.team,
    role: membership.role,
    user: {
      role: membership.role,
      accepted: membership.accepted,
    },
    canUpdate: canManageOrganization(membership.role),
    features: {
      delegationCredential: false,
    },
  };
}

export async function getOrganizationTeams({ prisma, userId }: { prisma: PrismaClient; userId: number }) {
  const membership = await getCurrentOrganizationMembership({ prisma, userId });

  if (!membership) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You do not belong to an organization." });
  }

  return prisma.team.findMany({
    where: {
      parentId: membership.team.id,
      isOrganization: false,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: [{ name: "asc" }, { id: "asc" }],
  });
}

export async function addOrganizationMembersToTeams({
  prisma,
  userId,
  userIds,
  teamIds,
}: {
  prisma: PrismaClient;
  userId: number;
  userIds: number[];
  teamIds: number[];
}) {
  const membership = await getCurrentOrganizationMembership({ prisma, userId });

  if (!membership) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You do not belong to an organization." });
  }

  if (!canManageOrganization(membership.role)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to add organization members to teams.",
    });
  }

  const uniqueUserIds = Array.from(new Set(userIds));
  const uniqueTeamIds = Array.from(new Set(teamIds));

  const teams = await prisma.team.findMany({
    where: {
      id: { in: uniqueTeamIds },
      parentId: membership.team.id,
      isOrganization: false,
    },
    select: { id: true },
  });

  if (teams.length !== uniqueTeamIds.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "One or more teams were not found in this organization.",
    });
  }

  const orgMembers = await prisma.membership.findMany({
    where: {
      teamId: membership.team.id,
      userId: { in: uniqueUserIds },
      accepted: true,
    },
    select: { userId: true },
  });

  if (orgMembers.length !== uniqueUserIds.length) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "One or more users are not accepted members of this organization.",
    });
  }

  const result = await prisma.membership.createMany({
    data: uniqueTeamIds.flatMap((teamId) =>
      uniqueUserIds.map((memberUserId) => ({
        teamId,
        userId: memberUserId,
        accepted: true,
        role: MembershipRole.MEMBER,
      }))
    ),
    skipDuplicates: true,
  });

  return { success: true, added: result.count };
}
