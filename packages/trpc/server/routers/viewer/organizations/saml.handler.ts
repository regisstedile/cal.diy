import process from "node:process";
import type { SAMLSSORecord } from "@boxyhq/saml-jackson";
import jackson from "@boxyhq/saml-jackson";
import { WEBAPP_URL } from "@calcom/lib/constants";
import { TRPCError } from "@trpc/server";
import type { TrpcSessionUser } from "../../../types";
import { assertCanManageOrganization, findCurrentOrganizationMembership } from "./organizationUtils";
import type { TSaveSamlConnectionInputSchema } from "./schema";

const SAML_PRODUCT = "cal-diy";
const SAML_PATH = "/api/auth/saml/acs";
const OIDC_PATH = "/api/auth/saml/oidc";

type SamlHandlerOptions = {
  ctx: {
    user: Pick<NonNullable<TrpcSessionUser>, "id">;
  };
};

type SaveSamlHandlerOptions = SamlHandlerOptions & {
  input: TSaveSamlConnectionInputSchema;
};

const getTenant = (organizationId: number) => `org-${organizationId}`;

const getServiceProviderDetails = () => ({
  acsUrl: `${WEBAPP_URL}${SAML_PATH}`,
  entityId: `${WEBAPP_URL}${SAML_PATH}`,
});

const getJacksonControllers = async () => {
  if (!process.env.SAML_DATABASE_URL) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "SAML_DATABASE_URL is not configured.",
    });
  }

  return jackson({
    externalUrl: WEBAPP_URL,
    samlPath: SAML_PATH,
    oidcPath: OIDC_PATH,
    db: {
      engine: "sql",
      type: "postgres",
      url: process.env.SAML_DATABASE_URL,
    },
    noAnalytics: true,
  });
};

const getSamlConnections = async (organizationId: number) => {
  const { connectionAPIController } = await getJacksonControllers();

  return connectionAPIController.getConnections({
    tenant: getTenant(organizationId),
    product: SAML_PRODUCT,
    strategy: "saml",
  }) as Promise<SAMLSSORecord[]>;
};

const buildSamlSettings = ({
  canUpdate,
  connection,
}: {
  canUpdate: boolean;
  connection?: SAMLSSORecord;
}) => ({
  isSamlAvailable: Boolean(process.env.SAML_DATABASE_URL),
  isConfigured: Boolean(connection),
  canUpdate,
  serviceProvider: getServiceProviderDetails(),
  connection: connection
    ? {
        name: connection.name ?? null,
        label: connection.label ?? null,
        clientID: connection.clientID,
        tenant: connection.tenant,
        product: connection.product,
        provider: connection.idpMetadata.provider,
        entityID: connection.idpMetadata.entityID,
        deactivated: connection.deactivated ?? false,
      }
    : null,
});

export const getSamlSettingsHandler = async ({ ctx }: SamlHandlerOptions) => {
  const membership = await findCurrentOrganizationMembership({ userId: ctx.user.id });

  if (!membership) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Organization not found." });
  }

  const canUpdate = membership.role === "OWNER" || membership.role === "ADMIN";

  if (!process.env.SAML_DATABASE_URL) {
    return buildSamlSettings({ canUpdate });
  }

  const connections = await getSamlConnections(membership.team.id);

  return buildSamlSettings({ canUpdate, connection: connections[0] as SAMLSSORecord | undefined });
};

export const saveSamlConnectionHandler = async ({ ctx, input }: SaveSamlHandlerOptions) => {
  const membership = await assertCanManageOrganization({ userId: ctx.user.id });
  const { connectionAPIController } = await getJacksonControllers();
  const tenant = getTenant(membership.team.id);
  const existingConnections = await getSamlConnections(membership.team.id);

  if (existingConnections[0]) {
    await connectionAPIController.updateSAMLConnection({
      tenant,
      product: SAML_PRODUCT,
      clientID: existingConnections[0].clientID,
      clientSecret: existingConnections[0].clientSecret,
      name: membership.team.name ?? "Organization SAML",
      label: membership.team.slug ?? tenant,
      defaultRedirectUrl: WEBAPP_URL,
      redirectUrl: WEBAPP_URL,
      rawMetadata: input.rawMetadata,
    });
  } else {
    await connectionAPIController.createSAMLConnection({
      tenant,
      product: SAML_PRODUCT,
      name: membership.team.name ?? "Organization SAML",
      label: membership.team.slug ?? tenant,
      defaultRedirectUrl: WEBAPP_URL,
      redirectUrl: WEBAPP_URL,
      rawMetadata: input.rawMetadata,
    });
  }

  const connections = await getSamlConnections(membership.team.id);

  return buildSamlSettings({ canUpdate: true, connection: connections[0] as SAMLSSORecord | undefined });
};

export const deleteSamlConnectionHandler = async ({ ctx }: SamlHandlerOptions) => {
  const membership = await assertCanManageOrganization({ userId: ctx.user.id });
  const { connectionAPIController } = await getJacksonControllers();

  await connectionAPIController.deleteConnections({
    tenant: getTenant(membership.team.id),
    product: SAML_PRODUCT,
    strategy: "saml",
  });

  return buildSamlSettings({ canUpdate: true });
};
