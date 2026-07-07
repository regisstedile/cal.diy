import { _generateMetadata, getTranslate } from "app/_utils";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import prisma from "@calcom/prisma";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

import TeamEventTypesView from "~/settings/teams/team-event-types-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("team_event_types"),
    () => "Manage team event types.",
    undefined,
    undefined,
    "/settings/teams"
  );

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const teamId = parseInt(id, 10);

  if (Number.isNaN(teamId)) {
    notFound();
  }

  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  await getTranslate();

  if (!session) {
    redirect(`/auth/login?callbackUrl=/settings/teams/${id}/event-types`);
  }

  const team = await prisma.team.findFirst({
    where: { id: teamId, isOrganization: false },
    select: { id: true, slug: true },
  });

  if (!team) {
    notFound();
  }

  return <TeamEventTypesView teamId={team.id} teamSlug={team.slug ?? ""} />;
};

export default Page;
