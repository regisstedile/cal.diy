import prisma from "@calcom/prisma";
import { MembershipRole } from "@calcom/prisma/enums";

export type TeamWithMembers = Awaited<ReturnType<typeof getTeamWithMembers>>;

export async function getTeamWithMembers(_args: {
  id?: number;
  slug?: string;
  userId?: number;
  orgSlug?: string | null;
  isTeamView?: boolean;
  isOrgView?: boolean;
}) {
  return null;
}

export async function isTeamOwner(userId: number, teamId: number) {
  return !!(await prisma.membership.findFirst({
    where: { userId, teamId, role: MembershipRole.OWNER },
  }));
}
