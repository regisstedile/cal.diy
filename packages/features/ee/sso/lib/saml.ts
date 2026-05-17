export const samlDatabaseUrl = process.env.SAML_DATABASE_URL || "";
export const isSAMLLoginEnabled = samlDatabaseUrl.length > 0;

export const samlAudience = "https://saml.cal.com";
export const samlPath = "/api/auth/saml/callback";
export const oidcPath = "/api/auth/oidc";
export const clientSecretVerifier = process.env.SAML_CLIENT_SECRET_VERIFIER || "dummy";
