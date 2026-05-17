import type {
  IConnectionAPIController,
  IOAuthController,
  ISPSSOConfig,
  JacksonOption,
  OAuthReq,
  OAuthTokenReq,
  SAMLResponsePayload,
} from "@boxyhq/saml-jackson";

import { WEBAPP_URL } from "@calcom/lib/constants";

import { clientSecretVerifier, oidcPath, samlAudience, samlDatabaseUrl, samlPath } from "./saml";

export type { OAuthReq, OAuthTokenReq, SAMLResponsePayload };

const opts: JacksonOption = {
  externalUrl: WEBAPP_URL,
  samlPath,
  samlAudience,
  oidcPath,
  scimPath: "/api/scim/v2.0",
  db: {
    engine: "sql",
    type: "postgres",
    url: samlDatabaseUrl,
    encryptionKey: process.env.CALENDSO_ENCRYPTION_KEY,
  },
  idpEnabled: true,
  clientSecretVerifier,
};

declare global {
  // eslint-disable-next-line no-var
  var connectionController: IConnectionAPIController | undefined;
  // eslint-disable-next-line no-var
  var oauthController: IOAuthController | undefined;
  // eslint-disable-next-line no-var
  var samlSPConfig: ISPSSOConfig | undefined;
}

export default async function init() {
  if (!globalThis.connectionController || !globalThis.oauthController || !globalThis.samlSPConfig) {
    const { controllers } = await import("@boxyhq/saml-jackson");
    const ret = await controllers(opts);
    globalThis.connectionController = ret.connectionAPIController;
    globalThis.oauthController = ret.oauthController;
    globalThis.samlSPConfig = ret.spConfig;
  }

  return {
    connectionController: globalThis.connectionController as IConnectionAPIController,
    oauthController: globalThis.oauthController as IOAuthController,
    samlSPConfig: globalThis.samlSPConfig as ISPSSOConfig,
  };
}
