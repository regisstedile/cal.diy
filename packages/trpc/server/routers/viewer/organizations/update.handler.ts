import prisma from "@calcom/prisma";

import type { TrpcSessionUser } from "../../../types";
import {
  assertCanManageOrganization,
  assertOrganizationSlugAvailable,
  normalizeOrganizationSlug,
  organizationSelect,
} from "./organizationUtils";
import type { TUpdateOrganizationInputSchema } from "./schema";

type UpdateHandlerOptions = {
  ctx: {
    user: Pick<NonNullable<TrpcSessionUser>, "id">;
  };
  input: TUpdateOrganizationInputSchema;
};

export const updateHandler = async ({ ctx, input }: UpdateHandlerOptions) => {
  const membership = await assertCanManageOrganization({ userId: ctx.user.id });

  const slug = input.slug ? normalizeOrganizationSlug(input.slug) : undefined;

  if (slug) {
    await assertOrganizationSlugAvailable({
      slug,
      currentOrganizationId: membership.team.id,
    });
  }

  const {
    name, bio, orgAutoJoinOnSignup,
    disableAttendeeConfirmationEmail, disableAttendeeCancellationEmail,
    disableAttendeeRescheduledEmail, disableAttendeeRequestEmail,
    disableAttendeeReassignedEmail, disableAttendeeAwaitingPaymentEmail,
    disableAttendeeRescheduleRequestEmail, disableAttendeeLocationChangeEmail,
    disableAttendeeNewEventEmail,
  } = input;

  const orgSettingsUpdate = {
    ...(orgAutoJoinOnSignup !== undefined && { orgAutoJoinOnSignup }),
    ...(disableAttendeeConfirmationEmail !== undefined && { disableAttendeeConfirmationEmail }),
    ...(disableAttendeeCancellationEmail !== undefined && { disableAttendeeCancellationEmail }),
    ...(disableAttendeeRescheduledEmail !== undefined && { disableAttendeeRescheduledEmail }),
    ...(disableAttendeeRequestEmail !== undefined && { disableAttendeeRequestEmail }),
    ...(disableAttendeeReassignedEmail !== undefined && { disableAttendeeReassignedEmail }),
    ...(disableAttendeeAwaitingPaymentEmail !== undefined && { disableAttendeeAwaitingPaymentEmail }),
    ...(disableAttendeeRescheduleRequestEmail !== undefined && { disableAttendeeRescheduleRequestEmail }),
    ...(disableAttendeeLocationChangeEmail !== undefined && { disableAttendeeLocationChangeEmail }),
    ...(disableAttendeeNewEventEmail !== undefined && { disableAttendeeNewEventEmail }),
  };

  if (Object.keys(orgSettingsUpdate).length > 0) {
    await prisma.organizationSettings.update({
      where: { organizationId: membership.team.id },
      data: orgSettingsUpdate,
    });
  }

  return prisma.team.update({
    where: { id: membership.team.id },
    data: {
      ...(name !== undefined && { name }),
      ...(slug !== undefined && { slug }),
      ...(bio !== undefined && { bio: bio || null }),
    },
    select: organizationSelect,
  });
};
