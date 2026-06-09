import { MembershipRole } from "@calcom/prisma/enums";

export default function TeamPill(_props: { color?: string; text?: string }) {
  return null;
}

export function TeamRole({ role }: { role: MembershipRole | string }) {
  return <TeamPill color="gray" text={role.toLowerCase()} />;
}
