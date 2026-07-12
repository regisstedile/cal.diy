import prismaMock from "@calcom/testing/lib/__mocks__/prismaMock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addOrganizationMembersToTeams, getOrganizationTeams, listCurrentOrganization } from "./teams";

const ORG_ID = 10;
const CALLER_ID = 1;

const orgMembership = (role: "OWNER" | "ADMIN" | "MEMBER" = "OWNER") => ({
  role,
  accepted: true,
  team: {
    id: ORG_ID,
    name: "Acme",
    slug: "acme",
    logoUrl: null,
    bio: null,
    isPlatform: false,
    isPrivate: false,
    organizationSettings: null,
  },
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("listCurrentOrganization", () => {
  it("returns the current organization in REF-compatible shape without billing features", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("ADMIN") as never);

    const res = await listCurrentOrganization({ prisma: prismaMock, userId: CALLER_ID });

    expect(res).toMatchObject({
      id: ORG_ID,
      role: "ADMIN",
      canUpdate: true,
      user: { role: "ADMIN", accepted: true },
      features: { delegationCredential: false },
    });
  });

  it("throws when the caller has no accepted organization", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(null as never);

    await expect(listCurrentOrganization({ prisma: prismaMock, userId: CALLER_ID })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });
});

describe("getOrganizationTeams", () => {
  it("lists only child teams of the caller organization", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership() as never);
    prismaMock.team.findMany.mockResolvedValue([{ id: 21, name: "Sales" }] as never);

    await expect(getOrganizationTeams({ prisma: prismaMock, userId: CALLER_ID })).resolves.toEqual([
      { id: 21, name: "Sales" },
    ]);

    expect(prismaMock.team.findMany).toHaveBeenCalledWith({
      where: { parentId: ORG_ID, isOrganization: false },
      select: { id: true, name: true },
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });
  });

  it("rejects callers without an accepted organization", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(null as never);

    await expect(getOrganizationTeams({ prisma: prismaMock, userId: CALLER_ID })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    expect(prismaMock.team.findMany).not.toHaveBeenCalled();
  });
});

describe("addOrganizationMembersToTeams", () => {
  it("adds accepted organization members to organization child teams", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("OWNER") as never);
    prismaMock.team.findMany.mockResolvedValue([{ id: 21 }, { id: 22 }] as never);
    prismaMock.membership.findMany.mockResolvedValue([{ userId: 7 }, { userId: 8 }] as never);
    prismaMock.membership.createMany.mockResolvedValue({ count: 4 } as never);

    const res = await addOrganizationMembersToTeams({
      prisma: prismaMock,
      userId: CALLER_ID,
      userIds: [7, 8],
      teamIds: [21, 22],
    });

    expect(res).toEqual({ success: true, added: 4 });
    expect(prismaMock.team.findMany).toHaveBeenCalledWith({
      where: { id: { in: [21, 22] }, parentId: ORG_ID, isOrganization: false },
      select: { id: true },
    });
    expect(prismaMock.membership.findMany).toHaveBeenCalledWith({
      where: { teamId: ORG_ID, userId: { in: [7, 8] }, accepted: true },
      select: { userId: true },
    });
    expect(prismaMock.membership.createMany).toHaveBeenCalledWith({
      data: [
        { teamId: 21, userId: 7, accepted: true, role: "MEMBER" },
        { teamId: 21, userId: 8, accepted: true, role: "MEMBER" },
        { teamId: 22, userId: 7, accepted: true, role: "MEMBER" },
        { teamId: 22, userId: 8, accepted: true, role: "MEMBER" },
      ],
      skipDuplicates: true,
    });
  });

  it("deduplicates input ids before writing memberships", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("ADMIN") as never);
    prismaMock.team.findMany.mockResolvedValue([{ id: 21 }] as never);
    prismaMock.membership.findMany.mockResolvedValue([{ userId: 7 }] as never);
    prismaMock.membership.createMany.mockResolvedValue({ count: 1 } as never);

    await addOrganizationMembersToTeams({
      prisma: prismaMock,
      userId: CALLER_ID,
      userIds: [7, 7],
      teamIds: [21, 21],
    });

    expect(prismaMock.membership.createMany).toHaveBeenCalledWith({
      data: [{ teamId: 21, userId: 7, accepted: true, role: "MEMBER" }],
      skipDuplicates: true,
    });
  });

  it("forbids plain organization members", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("MEMBER") as never);

    await expect(
      addOrganizationMembersToTeams({ prisma: prismaMock, userId: CALLER_ID, userIds: [7], teamIds: [21] })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(prismaMock.team.findMany).not.toHaveBeenCalled();
  });

  it("blocks cross-organization team ids", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("OWNER") as never);
    prismaMock.team.findMany.mockResolvedValue([{ id: 21 }] as never);

    await expect(
      addOrganizationMembersToTeams({
        prisma: prismaMock,
        userId: CALLER_ID,
        userIds: [7],
        teamIds: [21, 99],
      })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(prismaMock.membership.createMany).not.toHaveBeenCalled();
  });

  it("blocks users that are not accepted organization members", async () => {
    prismaMock.membership.findFirst.mockResolvedValue(orgMembership("OWNER") as never);
    prismaMock.team.findMany.mockResolvedValue([{ id: 21 }] as never);
    prismaMock.membership.findMany.mockResolvedValue([] as never);

    await expect(
      addOrganizationMembersToTeams({ prisma: prismaMock, userId: CALLER_ID, userIds: [7], teamIds: [21] })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(prismaMock.membership.createMany).not.toHaveBeenCalled();
  });
});
