import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { buildLegacyRequest } from "@lib/buildLegacyCtx";
import { _generateMetadata } from "app/_utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import OrganizationMembersView from "~/settings/organizations/members-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("members"),
    (t) => t("organization_members"),
    undefined,
    undefined,
    "/members"
  );

const Page = async () => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });

  if (!session) {
    redirect("/auth/login?callbackUrl=/members");
  }

  return <OrganizationMembersView />;
};

export default Page;
