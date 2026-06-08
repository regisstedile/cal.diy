import jackson from "@calcom/features/ee/sso/lib/jackson";
import { canAccessOrganization } from "@calcom/features/ee/sso/lib/saml";
import prisma from "@calcom/prisma";
import { TRPCError } from "@trpc/server";
import type { TrpcSessionUser } from "../../../types";
import type { ZDeleteInputSchema } from "./delete.schema";

type Options = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: ZDeleteInputSchema;
};

export const deleteHandler = async ({ ctx, input }: Options) => {
  const { dsyncController } = await jackson();

  const { message, access } = await canAccessOrganization(ctx.user, input.organizationId);
  if (!access) {
    throw new TRPCError({ code: "BAD_REQUEST", message });
  }

  if (!ctx.user.organization || ctx.user.organization.id !== input.organizationId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "dont_have_permission" });
  }

  const record = await prisma.dSyncData.findUnique({
    where: { organizationId: input.organizationId },
  });
  if (!record || record.directoryId !== input.directoryId) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  await dsyncController.directories.delete(input.directoryId);
  await prisma.dSyncData.delete({
    where: { organizationId: input.organizationId },
  });

  return null;
};

export default deleteHandler;
