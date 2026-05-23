import { WEBAPP_URL } from "@calcom/lib/constants";
import { buildLegacyCtx, decodeParams } from "@lib/buildLegacyCtx";
import { getServerSideProps } from "@server/lib/[user]/getServerSideProps";
import type { PageProps } from "app/_types";
import { generateMeetingMetadata } from "app/_utils";
import { withAppDirSsr } from "app/WithAppDirSsr";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import type React from "react";
import type { PageProps as LegacyPageProps } from "~/users/views/users-public-view";
import LegacyPage from "~/users/views/users-public-view";

import type { Params } from "app/_types";

async function resolveParams(params: Promise<Params>): Promise<Params> {
  const { orgSlug: _orgSlug, ...rest } = await params;
  return rest;
}

const getData: (ctx: ReturnType<typeof buildLegacyCtx>) => Promise<LegacyPageProps> =
  withAppDirSsr<LegacyPageProps>(getServerSideProps);

const ServerPage = async ({ params, searchParams }: PageProps): Promise<JSX.Element> => {
  const resolvedParams = resolveParams(params);
  const props = await getData(
    buildLegacyCtx(await headers(), await cookies(), await resolvedParams, await searchParams)
  );

  return <LegacyPage {...props} />;
};

export const generateMetadata = async ({ params, searchParams }: PageProps): Promise<Metadata> => {
  const resolvedParams = resolveParams(params);
  const props = await getData(
    buildLegacyCtx(await headers(), await cookies(), await resolvedParams, await searchParams)
  );

  const { profile, markdownStrippedBio, isOrgSEOIndexable } = props;
  const isOrg = !!profile?.organization;
  const allowSEOIndexing =
    (!isOrg && profile.allowSEOIndexing) || (isOrg && isOrgSEOIndexable && profile.allowSEOIndexing);

  const meeting = {
    title: markdownStrippedBio,
    profile: { name: `${profile.name}`, image: profile.image },
    users: [{ username: `${profile.username}`, name: `${profile.name}` }],
  };
  const decodedParams = decodeParams(await resolvedParams);
  const metadata = await generateMeetingMetadata(
    meeting,
    () => profile.name,
    () => markdownStrippedBio,
    false,
    WEBAPP_URL,
    `/${decodedParams.user}`
  );

  return {
    ...metadata,
    robots: {
      follow: allowSEOIndexing,
      index: allowSEOIndexing,
    },
  };
};

export default ServerPage;
