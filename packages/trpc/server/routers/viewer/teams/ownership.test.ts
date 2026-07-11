import prismaMock from "@calcom/testing/lib/__mocks__/prismaMock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { assertNotLastOwner } from "./ownership";

const TEAM = 1;
const USER = 10;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("assertNotLastOwner", () => {
  it("blocks removing/demoting the sole owner", async () => {
    prismaMock.membership.findUnique.mockResolvedValue({ role: "OWNER" } as never);
    prismaMock.membership.count.mockResolvedValue(1 as never);
    await expect(
      assertNotLastOwner({ prisma: prismaMock, teamId: TEAM, userId: USER })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("allows removing an owner when another owner remains", async () => {
    prismaMock.membership.findUnique.mockResolvedValue({ role: "OWNER" } as never);
    prismaMock.membership.count.mockResolvedValue(2 as never);
    await expect(
      assertNotLastOwner({ prisma: prismaMock, teamId: TEAM, userId: USER })
    ).resolves.toBeUndefined();
  });

  it("is a no-op for non-owners (no owner-count needed)", async () => {
    prismaMock.membership.findUnique.mockResolvedValue({ role: "ADMIN" } as never);
    await expect(
      assertNotLastOwner({ prisma: prismaMock, teamId: TEAM, userId: USER })
    ).resolves.toBeUndefined();
    expect(prismaMock.membership.count).not.toHaveBeenCalled();
  });

  it("is a no-op when the user has no membership", async () => {
    prismaMock.membership.findUnique.mockResolvedValue(null as never);
    await expect(
      assertNotLastOwner({ prisma: prismaMock, teamId: TEAM, userId: USER })
    ).resolves.toBeUndefined();
    expect(prismaMock.membership.count).not.toHaveBeenCalled();
  });

  it("counts only accepted owners of this team", async () => {
    prismaMock.membership.findUnique.mockResolvedValue({ role: "OWNER" } as never);
    prismaMock.membership.count.mockResolvedValue(2 as never);
    await assertNotLastOwner({ prisma: prismaMock, teamId: TEAM, userId: USER });
    expect(prismaMock.membership.count).toHaveBeenCalledWith({
      where: { teamId: TEAM, accepted: true, role: "OWNER" },
    });
  });
});
