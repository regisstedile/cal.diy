# OAuth Platform — Integração com App Mobile

## O que é

O OAuth Platform permite que aplicações externas (como o app mobile) autentiquem usuários do cal.diy e acessem a API em nome deles.

## Modelos

| Modelo | Banco | Descrição |
|--------|-------|-----------|
| `PlatformOAuthClient` | `cal` | Client OAuth registrado |
| `AccessToken` | `cal_src` | Token de acesso (curta duração) |
| `RefreshToken` | `cal_src` | Token de renovação (longa duração) |
| `AccessCode` | `cal_src` | Código temporário do authorization code flow |

## Fluxo Authorization Code

```
1. App abre browser: 
   GET /api/v2/oauth/{clientId}/authorize
   ?redirect_uri=myapp://callback
   &scope=READ_PROFILE,READ_BOOKING

2. Usuário faz login e autoriza

3. Redirect para app com code:
   myapp://callback?code=abc123

4. App troca code por tokens:
   POST /api/v2/oauth/{clientId}/exchange
   Body: { code: "abc123", client_secret: "..." }
   Response: { access_token: "...", refresh_token: "..." }

5. App usa access_token:
   GET /api/v2/me
   Authorization: Bearer {access_token}

6. Quando expirar, renovar:
   POST /api/v2/oauth/{clientId}/refresh
   Body: { refresh_token: "..." }
```

## Scopes

| Scope | Acesso |
|-------|--------|
| `READ_PROFILE` | Dados do perfil do usuário |
| `READ_BOOKING` | Lista de bookings |
| `WRITE_BOOKING` | Criar/cancelar bookings |

**Aliases suportados** (fix nosso):
- `READ_PROFILE` = `PROFILE_READ`
- `READ_BOOKING` = `BOOKING_READ`

O handler normaliza qualquer formato antes de validar.

## OAuth Client do App Mobile

Criado em `/settings/developer/oauth` ou `/settings/admin/oauth`:

```
Client ID: cal_...
Client Secret: cal_secret_...
Name: ALLGED Mobile
Redirect URIs: com.allged.cal://oauth/callback
Scopes: READ_PROFILE, READ_BOOKING
```

## Configuração no App Mobile

```typescript
// companion/apps/mobile/services/oauthService.ts
const CLIENT_ID = process.env.EXPO_PUBLIC_CALCOM_CLIENT_ID;
const CAL_BASE_URL = process.env.EXPO_PUBLIC_CAL_URL; // https://cal.allged.com.br
```

## Código Relevante

- Handler exchange/refresh: `packages/trpc/server/routers/viewer/oAuth/`
- Normalização de scopes: `generateAuthCode.handler.ts`
- API Platform routes: `apps/api/v2/src/modules/oauth-clients/`
