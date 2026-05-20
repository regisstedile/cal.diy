import type { Membership } from "@calcom/prisma/client";
import { MembershipRole } from "@calcom/prisma/enums";

export const enum ENTITY_PERMISSION_LEVEL {
  NONE,
  USER_ONLY_WRITE,
  TEAM_READ_ONLY,
  TEAM_WRITE,
}

export function canEditEntity(
  entity: Parameters<typeof getEntityPermissionLevel>[0],
  userId: Parameters<typeof getEntityPermissionLevel>[1]
) {
  const permissionLevel = getEntityPermissionLevel(entity, userId);
  return (
    permissionLevel === ENTITY_PERMISSION_LEVEL.TEAM_WRITE ||
    permissionLevel === ENTITY_PERMISSION_LEVEL.USER_ONLY_WRITE
  );
}

export function getEntityPermissionLevel(
  entity: {
    userId: number | null;
    team: { members: Membership[] } | null;
  },
  userId: number
) {
  if (entity.team) {
    const roleForTeamMember = entity.team.members.find((member) => member.userId === userId)?.role;
    if (roleForTeamMember) {
      const hasWriteAccessToTeam = (
        [MembershipRole.ADMIN, MembershipRole.OWNER] as unknown as MembershipRole
      ).includes(roleForTeamMember);
      if (hasWriteAccessToTeam) {
        return ENTITY_PERMISSION_LEVEL.TEAM_WRITE;
      } else {
        return ENTITY_PERMISSION_LEVEL.TEAM_READ_ONLY;
      }
    }
  }

  const ownedByUser = entity.userId === userId;
  if (ownedByUser) {
    return ENTITY_PERMISSION_LEVEL.USER_ONLY_WRITE;
  }

  return ENTITY_PERMISSION_LEVEL.NONE;
}

async function getMembership(teamId: number | null, userId: number) {
  const { prisma } = await import("@calcom/prisma");

  const team = teamId
    ? await prisma.team.findFirst({
        where: {
          id: teamId,
          members: {
            some: {
              userId,
              accepted: true,
            },
          },
        },
        include: {
          members: {
            select: {
              userId: true,
              role: true,
            },
          },
        },
      })
    : null;
  return team?.members.find((membership) => membership.userId === userId);
}

export async function canCreateEntity({
  targetTeamId,
  userId,
}: {
  targetTeamId: number | null | undefined;
  userId: number;
}) {
  if (targetTeamId) {
    const membership = await getMembership(targetTeamId, userId);
    return membership ? withRoleCanCreateEntity(membership.role) : false;
  }
  return true;
}

export function withRoleCanCreateEntity(role: MembershipRole) {
  return role === "ADMIN" || role === "OWNER";
}

export const entityPrismaWhereClause = ({ userId }: { userId: number }) => ({
  OR: [
    { userId: userId },
    {
      team: {
        members: {
          some: {
            userId: userId,
            accepted: true,
          },
        },
      },
    },
  ],
});

export const areTheySiblingEntitites = ({
  entity1,
  entity2,
}: {
  entity1: { teamId: number | null; userId: number | null };
  entity2: { teamId: number | null; userId: number | null };
}) => {
  if (entity1.teamId) {
    return entity1.teamId === entity2.teamId;
  }
  return !entity2.teamId && entity1.userId === entity2.userId;
};
