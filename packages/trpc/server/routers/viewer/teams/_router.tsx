import type { PrismaClient } from "@calcom/prisma";
import { MembershipRole, SchedulingType } from "@calcom/prisma/enums";
import { router } from "@calcom/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import authedProcedure from "../../../procedures/authedProcedure";

const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(48)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens.");

const teamSelect = {
  id: true,
  name: true,
  slug: true,
  bio: true,
  logoUrl: true,
  createdAt: true,
  _count: {
    select: {
      members: true,
      eventTypes: true,
    },
  },
} as const;

const memberSelect = {
  id: true,
  accepted: true,
  role: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      avatarUrl: true,
    },
  },
} as const;

const teamIdSchema = z.object({
  teamId: z.number(),
});

const createTeamSchema = z.object({
  name: z.string().trim().min(1).max(64),
  slug: slugSchema,
  bio: z.string().trim().max(500).optional().nullable(),
});

const updateTeamSchema = teamIdSchema.extend({
  name: z.string().trim().min(1).max(64),
  slug: slugSchema,
  bio: z.string().trim().max(500).optional().nullable(),
});

const listMembersSchema = teamIdSchema.extend({
  search: z.string().trim().optional(),
});

const inviteMemberSchema = teamIdSchema.extend({
  email: z.string().email(),
  role: z.enum([MembershipRole.MEMBER, MembershipRole.ADMIN]).default(MembershipRole.MEMBER),
});

const userMemberSchema = teamIdSchema.extend({
  userId: z.number(),
});

const updateMemberRoleSchema = userMemberSchema.extend({
  role: z.enum([MembershipRole.MEMBER, MembershipRole.ADMIN, MembershipRole.OWNER]),
});

const eventTypeBaseSchema = z.object({
  teamId: z.number(),
});

const createEventTypeSchema = eventTypeBaseSchema.extend({
  title: z.string().trim().min(1).max(255),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens."),
  length: z.number().int().min(1).max(720).default(60),
  schedulingType: z.nativeEnum(SchedulingType).nullable().default(null),
});

const deleteEventTypeSchema = eventTypeBaseSchema.extend({
  eventTypeId: z.number(),
});

const setHostsSchema = eventTypeBaseSchema.extend({
  eventTypeId: z.number(),
  hostUserIds: z.array(z.number()),
});

const canManageMembers = (role: MembershipRole) =>
  role === MembershipRole.OWNER || role === MembershipRole.ADMIN;

const normalizeSlug = (slug: string) => slug.trim().toLowerCase();

async function getMembershipOrThrow({
  prisma,
  teamId,
  userId,
}: {
  prisma: PrismaClient;
  teamId: number;
  userId: number;
}) {
  const membership = await prisma.membership.findFirst({
    where: {
      teamId,
      userId,
      accepted: true,
      team: {
        isOrganization: false,
      },
    },
    select: {
      id: true,
      role: true,
      team: {
        select: teamSelect,
      },
    },
  });

  if (!membership) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You are not a member of this team." });
  }

  return membership;
}

async function assertTeamSlugAvailable({
  prisma,
  slug,
  currentTeamId,
}: {
  prisma: PrismaClient;
  slug: string;
  currentTeamId?: number;
}) {
  const [existingTeam, existingUser] = await Promise.all([
    prisma.team.findFirst({
      where: {
        slug,
        id: currentTeamId ? { not: currentTeamId } : undefined,
      },
      select: { id: true },
    }),
    prisma.user.findFirst({
      where: {
        username: slug,
      },
      select: { id: true },
    }),
  ]);

  if (existingTeam || existingUser) {
    throw new TRPCError({ code: "CONFLICT", message: "This team URL is already in use." });
  }
}

