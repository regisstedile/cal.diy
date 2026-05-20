import { WEBAPP_URL } from "@calcom/lib/constants";
import { buildLegacyCtx, decodeParams } from "@lib/buildLegacyCtx";
import { getServerSideProps } from "@server/lib/team/[slug]/[type]/getServerSideProps";
import type { PageProps } from "app/_types";
import { generateMeetingMetadata } from "app/_utils";
import { withAppDirSsr } from "app/WithAppDirSsr";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import type { PageProps as LegacyPageProps } from "~/users/views/users-type-public-view";
import LegacyPage from "~/users/views/users-type-public-view";

const getData = withAppDirSsr<LegacyPageProps>(getServerSideProps);

export const generateMetadata = async ({ params, searchParams }: PageProps): Promise<Metadata> => {
  const props = await getData(
    buildLegacyCtx(await headers(), await cookies(), await params, await searchParams)
  );
  const { eventData, isBrandingHidden } = props;
  const decodedParams = decodeParams(await params);
  const profileName = eventData?.profile?.name ?? "";
  const title = eventData?.title ?? "";
  const meeting = {
    title,
    profile: { name: profileName, image: eventData?.profile.image },
    users: eventData?.subsetOfUsers.map((u) => ({ name: `${u.name}`, username: `${u.username}` })) ?? [],
  };
  return generateMeetingMetadata(
    meeting,
    () => `${title} | ${profileName}`,
    () => title,
    isBrandingHidden,
    WEBAPP_URL,
    `/team/${decodedParams.slug}/${decodedParams.type}`
  );
};

const ServerPage = async ({ params, searchParams }: PageProps) => {
  const props = await getData(
    buildLegacyCtx(await headers(), await cookies(), await params, await searchParams)
  );
  return <LegacyPage {...props} />;
};

export default ServerPage;
