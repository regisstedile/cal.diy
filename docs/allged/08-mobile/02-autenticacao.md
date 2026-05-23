# Autenticação Mobile

## Fluxo OAuth

```
1. Usuário toca "Login"
2. App abre browser/WebView:
   https://cal.allged.com.br/api/v2/oauth/{CLIENT_ID}/authorize
   ?redirect_uri=com.allged.cal://oauth/callback
   &scope=READ_PROFILE+READ_BOOKING

3. Usuário faz login no cal.allged.com.br (email+senha ou Google)

4. Sistema redireciona para app:
   com.allged.cal://oauth/callback?code=abc123

5. App captura o code via Expo Router deep link

6. App troca code por tokens:
   POST /api/v2/oauth/{CLIENT_ID}/exchange
   { code, client_secret }

7. Tokens armazenados com Expo SecureStore

8. Requests subsequentes usam access_token no header
```

## Configuração

```
companion/apps/mobile/.env (ou app.json extra):
  EXPO_PUBLIC_CAL_URL=https://cal.allged.com.br
  EXPO_PUBLIC_CALCOM_CLIENT_ID=cal_...
  EXPO_PUBLIC_CALCOM_CLIENT_SECRET=cal_secret_...
```

## Deep Link / Redirect URI

URL scheme registrado: `com.allged.cal`

No `app.json`:
```json
{
  "expo": {
    "scheme": "com.allged.cal"
  }
}
```

## Fix de Scopes

O app enviava `READ_PROFILE` mas o backend esperava `PROFILE_READ` (ou vice-versa). Implementamos normalização no backend:

```typescript
// generateAuthCode.handler.ts
const SCOPE_ALIASES: Record<string, AccessScope> = {
  READ_PROFILE: AccessScope.READ_PROFILE,
  PROFILE_READ: AccessScope.READ_PROFILE,
  READ_BOOKING: AccessScope.READ_BOOKING,
  BOOKING_READ: AccessScope.READ_BOOKING,
};
```

Agora qualquer formato é aceito.

## Token Storage

Tokens são armazenados via `expo-secure-store` (iOS: Keychain, Android: EncryptedSharedPreferences):

```typescript
await SecureStore.setItemAsync("access_token", tokens.access_token);
await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);
```

## Refresh Automático

Quando uma request retorna 401, o app tenta renovar o token:

```typescript
POST /api/v2/oauth/{CLIENT_ID}/refresh
{ refresh_token: storedRefreshToken }
→ { access_token, refresh_token }
```

Se o refresh falhar, redireciona para login.

## Logout

Remove os tokens do SecureStore e redireciona para login.
