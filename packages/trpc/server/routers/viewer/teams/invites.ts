import type { PrismaClient } from "@calcom/prisma";
import type { MembershipRole } from "@calcom/prisma/enums";
import { TRPCError } from "@trpc/server";

// Sprint 11.1A — authenticated team-invite administration (owner/admin only).
// Extracted from _router.tsx so the authorization/isolation rules are unit
// testable without the tRPC session middleware. A team invite has two forms:
//   - pending membership: Membership.accepted === false (no expiry)
//   - invite link:        VerificationToken with teamId (has expiry)
// None of these functions ever return VerificationToken.token — the id is the
// only identifier that leaves the server.

const canManage = (role: MembershipRole) => role === "OWNER" || role === "ADMIN";

function assertCanManage(role: MembershipRole, action: string) {
  if (!canManage(role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: `Only team owners and admins can ${action}.` });
  }
}

export async function listTeamInvites({
  prisma,
  teamId,
  callerRole,
}: {
  prisma: PrismaClient;
  teamId: number;
  callerRole: MembershipRole;
}) {
  assertCanManage(callerRole, "view invites");

  const [pending, tokens] = await Promise.all([
    prisma.membership.findMany({
      where: { teamId, accepted: false },
      select: {
        id: true,
        role: true,
        createdAt: true,
        user: { select: { id: true, email: true, name: true } },
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    }),
    prisma.verificationToken.findMany({
      // token deliberately NOT selected — never leaves the server
      where: { teamId },
      select: { id: true, expires: true, expiresInDays: true, createdAt: true },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    }),
  ]);

  const now = new Date();
  return {
    pendingMembers: pending.map((m) => ({
      membershipId: m.id,
      userId: m.user.id,
      email: m.user.email,
      name: m.user.name,
      role: m.role,
      createdAt: m.createdAt,
    })),
    inviteLinks: tokens.map((t) => ({
      id: t.id,
      expires: t.expires,
      expiresInDays: t.expiresInDays,
      createdAt: t.createdAt,
      isExpired: t.expires <= now,
    })),
  };
}

export async function deleteTeamInvite({
  prisma,
  teamId,
  callerRole,
  membershipId,
  tokenId,
}: {
  prisma: PrismaClient;
  teamId: number;
  callerRole: MembershipRole;
  membershipId?: number;
  tokenId?: number;
}) {
  assertCanManage(callerRole, "revoke invites");

  if ((membershipId == null) === (tokenId == null)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Provide exactly one of membershipId or tokenId." });
  }

  if (membershipId != null) {
    // Only a PENDING membership of THIS team may be removed here.
    const target = await prisma.membership.findFirst({
      where: { id: membershipId, teamId, accepted: false },
      select: { id: true },
    });
    if (!target) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Pending invite not found for this team." });
    }
    await prisma.membership.delete({ where: { id: target.id } });
    return { success: true };
  }

  const token = await prisma.verificationToken.findFirst({
    where: { id: tokenId, teamId },
    select: { id: true },
  });
  if (!token) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Invite link not found for this team." });
  }
  await prisma.verificationToken.delete({ where: { id: token.id } });
  return { success: true };
}

export async function setTeamInviteExpiration({
  prisma,
  teamId,
  callerRole,
  tokenId,
  expiresInDays,
}: {
  prisma: PrismaClient;
  teamId: number;
  callerRole: MembershipRole;
  tokenId: number;
  // 0 = expire immediately (explicit action); >0 = now + N days.
  expiresInDays: number;
}) {
  assertCanManage(callerRole, "change invite expiration");

  const token = await prisma.verificationToken.findFirst({
    where: { id: tokenId, teamId },
    select: { id: true },
  });
  if (!token) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Invite link not found for this team." });
  }

  const expires = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
  await prisma.verificationToken.update({
    where: { id: token.id },
    data: { expires, expiresInDays },
    // token is not touched — same link stays valid, only its expiry changes
  });
  return { id: token.id, expires, expiresInDays };
}
