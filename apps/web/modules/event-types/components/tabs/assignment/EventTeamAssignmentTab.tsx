"use client";

import { useFormContext } from "react-hook-form";

import CheckedTeamSelect from "@calcom/features/eventtypes/components/CheckedTeamSelect";
import type { CheckedSelectOption } from "@calcom/features/eventtypes/components/CheckedTeamSelect";
import type { TeamMember } from "@calcom/features/eventtypes/lib/types";
import type { FormValues, EventTypeSetupProps } from "@calcom/features/eventtypes/lib/types";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { SchedulingType } from "@calcom/prisma/enums";

export type EventTeamAssignmentTabCustomClassNames = Record<string, unknown>;

type EventTeamAssignmentTabProps = {
  orgId: number | null;
  teamMembers: TeamMember[];
  team: EventTypeSetupProps["team"];
  eventType: EventTypeSetupProps;
};

export function EventTeamAssignmentTab({ teamMembers, eventType }: EventTeamAssignmentTabProps) {
  const { t } = useLocale();
  const formMethods = useFormContext<FormValues>();
  const hosts = formMethods.watch("hosts") ?? [];
  const schedulingType = formMethods.watch("schedulingType");
  const isCollective = schedulingType === SchedulingType.COLLECTIVE;

  const teamMemberOptions: CheckedSelectOption[] = teamMembers.map((member) => ({
    value: String(member.value),
    label: member.label,
    avatar: member.avatar,
    defaultScheduleId: member.defaultScheduleId,
    isFixed: isCollective,
    priority: 2,
    weight: 100,
    groupId: null,
  }));

  const selectedHosts: CheckedSelectOption[] = hosts
    .map((host) => {
      const member = teamMembers.find((m) => String(m.value) === String(host.userId));
      if (!member) return null;
      return {
        value: String(host.userId),
        label: member.label,
        avatar: member.avatar,
        defaultScheduleId: member.defaultScheduleId,
        isFixed: host.isFixed,
        priority: host.priority ?? 2,
        weight: host.weight ?? 100,
        groupId: host.groupId ?? null,
      };
    })
    .filter(Boolean) as CheckedSelectOption[];

  const handleChange = (newValue: readonly CheckedSelectOption[]) => {
    formMethods.setValue(
      "hosts",
      newValue.map((opt) => ({
        userId: Number(opt.value),
        isFixed: isCollective ? true : (opt.isFixed ?? false),
        priority: opt.priority ?? 2,
        weight: opt.weight ?? 100,
        groupId: opt.groupId ?? null,
      })),
      { shouldDirty: true }
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-emphasis mb-1 block text-sm font-medium">
          {isCollective ? t("collective") : t("round_robin")}
        </label>
        <p className="text-subtle text-sm">
          {isCollective ? t("collective_description") : t("round_robin_description")}
        </p>
      </div>
      <div>
        <label className="text-emphasis mb-1 block text-sm font-medium">{t("team_members")}</label>
        <CheckedTeamSelect
          options={teamMemberOptions}
          value={selectedHosts}
          onChange={handleChange}
          groupId={null}
        />
      </div>
    </div>
  );
}

export default EventTeamAssignmentTab;
