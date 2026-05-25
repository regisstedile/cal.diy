import { prisma as defaultPrisma } from "@calcom/prisma";

type PrismaLike = typeof defaultPrisma;

// Minimal TeamRepository stub for workflow feature
export class TeamRepository {
  constructor(private db: PrismaLike = defaultPrisma) {}

  async findById({ id }: { id: number }) {
    return this.db.team.findUnique({ where: { id } });
  }

  async findOrganization({ teamId, userId: _userId }: { teamId?: number | null; userId?: number }) {
    if (!teamId) return null;
    const team = await this.db.team.findUnique({
      where: { id: teamId },
      select: { id: true, parentId: true, isOrganization: true },
    });
    if (!team) return null;
    if (team.isOrganization) return team;
    if (team.parentId) return this.db.team.findUnique({ where: { id: team.parentId } });
    return null;
  }

  async findOrgTeamsExcludingTeam({
    parentId,
    excludeTeamId,
    orgId,
    teamId,
  }: {
    parentId?: number | null;
    excludeTeamId?: number;
    orgId?: number;
    teamId?: number;
  }) {
    const effectiveParentId = parentId ?? orgId;
    const effectiveExclude = excludeTeamId ?? teamId;
    if (!effectiveParentId) return [];
    return this.db.team.findMany({
      where: {
        parentId: effectiveParentId,
        ...(effectiveExclude != null ? { id: { not: effectiveExclude } } : {}),
      },
    });
  }

  async findAllByParentId({ parentId, select: _select }: { parentId: number; select?: Record<string, boolean> }) {
    return this.db.team.findMany({ where: { parentId } });
  }
}
