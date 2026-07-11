import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { buildLegacyRequest } from "@lib/buildLegacyCtx";
import { _generateMetadata } from "app/_utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import NewTeamView from "~/settings/teams/new-team-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("create_new_team"),
    (t) => t("create_new_team_description"),
    undefined,
    undefined,
    "/settings/teams/new"
  );

const Page = async () => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });

  if (!session) {
    redirect("/auth/login?callbackUrl=/settings/teams/new");
  }

  return <NewTeamView />;
};

export default Page;
