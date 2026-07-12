import { MembershipRole } from "@calcom/prisma/enums";
import { z } from "zod";

const slugSchema = z
  .string()
  .min(2)
  .max(48)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens.");

export const ZCreateOrganizationInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: slugSchema,
  bio: z.string().trim().max(500).optional().nullable(),
});

export const ZUpdateOrganizationInputSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  slug: slugSchema.optional(),
  bio: z.string().trim().max(500).optional().nullable(),
  orgAutoJoinOnSignup: z.boolean().optional(),
  disableAttendeeConfirmationEmail: z.boolean().optional(),
  disableAttendeeCancellationEmail: z.boolean().optional(),
  disableAttendeeRescheduledEmail: z.boolean().optional(),
  disableAttendeeRequestEmail: z.boolean().optional(),
  disableAttendeeReassignedEmail: z.boolean().optional(),
  disableAttendeeAwaitingPaymentEmail: z.boolean().optional(),
  disableAttendeeRescheduleRequestEmail: z.boolean().optional(),
  disableAttendeeLocationChangeEmail: z.boolean().optional(),
  disableAttendeeNewEventEmail: z.boolean().optional(),
});

export const ZListMembersInputSchema = z.object({
  search: z.string().optional(),
  cursor: z.number().optional(),
  limit: z.number().min(1).max(100).optional(),
});

export const ZInviteMemberInputSchema = z.object({
  email: z.string().email(),
  role: z.enum([MembershipRole.MEMBER, MembershipRole.ADMIN]).optional(),
});

export const ZRemoveMemberInputSchema = z.object({
  userId: z.number(),
});

export const ZUpdateMemberRoleInputSchema = z.object({
  userId: z.number(),
  role: z.enum([MembershipRole.MEMBER, MembershipRole.ADMIN]),
});

export const ZAcceptDeclineInviteInputSchema = z.object({
  teamId: z.number(),
});

export const ZSaveSamlConnectionInputSchema = z.object({
  rawMetadata: z.string().min(1),
});

export const ZAddMembersToTeamsInputSchema = z.object({
  userIds: z.array(z.number()).min(1),
  teamIds: z.array(z.number()).min(1),
});

export type TCreateOrganizationInputSchema = z.infer<typeof ZCreateOrganizationInputSchema>;
export type TUpdateOrganizationInputSchema = z.infer<typeof ZUpdateOrganizationInputSchema>;
export type TListMembersInputSchema = z.infer<typeof ZListMembersInputSchema>;
export type TInviteMemberInputSchema = z.infer<typeof ZInviteMemberInputSchema>;
export type TRemoveMemberInputSchema = z.infer<typeof ZRemoveMemberInputSchema>;
export type TUpdateMemberRoleInputSchema = z.infer<typeof ZUpdateMemberRoleInputSchema>;
export type TAcceptDeclineInviteInputSchema = z.infer<typeof ZAcceptDeclineInviteInputSchema>;
export type TSaveSamlConnectionInputSchema = z.infer<typeof ZSaveSamlConnectionInputSchema>;
export type TAddMembersToTeamsInputSchema = z.infer<typeof ZAddMembersToTeamsInputSchema>;
