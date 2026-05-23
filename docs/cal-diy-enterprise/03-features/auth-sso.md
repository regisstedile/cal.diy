---
title: "Auth & SSO — cal-diy Enterprise"
tags: [auth, saml, sso, nextauth, oauth, 2fa, organizations]
created: 2026-05-23
---

# Auth & SSO

## Posição no sistema

```
Login page → NextAuth providers → signIn callback → session JWT
                                      ↓
                            IdentityProvider enum (CAL | GOOGLE | AZUREAD | SAML)
                                      ↓
                            User.identityProvider atualizado
                                      ↓
                        (se SAML) BoxyHQ Jackson → IdP corporativo
```

---

## Providers disponíveis

**Arquivo:** `packages/features/auth/lib/next-auth-options.ts`

Providers são registrados condicionalmente por variáveis de ambiente:

| Provider | ID NextAuth | Habilitado quando |
|----------|------------|-------------------|
| Email/Senha | `cal` (CredentialsProvider) | Sempre |
| Magic Link | `email` (EmailProvider) | Sempre (10 min validade) |
| Google OAuth | `google` | `GOOGLE_LOGIN_ENABLED=true` + `GOOGLE_API_CREDENTIALS` |
| Azure AD | `azure-ad` | `OUTLOOK_LOGIN_ENABLED` + `OUTLOOK_CLIENT_ID/SECRET` |
| SAML (SP-init) | `saml` | `SAML_DATABASE_URL` configurado |
| SAML (IdP-init) | `saml-idp` | `SAML_DATABASE_URL` configurado |

```typescript
// Lógica de registro — next-auth-options.ts
const providers: Provider[] = [CalComCredentialsProvider]; // sempre

if (IS_GOOGLE_LOGIN_ENABLED) providers.push(GoogleProvider(...));
if (OUTLOOK_LOGIN_ENABLED)   providers.push(AzureADProvider(...));
providers.push(EmailProvider({ maxAge: 10 * 60 * 60 })); // sempre

if (isSAMLLoginEnabled) {   // isSAMLLoginEnabled = !!SAML_DATABASE_URL
  providers.push({ id: "saml", ... });     // SP-initiated
  providers.push(CredentialsProvider({ id: "saml-idp", ... })); // IdP-initiated
}
```

### IdentityProvider enum

**Arquivo:** `packages/features/auth/lib/identityProviders.ts`

```typescript
export const NEXTAUTH_TO_IDENTITY_PROVIDER: Record<string, IdentityProvider> = {
  "azure-ad": IdentityProvider.AZUREAD,
  google:     IdentityProvider.GOOGLE,
  saml:       IdentityProvider.SAML,
  "saml-idp": IdentityProvider.SAML,
  cal:        IdentityProvider.CAL,
};
```

Armazenado em `User.identityProvider` — determina qual provider o usuário deve usar no próximo login.

---

## SAML SSO — BoxyHQ Jackson

### Biblioteca

`@boxyhq/saml-jackson` — Jackson converte SAML Assertion em Authorization Code OAuth2. NextAuth vê apenas um provider OAuth2 padrão; a complexidade SAML fica em Jackson.

**Arquivo:** `packages/features/ee/sso/lib/jackson.ts`

```typescript
const opts: JacksonOption = {
  externalUrl: WEBAPP_URL,
  samlPath: "/api/auth/saml/callback",
  samlAudience: "https://saml.cal.com",
  oidcPath: "/api/auth/oidc",
  scimPath: "/api/scim/v2.0",
  db: {
    engine: "sql",
    type: "postgres",
    url: samlDatabaseUrl,             // SAML_DATABASE_URL
    encryptionKey: process.env.CALENDSO_ENCRYPTION_KEY,
  },
  idpEnabled: true,
  clientSecretVerifier,               // SAML_CLIENT_SECRET_VERIFIER
};

// Singleton via globalThis — evita múltiplas instâncias em hot-reload
export default async function init() {
  if (!globalThis.connectionController) {
    const { controllers } = await import("@boxyhq/saml-jackson");
    const ret = await controllers(opts);
    globalThis.connectionController = ret.connectionAPIController;
    globalThis.oauthController       = ret.oauthController;
    globalThis.samlSPConfig          = ret.spConfig;
  }
  return { connectionController, oauthController, samlSPConfig };
}
```

