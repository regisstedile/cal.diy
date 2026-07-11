import type { PrismaClient } from "@calcom/prisma";
import { MembershipRole } from "@calcom/prisma/enums";
import { TRPCError } from "@trpc/server";

// Sprint 11.3 — last-owner protection. A team must always keep at least one
// accepted OWNER. Called before removing a member or lowering a role, so an
// owner can't remove/demote themselves (or another owner) into an ownerless
// team. Extracted from _router.tsx to be unit tested directly.
export async function assertNotLastOwner({
  prisma,
  teamId,
  userId,
}: {
  prisma: PrismaClient;
  teamId: number;
  userId: number;
}) {
  const membership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId, teamId } },
    select: { role: true },
  });

  // Only owners can be "the last owner" — nothing to guard for others.
  if (membership?.role !== MembershipRole.OWNER) return;

  const owners = await prisma.membership.count({
    where: { teamId, accepted: true, role: MembershipRole.OWNER },
  });

  if (owners <= 1) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "A team must have at least one owner." });
  }
}
