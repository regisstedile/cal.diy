import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import prisma from "@calcom/prisma";
import { inviteMemberByToken } from "@calcom/trpc/server/routers/viewer/teams/invites";
import { buildLegacyRequest } from "@lib/buildLegacyCtx";
import type { PageProps } from "app/_types";
import { _generateMetadata } from "app/_utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactElement } from "react";
import TeamsView from "~/settings/teams/teams-view";

const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("teams"),
    (t) => t("create_manage_teams_collaborative"),
    undefined,
    undefined,
    "/teams"
  );

const Page = async ({ searchParams }: PageProps): Promise<ReactElement> => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  const token = (await searchParams).token;
  let inviteToken = "";
  if (typeof token === "string") {
    inviteToken = token.trim();
  }

  let callbackUrl = "/teams";
  if (inviteToken) {
    callbackUrl = `/teams?token=${encodeURIComponent(inviteToken)}`;
  }

  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (inviteToken) {
    try {
      await inviteMemberByToken({ prisma, token: inviteToken, userId: session.user.id });
    } catch {
      // Invalid, expired, or already-used links should not block the teams page.
    }
    redirect("/teams");
  }

  return <TeamsView />;
};

export { generateMetadata };
export default Page;