### Fluxo SP-Initiated (provider "saml")

```
1. Usuário acessa /auth/login → seleciona "SSO" → digita email
2. NextAuth → /api/auth/saml/authorize
   → oauthController.authorize({ tenant: "org-123", product: "cal-diy" })
   → redirect para IdP (Okta, Azure, etc.)

3. IdP autentica usuário → POST /api/auth/saml/callback
   → oauthController.samlResponse({ SAMLResponse, RelayState })
   → redirect para NextAuth com ?code=xxx

4. NextAuth → /api/auth/saml/token (troca code por access_token)
5. NextAuth → /api/auth/saml/userinfo (busca perfil do usuário)
6. NextAuth cria/atualiza User, gera JWT de sessão
```

### Fluxo IdP-Initiated (provider "saml-idp")

Usuário clica no tile do app no portal do IdP (Okta/Azure):

```
IdP → POST /api/auth/saml/callback (sem state/PKCE)
    → oauthController.samlResponse() → code
    → NextAuth saml-idp:authorize(code)
        → oauthController.token({ code })
        → oauthController.userInfo(access_token)
        → busca usuário por email no DB
        → retorna SamlIdpUser para NextAuth
```

### Isolamento por Organização

```typescript
// saml.handler.ts
const SAML_PRODUCT = "cal-diy";
const getTenant = (organizationId: number) => `org-${organizationId}`;

// Cada org tem seu próprio IdP SAML
// tenant=org-42, product=cal-diy → conexão isolada
```

---

## Gestão de conexões SAML (tRPC)

**Arquivo:** `packages/trpc/server/routers/viewer/organizations/saml.handler.ts`

| Handler | Ação |
|---------|------|
| `getSamlSettingsHandler` | Retorna configuração atual + Service Provider details |
| `saveSamlConnectionHandler` | Cria ou atualiza conexão via rawMetadata XML do IdP |
| `deleteSamlConnectionHandler` | Remove conexão |

Restrição: somente `role = OWNER` ou `ADMIN` da org pode gerenciar.

```typescript
// SP details para configurar no IdP
const getServiceProviderDetails = () => ({
  acsUrl: `${WEBAPP_URL}/api/auth/saml/callback`,   // ACS URL
  entityId: `${WEBAPP_URL}/api/auth/saml/callback`, // Entity ID
});
```

### Salvar conexão

```typescript
// Input: rawMetadata (XML do IdP copiado do portal)
await connectionController.createSAMLConnection({
  tenant: "org-42",
  product: "cal-diy",
  name: "Minha Empresa",
  defaultRedirectUrl: WEBAPP_URL,
  redirectUrl: WEBAPP_URL,
  rawMetadata: input.rawMetadata,  // XML do IdP
});
```

---

## 2FA (TOTP)

**Arquivo:** `packages/features/auth/lib/next-auth-options.ts` — `authorizeCredentials()`

```
Login email/senha com 2FA habilitado:
1. user.twoFactorEnabled = true
2. credentials.totpCode presente → verifica TOTP
3. credentials.backupCode presente → verifica backup code
4. Nenhum → throw SecondFactorRequired → frontend solicita code
```

Backup codes: criptografados com `CALENDSO_ENCRYPTION_KEY` (AES simétrico via `symmetricEncrypt`). Uso de backup code descarta o código do array.

---

## ORGANIZATIONS_AUTOLINK

```typescript
// next-auth-options.ts
const ORGANIZATIONS_AUTOLINK = process.env.ORGANIZATIONS_AUTOLINK === "1";

// Se habilitado + login via Google/AzureAD:
// Verifica se existe org com orgAutoAcceptEmail == domínio do email
// Sim → adiciona usuário à org automaticamente
const existingOrg = await prisma.team.findFirst({
  where: {
    organizationSettings: {
      isOrganizationVerified: true,
      orgAutoAcceptEmail: email.split("@")[1],
    },
  },
});
```