async function assertCanChangeOwner({
  prisma,
  teamId,
  userId,
}: {
  prisma: PrismaClient;
  teamId: number;
  userId: number;
}) {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
    select: {
      role: true,
    },
  });

  if (membership?.role !== MembershipRole.OWNER) return;

  const owners = await prisma.membership.count({
    where: {
      teamId,
      accepted: true,
      role: MembershipRole.OWNER,
    },
  });

  if (owners <= 1) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "A team must have at least one owner." });
  }
}

export const teamsRouter = router({
  listForUser: authedProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.prisma.membership.findMany({
      where: {
        userId: ctx.user.id,
        accepted: true,
        team: {
          isOrganization: false,
        },
      },
      select: {
        id: true,
        role: true,
        team: {
          select: teamSelect,
        },
      },
      orderBy: {
        team: {
          name: "asc",
        },
      },
    });

    return memberships.map((membership) => ({
      ...membership.team,
      role: membership.role,
      membershipId: membership.id,
    }));
  }),

  list: authedProcedure.input(z.object({}).optional()).query(async ({ ctx }) => {
    const memberships = await ctx.prisma.membership.findMany({
      where: {
        userId: ctx.user.id,
        accepted: true,
        team: {
          isOrganization: false,
        },
      },
      select: {
        id: true,
        role: true,
        accepted: true,
        team: {
          select: teamSelect,
        },
      },
      orderBy: {
        team: {
          name: "asc",
        },
      },
    });

    return memberships.map((membership) => ({
      ...membership.team,
      role: membership.role,
      accepted: membership.accepted,
      membershipId: membership.id,
    }));
  }),

  getById: authedProcedure.input(teamIdSchema).query(async ({ ctx, input }) => {
    const membership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    return {
      ...membership.team,
      role: membership.role,
    };
  }),

  checkSlugAvailability: authedProcedure
    .input(z.object({ slug: slugSchema, currentTeamId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      await assertTeamSlugAvailable({
        prisma: ctx.prisma,
        slug: normalizeSlug(input.slug),
        currentTeamId: input.currentTeamId,
      });

      return { available: true };
    }),

  create: authedProcedure.input(createTeamSchema).mutation(async ({ ctx, input }) => {
    const slug = normalizeSlug(input.slug);

    await assertTeamSlugAvailable({ prisma: ctx.prisma, slug });

    return ctx.prisma.$transaction(async (tx) => {
      const team = await tx.team.create({
        data: {
          name: input.name,
          slug,
          bio: input.bio || null,
          isOrganization: false,
          parentId: null,
        },
        select: teamSelect,
      });

      await tx.membership.create({
        data: {
          teamId: team.id,
          userId: ctx.user.id,
          accepted: true,
          role: MembershipRole.OWNER,
        },
      });

      return {
        ...team,
        role: MembershipRole.OWNER,
      };
    });
  }),

  update: authedProcedure.input(updateTeamSchema).mutation(async ({ ctx, input }) => {
    const membership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    if (!canManageMembers(membership.role)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can edit a team." });
    }

    const slug = normalizeSlug(input.slug);
    await assertTeamSlugAvailable({ prisma: ctx.prisma, slug, currentTeamId: input.teamId });

    return ctx.prisma.team.update({
      where: { id: input.teamId },
      data: {
        name: input.name,
        slug,
        bio: input.bio || null,
      },
      select: teamSelect,
    });
  }),

  delete: authedProcedure.input(teamIdSchema).mutation(async ({ ctx, input }) => {
    const membership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    if (membership.role !== MembershipRole.OWNER) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners can delete a team." });
    }

    await ctx.prisma.team.delete({
      where: {
        id: input.teamId,
      },
    });

    return { success: true };
  }),

  listMembers: authedProcedure.input(listMembersSchema).query(async ({ ctx, input }) => {
    await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    return ctx.prisma.membership.findMany({
      where: {
        teamId: input.teamId,
        ...(input.search
          ? {
              user: {
                OR: [
                  { name: { contains: input.search, mode: "insensitive" } },
                  { email: { contains: input.search, mode: "insensitive" } },
                  { username: { contains: input.search, mode: "insensitive" } },
                ],
              },
            }
          : {}),
      },
      select: memberSelect,
      orderBy: [{ accepted: "desc" }, { role: "desc" }, { createdAt: "asc" }],
    });
  }),

  inviteMember: authedProcedure.input(inviteMemberSchema).mutation(async ({ ctx, input }) => {
    const membership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    if (!canManageMembers(membership.role)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can invite members." });
    }

    const user = await ctx.prisma.user.findFirst({
      where: {
        email: {
          equals: input.email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found. Create the user first, then invite.",
      });
    }

    const existingMembership = await ctx.prisma.membership.findUnique({
      where: {
        userId_teamId: {
          userId: user.id,
          teamId: input.teamId,
        },
      },
      select: {
        id: true,
        accepted: true,
      },
    });

    if (existingMembership) {
      throw new TRPCError({
        code: "CONFLICT",
        message: existingMembership.accepted
          ? "This user is already a team member."
          : "This user already has a pending invite.",
      });
    }

    return ctx.prisma.membership.create({
      data: {
        userId: user.id,
        teamId: input.teamId,
        accepted: false,
        role: input.role,
      },
      select: memberSelect,
    });
  }),

  removeMember: authedProcedure.input(userMemberSchema).mutation(async ({ ctx, input }) => {
    const currentMembership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    if (!canManageMembers(currentMembership.role)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can remove members." });
    }

    const targetMembership = await ctx.prisma.membership.findUnique({
      where: {
        userId_teamId: {
          userId: input.userId,
          teamId: input.teamId,
        },
      },
      select: { role: true },
    });

    if (!targetMembership) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Team member not found." });
    }

    if (targetMembership.role === MembershipRole.OWNER && currentMembership.role !== MembershipRole.OWNER) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only owners can remove another owner." });
    }

    await assertCanChangeOwner({ prisma: ctx.prisma, teamId: input.teamId, userId: input.userId });

    await ctx.prisma.membership.delete({
      where: {
        userId_teamId: {
          userId: input.userId,
          teamId: input.teamId,
        },
      },
    });

    return { success: true };
  }),

  updateMemberRole: authedProcedure.input(updateMemberRoleSchema).mutation(async ({ ctx, input }) => {
    const currentMembership = await getMembershipOrThrow({
      prisma: ctx.prisma,
      teamId: input.teamId,
      userId: ctx.user.id,
    });

    if (!canManageMembers(currentMembership.role)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can update roles." });
    }

    if (input.role === MembershipRole.OWNER && currentMembership.role !== MembershipRole.OWNER) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only owners can promote another owner." });
    }

    await assertCanChangeOwner({ prisma: ctx.prisma, teamId: input.teamId, userId: input.userId });

    return ctx.prisma.membership.update({
      where: {
        userId_teamId: {
          userId: input.userId,
          teamId: input.teamId,
        },
      },
      data: {
        role: input.role,
      },
      select: memberSelect,
    });
  }),

  listPendingInvites: authedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.membership.findMany({
      where: {
        userId: ctx.user.id,
        accepted: false,
        team: {
          isOrganization: false,
        },
      },
      select: {
        id: true,
        role: true,
        team: {
          select: teamSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  acceptInvite: authedProcedure.input(teamIdSchema).mutation(async ({ ctx, input }) => {
    const membership = await ctx.prisma.membership.findUnique({
      where: {
        userId_teamId: {
          userId: ctx.user.id,
          teamId: input.teamId,
        },
      },
      select: {
        id: true,
        accepted: true,
        team: {
          select: {
            isOrganization: true,
          },
        },
      },
    });

    if (!membership || membership.team.isOrganization) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Team invite not found." });
    }

    return ctx.prisma.membership.update({
      where: {
        id: membership.id,
      },
      data: {
        accepted: true,
      },
      select: memberSelect,
    });
  }),

  declineInvite: authedProcedure.input(teamIdSchema).mutation(async ({ ctx, input }) => {
    const membership = await ctx.prisma.membership.findUnique({
      where: {
        userId_teamId: {
          userId: ctx.user.id,
          teamId: input.teamId,
        },
      },
      select: {
        id: true,
        accepted: true,
        team: {
          select: {
            isOrganization: true,
          },
        },
      },
    });

    if (!membership || membership.team.isOrganization) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Team invite not found." });
    }

    await ctx.prisma.membership.delete({
      where: {
        id: membership.id,
      },
    });

    return { success: true };
  }),

  eventTypes: router({
    list: authedProcedure.input(teamIdSchema).query(async ({ ctx, input }) => {
      await getMembershipOrThrow({ prisma: ctx.prisma, teamId: input.teamId, userId: ctx.user.id });

      return ctx.prisma.eventType.findMany({
        where: { teamId: input.teamId },
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          slug: true,
          length: true,
          hidden: true,
          schedulingType: true,
          hosts: {
            select: {
              userId: true,
              isFixed: true,
              user: {
                select: { id: true, name: true, email: true, avatarUrl: true },
              },
            },
          },
        },
      });
    }),

    create: authedProcedure.input(createEventTypeSchema).mutation(async ({ ctx, input }) => {
      const membership = await getMembershipOrThrow({
        prisma: ctx.prisma,
        teamId: input.teamId,
        userId: ctx.user.id,
      });

      if (!canManageMembers(membership.role)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can create event types." });
      }

      const existing = await ctx.prisma.eventType.findFirst({
        where: { teamId: input.teamId, slug: input.slug },
        select: { id: true },
      });
      if (existing) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "An event type with this slug already exists in the team." });
      }

      return ctx.prisma.eventType.create({
        data: {
          title: input.title,
          slug: input.slug,
          length: input.length,
          schedulingType: input.schedulingType,
          teamId: input.teamId,
          userId: ctx.user.id,
        },
        select: { id: true, title: true, slug: true, length: true, schedulingType: true },
      });
    }),

    delete: authedProcedure.input(deleteEventTypeSchema).mutation(async ({ ctx, input }) => {
      const membership = await getMembershipOrThrow({
        prisma: ctx.prisma,
        teamId: input.teamId,
        userId: ctx.user.id,
      });

      if (!canManageMembers(membership.role)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can delete event types." });
      }

      const eventType = await ctx.prisma.eventType.findFirst({
        where: { id: input.eventTypeId, teamId: input.teamId },
        select: { id: true },
      });
      if (!eventType) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event type not found in this team." });
      }

      await ctx.prisma.eventType.delete({ where: { id: input.eventTypeId } });

      return { id: input.eventTypeId };
    }),

    setHosts: authedProcedure.input(setHostsSchema).mutation(async ({ ctx, input }) => {
      const membership = await getMembershipOrThrow({
        prisma: ctx.prisma,
        teamId: input.teamId,
        userId: ctx.user.id,
      });

      if (!canManageMembers(membership.role)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only team owners and admins can manage hosts." });
      }

      const eventType = await ctx.prisma.eventType.findFirst({
        where: { id: input.eventTypeId, teamId: input.teamId },
        select: { id: true },
      });
      if (!eventType) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const memberUserIds = await ctx.prisma.membership.findMany({
        where: { teamId: input.teamId, accepted: true },
        select: { userId: true },
      });
      const memberSet = new Set(memberUserIds.map((m) => m.userId));
      const invalid = input.hostUserIds.filter((uid) => !memberSet.has(uid));
      if (invalid.length > 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "All hosts must be members of the team." });
      }

      await ctx.prisma.$transaction([
        ctx.prisma.host.deleteMany({ where: { eventTypeId: input.eventTypeId } }),
        ctx.prisma.host.createMany({
          data: input.hostUserIds.map((userId) => ({
            userId,
            eventTypeId: input.eventTypeId,
            isFixed: false,
          })),
        }),
      ]);

      return { eventTypeId: input.eventTypeId };
    }),
  }),
});
