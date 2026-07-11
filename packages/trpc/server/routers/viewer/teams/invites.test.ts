import prismaMock from "@calcom/testing/lib/__mocks__/prismaMock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createTeamInviteLink,
  deleteTeamInvite,
  getTeamInviteByToken,
  inviteMemberByToken,
  listTeamInvites,
  setTeamInviteExpiration,
} from "./invites";

const TEAM = 1;
const OTHER_TEAM = 2;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("listTeamInvites", () => {
  it("owner lists pending members and invite links of the team", async () => {
    prismaMock.membership.findMany.mockResolvedValue([
      { id: 5, role: "MEMBER", createdAt: new Date(), user: { id: 9, email: "a@b.c", name: "A" } },
    ] as never);
    prismaMock.verificationToken.findMany.mockResolvedValue([
      { id: 3, expires: new Date(Date.now() + 86400000), expiresInDays: 1, createdAt: new Date() },
    ] as never);

    const res = await listTeamInvites({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER" });

    expect(res.pendingMembers).toHaveLength(1);
    expect(res.pendingMembers[0]).toMatchObject({ membershipId: 5, email: "a@b.c" });
    expect(res.inviteLinks[0]).toMatchObject({ id: 3, isExpired: false });
  });

  it("admin is allowed", async () => {
    prismaMock.membership.findMany.mockResolvedValue([] as never);
    prismaMock.verificationToken.findMany.mockResolvedValue([] as never);
    await expect(
      listTeamInvites({ prisma: prismaMock, teamId: TEAM, callerRole: "ADMIN" })
    ).resolves.toBeDefined();
  });

  it("plain member is forbidden", async () => {
    await expect(
      listTeamInvites({ prisma: prismaMock, teamId: TEAM, callerRole: "MEMBER" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(prismaMock.membership.findMany).not.toHaveBeenCalled();
  });

  it("never selects the raw verification token", async () => {
    prismaMock.membership.findMany.mockResolvedValue([] as never);
    prismaMock.verificationToken.findMany.mockResolvedValue([] as never);
    await listTeamInvites({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER" });
    const call = prismaMock.verificationToken.findMany.mock.calls[0][0];
    expect(call.select).not.toHaveProperty("token");
  });

  it("marks past-expiry links as expired", async () => {
    prismaMock.membership.findMany.mockResolvedValue([] as never);
    prismaMock.verificationToken.findMany.mockResolvedValue([
      { id: 7, expires: new Date(Date.now() - 1000), expiresInDays: 1, createdAt: new Date() },
    ] as never);
    const res = await listTeamInvites({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER" });
    expect(res.inviteLinks[0].isExpired).toBe(true);
  });
});

describe("deleteTeamInvite", () => {
  it("owner revokes a pending membership", async () => {
    prismaMock.membership.findFirst.mockResolvedValue({ id: 5 } as never);
    prismaMock.membership.delete.mockResolvedValue({} as never);
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER", membershipId: 5 })
    ).resolves.toEqual({ success: true });
    // isolation: query scoped to team + accepted:false
    expect(prismaMock.membership.findFirst).toHaveBeenCalledWith({
      where: { id: 5, teamId: TEAM, accepted: false },
      select: { id: true },
    });
  });

  it("plain member cannot revoke", async () => {
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: TEAM, callerRole: "MEMBER", membershipId: 5 })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(prismaMock.membership.delete).not.toHaveBeenCalled();
  });

  it("cannot revoke an accepted membership (findFirst filters accepted:false → not found)", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(null as never);
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER", membershipId: 5 })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(prismaMock.membership.delete).not.toHaveBeenCalled();
  });

  it("cannot revoke an invite link from another team (IDOR)", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue(null as never);
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: OTHER_TEAM, callerRole: "OWNER", tokenId: 3 })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(prismaMock.verificationToken.findFirst).toHaveBeenCalledWith({
      where: { id: 3, teamId: OTHER_TEAM },
      select: { id: true },
    });
    expect(prismaMock.verificationToken.delete).not.toHaveBeenCalled();
  });

  it("rejects when neither id is provided", async () => {
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER" })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects when both ids are provided", async () => {
    await expect(
      deleteTeamInvite({ prisma: prismaMock, teamId: TEAM, callerRole: "OWNER", membershipId: 5, tokenId: 3 })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("setTeamInviteExpiration", () => {
  it("owner sets a future expiry", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue({ id: 3 } as never);
    prismaMock.verificationToken.update.mockResolvedValue({} as never);
    const res = await setTeamInviteExpiration({
      prisma: prismaMock,
      teamId: TEAM,
      callerRole: "OWNER",
      tokenId: 3,
      expiresInDays: 5,
    });
    expect(res.expiresInDays).toBe(5);
    expect(res.expires.getTime()).toBeGreaterThan(Date.now());
    // does not touch the token value
    const updateArg = prismaMock.verificationToken.update.mock.calls[0][0];
    expect(updateArg.data).not.toHaveProperty("token");
  });

  it("expiresInDays=0 expires immediately (explicit action)", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue({ id: 3 } as never);
    prismaMock.verificationToken.update.mockResolvedValue({} as never);
    const before = Date.now();
    const res = await setTeamInviteExpiration({
      prisma: prismaMock,
      teamId: TEAM,
      callerRole: "OWNER",
      tokenId: 3,
      expiresInDays: 0,
    });
    expect(res.expires.getTime()).toBeGreaterThanOrEqual(before - 1000);
    expect(res.expires.getTime()).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it("plain member is forbidden", async () => {
    await expect(
      setTeamInviteExpiration({
        prisma: prismaMock,
        teamId: TEAM,
        callerRole: "MEMBER",
        tokenId: 3,
        expiresInDays: 5,
      })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(prismaMock.verificationToken.update).not.toHaveBeenCalled();
  });

  it("cannot change expiration of another team's link (IDOR)", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue(null as never);
    await expect(
      setTeamInviteExpiration({
        prisma: prismaMock,
        teamId: OTHER_TEAM,
        callerRole: "OWNER",
        tokenId: 3,
        expiresInDays: 5,
      })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(prismaMock.verificationToken.update).not.toHaveBeenCalled();
  });
});

describe("createTeamInviteLink", () => {
  it("creates a new invite token when none is provided", async () => {
    prismaMock.team.findFirst.mockResolvedValue({ id: TEAM } as never);
    prismaMock.verificationToken.create.mockResolvedValue({} as never);

    const res = await createTeamInviteLink({
      prisma: prismaMock,
      teamId: TEAM,
      callerRole: "OWNER",
      webappUrl: "https://cal.test",
    });

    expect(res.token).toHaveLength(64);
    expect(res.inviteLink).toBe(`https://cal.test/teams?token=${res.token}`);
    expect(prismaMock.verificationToken.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        identifier: `invite-link-for-teamId-${TEAM}`,
        token: res.token,
        expiresInDays: 7,
        teamId: TEAM,
      }),
    });
  });

  it("reuses an existing token scoped to the team", async () => {
    prismaMock.team.findFirst.mockResolvedValue({ id: TEAM } as never);
    prismaMock.verificationToken.findFirst.mockResolvedValue({ token: "abc" } as never);

    const res = await createTeamInviteLink({
      prisma: prismaMock,
      teamId: TEAM,
      callerRole: "ADMIN",
      token: "abc",
      webappUrl: "https://cal.test",
    });

    expect(res).toEqual({ token: "abc", inviteLink: "https://cal.test/teams?token=abc" });
    expect(prismaMock.verificationToken.create).not.toHaveBeenCalled();
  });

  it("plain member cannot create invite links", async () => {
    await expect(
      createTeamInviteLink({ prisma: prismaMock, teamId: TEAM, callerRole: "MEMBER" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(prismaMock.verificationToken.create).not.toHaveBeenCalled();
  });
});

describe("getTeamInviteByToken", () => {
  it("returns a valid team invite preview", async () => {
    const expires = new Date(Date.now() + 86400000);
    prismaMock.verificationToken.findFirst.mockResolvedValue({
      teamId: TEAM,
      expires,
      team: { id: TEAM, name: "Astoria", slug: "astoria", isOrganization: false },
    } as never);

    const res = await getTeamInviteByToken({ prisma: prismaMock, token: "abc" });

    expect(res).toEqual({ team: { id: TEAM, name: "Astoria", slug: "astoria" }, expires });
    expect(prismaMock.verificationToken.findFirst).toHaveBeenCalledWith({
      where: {
        token: "abc",
        teamId: { not: null },
        OR: [{ expiresInDays: null }, { expires: { gte: expect.any(Date) } }],
      },
      select: expect.any(Object),
    });
  });

  it("rejects missing or expired invite token", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue(null as never);
    await expect(getTeamInviteByToken({ prisma: prismaMock, token: "expired" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("inviteMemberByToken", () => {
  it("creates a pending member from a valid team invite token", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue({
      teamId: TEAM,
      expires: new Date(Date.now() + 86400000),
      team: { id: TEAM, name: "Astoria", slug: "astoria", isOrganization: false },
    } as never);
    prismaMock.membership.findUnique.mockResolvedValue(null as never);
    prismaMock.membership.create.mockResolvedValue({} as never);

    await expect(inviteMemberByToken({ prisma: prismaMock, token: "abc", userId: 10 })).resolves.toEqual({
      id: TEAM,
      name: "Astoria",
      slug: "astoria",
    });

    expect(prismaMock.membership.create).toHaveBeenCalledWith({
      data: {
        createdAt: expect.any(Date),
        teamId: TEAM,
        userId: 10,
        role: "MEMBER",
        accepted: false,
      },
    });
  });

  it("does not create duplicate membership from token", async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue({
      teamId: TEAM,
      expires: new Date(Date.now() + 86400000),
      team: { id: TEAM, name: "Astoria", slug: "astoria", isOrganization: false },
    } as never);
    prismaMock.membership.findUnique.mockResolvedValue({ id: 99 } as never);

    await expect(inviteMemberByToken({ prisma: prismaMock, token: "abc", userId: 10 })).rejects.toMatchObject(
      {
        code: "FORBIDDEN",
      }
    );
    expect(prismaMock.membership.create).not.toHaveBeenCalled();
  });
});