---

## Autenticação de credenciais — fluxo detalhado

**Arquivo:** `packages/features/auth/lib/next-auth-options.ts` — `authorizeCredentials()`

```
1. Busca User por email
2. user.locked = true → UserAccountLocked
3. Rate limit por hash do email (checkRateLimitAndThrowError)
4. user.password.hash ausente → IncorrectEmailPassword
   (usuário SSO não tem senha — deve usar seu IdP)
5. verifyPassword(credentials.password, hash)
6. Se 2FA: verificar totpCode ou backupCode
7. Retorna User para NextAuth
```

---

## Variáveis de ambiente

| Variável | Obrigatória | Efeito |
|----------|-------------|--------|
| `SAML_DATABASE_URL` | Para SAML | Habilita `isSAMLLoginEnabled`; banco onde Jackson armazena conexões |
| `SAML_CLIENT_SECRET_VERIFIER` | Para SAML | Secret OAuth2 interno Jackson; default "dummy" (trocar em prod) |
| `CALENDSO_ENCRYPTION_KEY` | Sempre | Criptografa 2FA backup codes + SAML DB |
| `GOOGLE_LOGIN_ENABLED` | Para Google | `true` habilita GoogleProvider |
| `GOOGLE_API_CREDENTIALS` | Para Google | JSON `{"web":{"client_id":...,"client_secret":...}}` |
| `OUTLOOK_LOGIN_ENABLED` | Para Azure | Habilita AzureADProvider |
| `OUTLOOK_CLIENT_ID` | Para Azure | App ID do Azure AD |
| `OUTLOOK_CLIENT_SECRET` | Para Azure | Client secret do Azure AD |
| `ORGANIZATIONS_AUTOLINK` | Opcional | `1` = auto-associa usuários Google/Azure à org pelo domínio |

---

## Operação — configurar SAML na instância ALLGED

### Pré-requisitos

1. `SAML_DATABASE_URL` apontando para banco postgres (pode ser o mesmo banco principal ou separado)
2. `SAML_CLIENT_SECRET_VERIFIER` definido com valor secreto
3. `CALENDSO_ENCRYPTION_KEY` definido (32 chars)

### Passos

1. No IdP (Okta, Azure, Google Workspace, etc.):
   - Criar novo aplicativo SAML
   - ACS URL: `https://cal.seudominio.com/api/auth/saml/callback`
   - Entity ID: `https://cal.seudominio.com/api/auth/saml/callback`
   - Baixar XML de metadados do IdP

2. No cal-diy — Org Settings → Security → SAML:
   - Colar XML de metadados
   - Salvar → tRPC `saveSamlConnection` → Jackson armazena no `SAML_DATABASE_URL`

3. Testar: acessar `/auth/login` → SSO → digitar email do domínio da org

### Diagnóstico

| Sintoma | Causa provável |
|---------|----------------|
| "SAML_DATABASE_URL is not configured" | Var não setada; provider desabilitado |
| "Error authenticating user" no callback | XML de metadados inválido ou expirado |
| Usuário não encontrado após SSO | Email no SAML Assertion ≠ email no cal-diy |
| Loop de redirect | `NEXTAUTH_URL` incorreto vs `externalUrl` no Jackson |

---

## Rastreabilidade

| Camada | Arquivo |
|--------|---------|
| Provider config | `packages/features/auth/lib/next-auth-options.ts` |
| IdentityProvider map | `packages/features/auth/lib/identityProviders.ts` |
| Jackson init | `packages/features/ee/sso/lib/jackson.ts` |
| SAML constants | `packages/features/ee/sso/lib/saml.ts` |
| SAML authorize | `apps/web/app/api/auth/saml/authorize/route.ts` |
| SAML callback | `apps/web/app/api/auth/saml/callback/route.ts` |
| SAML token | `apps/web/app/api/auth/saml/token/route.ts` |
| Org SAML handlers | `packages/trpc/server/routers/viewer/organizations/saml.handler.ts` |
| Schema | `packages/prisma/enums/index.ts` — `IdentityProvider` enum |
