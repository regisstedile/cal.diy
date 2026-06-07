import { getFeatureOptInService } from "@calcom/features/di/containers/FeatureOptInService";
import { getTeamFeatureRepository } from "@calcom/features/di/containers/TeamFeatureRepository";
import { getUserFeatureRepository } from "@calcom/features/di/containers/UserFeatureRepository";
import { TeamRepository } from "@calcom/features/ee/teams/repositories/TeamRepository";
import { isOptInFeature } from "@calcom/features/feature-opt-in/config";
import { prisma } from "@calcom/prisma";
import { TRPCError } from "@trpc/server";
import type { ZodEnum } from "zod";
import { z } from "zod";
import authedProcedure from "../../../procedures/authedProcedure";
import { createOrgPbacProcedure, createTeamPbacProcedure } from "../../../procedures/pbacProcedures";
import { router } from "../../../trpc";

const featureStateSchema: ZodEnum<["enabled", "disabled", "inherit"]> = z.enum([
  "enabled",
  "disabled",
  "inherit",
]);

const featureOptInService: ReturnType<typeof getFeatureOptInService> = getFeatureOptInService();
const teamFeatureRepository: ReturnType<typeof getTeamFeatureRepository> = getTeamFeatureRepository();
const userFeatureRepository: ReturnType<typeof getUserFeatureRepository> = getUserFeatureRepository();
const teamRepository: TeamRepository = new TeamRepository(prisma);

export const featureOptInRouter = router({
  listForUser: authedProcedure.query(async ({ ctx }) => {
    return featureOptInService.listFeaturesForUser({
      userId: ctx.user.id,
    });
  }),

  listForTeam: createTeamPbacProcedure("featureOptIn.read").query(async ({ input }) => {
    const parentOrg = await teamRepository.findParentOrganizationByTeamId(input.teamId);
    const parentOrgId = parentOrg?.id ?? null;

    return featureOptInService.listFeaturesForTeam({ teamId: input.teamId, parentOrgId, scope: "team" });
  }),

  listForOrganization: createOrgPbacProcedure("featureOptIn.read").query(async ({ ctx }) => {
    return featureOptInService.listFeaturesForTeam({ teamId: ctx.organizationId, scope: "org" });
  }),

  checkFeatureOptInEligibility: authedProcedure
    .input(
      z.object({
        featureId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return featureOptInService.checkFeatureOptInEligibility({
        userId: ctx.user.id,
        featureId: input.featureId,
      });
    }),

  setUserState: authedProcedure
    .input(
      z.object({
        slug: z.string(),
        state: featureStateSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isOptInFeature(input.slug)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid slug. This feature is not opt-in configurable.",
        });
      }

      await featureOptInService.setUserFeatureState({
        userId: ctx.user.id,
        featureId: input.slug,
        state: input.state,
        assignedBy: ctx.user.id,
      });

      return { success: true };
    }),

  setTeamState: createTeamPbacProcedure("featureOptIn.update")
    .input(
      z.object({
        slug: z.string(),
        state: featureStateSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isOptInFeature(input.slug)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid slug. This feature is not opt-in configurable.",
        });
      }

      await featureOptInService.setTeamFeatureState({
        teamId: input.teamId,
        featureId: input.slug,
        state: input.state,
        assignedBy: ctx.user.id,
        scope: "team",
      });

      return { success: true };
    }),

  setOrganizationState: createOrgPbacProcedure("featureOptIn.update")
    .input(
      z.object({
        slug: z.string(),
        state: featureStateSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isOptInFeature(input.slug)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid slug. This feature is not opt-in configurable.",
        });
      }

      await featureOptInService.setTeamFeatureState({
        teamId: ctx.organizationId,
        featureId: input.slug,
        state: input.state,
        assignedBy: ctx.user.id,
        scope: "org",
      });

      return { success: true };
    }),

  getUserAutoOptIn: authedProcedure.query(async ({ ctx }) => {
    const autoOptIn = await userFeatureRepository.findAutoOptInByUserId(ctx.user.id);
    return { autoOptIn };
  }),

  setUserAutoOptIn: authedProcedure
    .input(
      z.object({
        autoOptIn: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await userFeatureRepository.setAutoOptIn(ctx.user.id, input.autoOptIn);
      return { success: true };
    }),

  getTeamAutoOptIn: createTeamPbacProcedure("featureOptIn.read").query(async ({ input }) => {
    const result = await teamFeatureRepository.findAutoOptInByTeamIds([input.teamId]);
    return { autoOptIn: result[input.teamId] ?? false };
  }),

  setTeamAutoOptIn: createTeamPbacProcedure("featureOptIn.update")
    .input(
      z.object({
        autoOptIn: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      await teamFeatureRepository.setAutoOptIn(input.teamId, input.autoOptIn);
      return { success: true };
    }),

  getOrganizationAutoOptIn: createOrgPbacProcedure("featureOptIn.read").query(async ({ ctx }) => {
    const result = await teamFeatureRepository.findAutoOptInByTeamIds([ctx.organizationId]);
    return { autoOptIn: result[ctx.organizationId] ?? false };
  }),

  setOrganizationAutoOptIn: createOrgPbacProcedure("featureOptIn.update")
    .input(
      z.object({
        autoOptIn: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await teamFeatureRepository.setAutoOptIn(ctx.organizationId, input.autoOptIn);
      return { success: true };
    }),
});
