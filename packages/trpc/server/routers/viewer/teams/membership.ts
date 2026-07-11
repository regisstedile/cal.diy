import type { PrismaClient } from "@calcom/prisma";
import { TRPCError } from "@trpc/server";

// Sprint 11.2 — self-service membership reads/updates. A user may only view or
// edit their OWN membership (mirrors REF getMembershipbyUser/updateMembership,
// which UNAUTHORIZE when ctx.user.id !== memberId). Extracted here so the
// self-only guard is unit testable without the session middleware.

function assertSelf(callerId: number, memberId: number, action: string) {
  if (callerId !== memberId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `You cannot ${action} memberships that are not your own.`,
    });
  }
}

export async function getOwnMembership({
  prisma,
  callerId,
  teamId,
  memberId,
}: {
  prisma: PrismaClient;
  callerId: number;
  teamId: number;
  memberId: number;
}) {
  assertSelf(callerId, memberId, "view");
  return prisma.membership.findUnique({
    where: { userId_teamId: { userId: memberId, teamId } },
  });
}

// NOTE: updateMembership (REF) writes Membership.disableImpersonation, a column
// that exists in schema.prisma but is NOT applied to the cal_src database (schema
// drift — never migrated, and the generated client doesn't know it either).
// Deferred until the column is applied; porting it now would ship a broken write.
