"use client";

import { useRouter } from "next/navigation";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button } from "@calcom/ui/components/button";

type Props = {
  subtitle?: string;
  buttonText?: string;
  disableMobileButton?: boolean;
  createFunction?: (teamId?: number) => void;
  onlyShowWithNoTeams?: boolean;
  onlyShowWithTeams?: boolean;
  includeOrg?: boolean;
  withPermission?: { permission: string; fallbackRoles: string[] };
};

export function CreateButtonWithTeamsList({ createFunction, buttonText }: Props) {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (createFunction) {
          createFunction();
        } else {
          router.push("/workflows/new");
        }
      }}>
      {buttonText ?? t("new")}
    </Button>
  );
}
