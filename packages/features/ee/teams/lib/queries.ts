import prisma from "@calcom/prisma";
import { MembershipRole } from "@calcom/prisma/enums";

export type TeamWithMembers = Awaited<ReturnType<typeof getTeamWithMembers>>;

export async function getTeamWithMembers({
  id,
  slug,
  userId,
}: {
  id?: number;
  slug?: string;
  userId?: number;
  orgSlug?: string | null;
  isTeamView?: boolean;
  isOrgView?: boolean;
}) {
  return prisma.team.findFirst({
    where: {
      ...(id && { id }),
      ...(slug && { slug }),
    },
    select: {
      id: true,
      name: true,
      slug: true,
      bio: true,
      logoUrl: true,
      isPrivate: true,
      isOrganization: true,
      parentId: true,
      metadata: true,
      parent: {
        select: {
          id: true,
          slug: true,
        },
      },
      members: {
        where: userId ? { userId } : undefined,
        select: {
          role: true,
          accepted: true,
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
}

export async function isTeamOwner(userId: number, teamId: number) {
  return !!(await prisma.membership.findFirst({
    where: { userId, teamId, role: MembershipRole.OWNER },
  }));
}
