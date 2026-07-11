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

// NOTE: updateMembership (REF) writes Membership.disableImpersonation, but the
// FORK removed that field from the Membership model — only User has
// disableImpersonation here (schema.prisma:519 is on model User). Membership in
// the fork has no such column (schema and cal_src DB agree). Porting REF's
// updateMembership would require adding the field to the Membership model +
// migration — a product decision, not a bug fix. Deferred. (Verified via
// prisma migrate diff + information_schema, 2026-07-11.)
