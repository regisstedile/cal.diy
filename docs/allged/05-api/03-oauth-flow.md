# OAuth Flow — App Mobile

## Fluxo Completo

```
1. App abre WebView/Browser:
   GET https://cal.allged.com.br/api/v2/oauth/{CLIENT_ID}/authorize
       ?redirect_uri=com.allged.cal://oauth/callback
       &scope=READ_PROFILE+READ_BOOKING

2. Usuário faz login (se não logado) e autoriza

3. Backend cria AccessCode (expira em 10 min):
   Redirect → com.allged.cal://oauth/callback?code=abc123

4. App captura o code e troca por tokens:
   POST https://cal.allged.com.br/api/v2/oauth/{CLIENT_ID}/exchange
   Body: { code: "abc123", client_secret: "cal_secret_xxx" }
   Response: {
     status: "success",
     data: {
       access_token: "cal_access_xxx",
       refresh_token: "cal_refresh_xxx"
     }
   }

5. App armazena tokens de forma segura

6. App usa access_token para requests:
   GET https://cal.allged.com.br/api/v2/me
   Authorization: Bearer cal_access_xxx

7. Quando access_token expirar:
   POST https://cal.allged.com.br/api/v2/oauth/{CLIENT_ID}/refresh
   Body: { refresh_token: "cal_refresh_xxx" }
   Response: { access_token: "cal_access_novo", refresh_token: "cal_refresh_novo" }
```

## Scopes

| Scope | Aliases aceitos | Acesso |
|-------|----------------|--------|
| `READ_PROFILE` | `PROFILE_READ` | GET /me, dados do perfil |
| `READ_BOOKING` | `BOOKING_READ` | GET /bookings |
| `WRITE_BOOKING` | — | POST/PATCH/DELETE /bookings |

**Fix implementado**: os aliases são normalizados antes da validação. Um app que envia `PROFILE_READ` (formato antigo) funciona igual a `READ_PROFILE`.

Código: `packages/trpc/server/routers/viewer/oAuth/generateAuthCode.handler.ts`

## Configuração do Client OAuth

Criar em `/settings/developer/oauth`:

| Campo | Valor |
|-------|-------|
| Nome | ALLGED Mobile |
| Redirect URIs | `com.allged.cal://oauth/callback` |
| Scopes | READ_PROFILE, READ_BOOKING |

## Variáveis no App Mobile

```env
EXPO_PUBLIC_CAL_URL=https://cal.allged.com.br
EXPO_PUBLIC_CALCOM_CLIENT_ID=cal_...
EXPO_PUBLIC_CALCOM_CLIENT_SECRET=cal_secret_...
```

**ATENÇÃO**: `client_secret` no app mobile é inseguro (qualquer um que descompilar o APK consegue). Para produção real, o exchange deve acontecer em um servidor intermediário.

## Tokens — Duração

| Token | Duração padrão |
|-------|---------------|
| `AccessCode` | 10 minutos |
| `AccessToken` | 60 minutos |
| `RefreshToken` | 30 dias (renovação automática) |
