import prismaMock from "@calcom/testing/lib/__mocks__/prismaMock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOwnMembership } from "./membership";

const TEAM = 1;
const SELF = 10;
const OTHER = 20;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getOwnMembership", () => {
  it("returns the caller's own membership", async () => {
    prismaMock.membership.findUnique.mockResolvedValue({ id: 5, disableImpersonation: false } as never);
    const res = await getOwnMembership({ prisma: prismaMock, callerId: SELF, teamId: TEAM, memberId: SELF });
    expect(res).toMatchObject({ id: 5 });
    expect(prismaMock.membership.findUnique).toHaveBeenCalledWith({
      where: { userId_teamId: { userId: SELF, teamId: TEAM } },
    });
  });

  it("rejects viewing someone else's membership", async () => {
    await expect(
      getOwnMembership({ prisma: prismaMock, callerId: SELF, teamId: TEAM, memberId: OTHER })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(prismaMock.membership.findUnique).not.toHaveBeenCalled();
  });
});
