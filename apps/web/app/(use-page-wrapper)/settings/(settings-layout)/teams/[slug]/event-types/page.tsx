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

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  await getTranslate();

  if (!session) {
    redirect(`/auth/login?callbackUrl=/settings/teams/${slug}/event-types`);
  }

  const team = await prisma.team.findFirst({
    where: { slug, isOrganization: false },
    select: { id: true, slug: true },
  });

  if (!team) {
    notFound();
  }

  return <TeamEventTypesView teamId={team.id} teamSlug={team.slug ?? slug} />;
};

export default Page;
