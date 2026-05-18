import { _generateMetadata, getTranslate } from "app/_utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

import TeamsView from "~/settings/teams/teams-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("teams"),
    () => "Gerencie times e membros.",
    undefined,
    undefined,
    "/settings/teams"
  );

const Page = async () => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  await getTranslate();

  if (!session) {
    redirect("/auth/login?callbackUrl=/settings/teams");
  }

  return <TeamsView />;
};

export default Page;
