import { randomBytes } from "node:crypto";
import process from "node:process";
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
const INVITE_EXPIRES_IN_DAYS = 7;

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

export async function createTeamInviteLink({
  prisma,
  teamId,
  callerRole,
  token: requestedToken,
  webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL ?? "",
}: {
  prisma: PrismaClient;
  teamId: number;
  callerRole: MembershipRole;
  token?: string;
  webappUrl?: string;
}) {
  assertCanManage(callerRole, "create invite links");

  const team = await prisma.team.findFirst({
    where: { id: teamId, isOrganization: false },
    select: { id: true },
  });
  if (!team) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Team not found." });
  }

  if (requestedToken) {
    const existingToken = await prisma.verificationToken.findFirst({
      where: { token: requestedToken, teamId },
      select: { token: true },
    });
    if (!existingToken) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Invite link not found for this team." });
    }
    return {
      token: existingToken.token,
      inviteLink: `${webappUrl}/teams?token=${existingToken.token}`,
    };
  }

  const token = randomBytes(32).toString("hex");
  await prisma.verificationToken.create({
    data: {
      identifier: `invite-link-for-teamId-${teamId}`,
      token,
      expires: new Date(Date.now() + INVITE_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
      expiresInDays: INVITE_EXPIRES_IN_DAYS,
      teamId,
    },
  });

  return {
    token,
    inviteLink: `${webappUrl}/teams?token=${token}`,
  };
}

export async function getTeamInviteByToken({ prisma, token }: { prisma: PrismaClient; token: string }) {
  const invite = await prisma.verificationToken.findFirst({
    where: {
      token,
      teamId: { not: null },
      OR: [{ expiresInDays: null }, { expires: { gte: new Date() } }],
    },
    select: {
      teamId: true,
      expires: true,
      team: {
        select: {
          id: true,
          name: true,
          slug: true,
          isOrganization: true,
        },
      },
    },
  });

  if (!invite?.teamId || !invite.team || invite.team.isOrganization) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Invite link not found or expired." });
  }

  return {
    team: {
      id: invite.team.id,
      name: invite.team.name,
      slug: invite.team.slug,
    },
    expires: invite.expires,
  };
}

export async function inviteMemberByToken({
  prisma,
  token,
  userId,
}: {
  prisma: PrismaClient;
  token: string;
  userId: number;
}) {
  const invite = await getTeamInviteByToken({ prisma, token });

  const existingMembership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId, teamId: invite.team.id } },
    select: { id: true },
  });
  if (existingMembership) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "This user is already a member of this team or has a pending invitation.",
    });
  }

  await prisma.membership.create({
    data: {
      createdAt: new Date(),
      teamId: invite.team.id,
      userId,
      role: "MEMBER",
      accepted: false,
    },
  });

  return invite.team;
}
