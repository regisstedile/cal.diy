import type { Dispatch, SetStateAction } from "react";

import { CheckboxField } from "@calcom/ui";

type Host = {
  userId: number;
  isFixed?: boolean;
  priority?: number;
  weight?: number;
  weightAdjustment?: number;
};

type TeamMember = {
  value: string;
  label: string;
};

export default function AddMembersWithSwitch({
  teamMembers,
  onChange,
  assignAllTeamMembers,
  setAssignAllTeamMembers,
  automaticAddAllEnabled,
  onActive,
}: {
  value: Host[];
  onChange: (hosts: Host[]) => void;
  teamMembers: TeamMember[];
  assignAllTeamMembers: boolean;
  setAssignAllTeamMembers: Dispatch<SetStateAction<boolean>>;
  automaticAddAllEnabled: boolean;
  onActive: () => void;
  isFixed: boolean;
  placeholder?: string;
  containerClassName?: string;
  isRRWeightsEnabled?: boolean;
}) {
  if (!automaticAddAllEnabled) return null;

  return (
    <CheckboxField
      description=""
      checked={assignAllTeamMembers}
      onChange={(event) => {
        const checked = event.target.checked;
        setAssignAllTeamMembers(checked);
        if (checked) {
          onActive();
          onChange(
            teamMembers.map((member) => ({
              userId: Number(member.value),
              isFixed: true,
              priority: 2,
              weight: 100,
              weightAdjustment: 0,
            }))
          );
        }
      }}
      label="Send updates to all team members"
    />
  );
}
