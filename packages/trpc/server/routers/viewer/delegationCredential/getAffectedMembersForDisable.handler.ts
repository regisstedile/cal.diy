import { DelegationCredentialRepository } from "@calcom/features/delegation-credentials/repositories/DelegationCredentialRepository";
import { MembershipRepository } from "@calcom/features/membership/repositories/MembershipRepository";
import logger from "@calcom/lib/logger";

import type { TDelegationCredentialGetAffectedMembersForDisableSchema } from "./schema";

const log = logger.getSubLogger({ prefix: ["[DelegationCredential]"] });
export async function getAffectedMembersForDisable({
  delegationCredentialId,
  organizationId,
}: {
  delegationCredentialId: string;
  organizationId: number | null;
}) {
  const delegationCredential = await DelegationCredentialRepository.findById({ id: delegationCredentialId });
  if (!delegationCredential) {
    // If we cant find the delegation credential, we assume no members were affected
    return [];
  }
  // Ownership check: never expose member emails/names of another organization
  if (!organizationId || delegationCredential.organizationId !== organizationId) {
    return [];
  }
  const lastEnabledAt = delegationCredential.lastEnabledAt;
  if (!lastEnabledAt) {
    log.info(
      `Delegation credential ${delegationCredentialId} has no lastEnabledAt, so assuming no members were affected`
    );
    return [];
  }

  // Find members who joined after the delegation credential was last enabled
  const membershipsThatCouldPotentiallyBeAffected =
    await MembershipRepository.findMembershipsCreatedAfterTimeIncludeUser({
      organizationId: delegationCredential.organizationId,
      time: lastEnabledAt,
    });

  return membershipsThatCouldPotentiallyBeAffected.map((membership) => ({
    email: membership.user.email,
    name: membership.user.name,
    id: membership.user.id,
  }));
}

export default function getAffectedMembersForDisableHandler({
  input,
  ctx,
}: {
  input: TDelegationCredentialGetAffectedMembersForDisableSchema;
  ctx: { user: { organizationId: number | null } };
}) {
  return getAffectedMembersForDisable({
    delegationCredentialId: input.id,
    organizationId: ctx.user.organizationId,
  });
}
