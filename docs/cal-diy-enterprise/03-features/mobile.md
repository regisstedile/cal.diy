---
title: "Mobile App — companion/apps/mobile"
tags: [mobile, expo, oauth, bookings, widget, android, ios]
created: 2026-05-23
---

# Mobile App

**Repo:** `companion/apps/mobile` (Expo SDK, React Native + Web)

App companheira para operadores do cal.diy: visualiza, confirma, reagenda e cancela bookings via API REST. Funciona como app nativo (iOS/Android), extensão de browser (Chrome/Firefox/Safari) e webapp embarcado em iframe.

---

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Expo SDK (React Native) |
| Roteamento | Expo Router (file-based, similar Next.js App Router) |
| Estado remoto | TanStack Query (React Query v5) |
| Estilo | NativeWind (Tailwind CSS para RN) |
| Auth | OAuth2 + PKCE implementado manualmente |
| Widget | Expo Widgets (iOS) / Glance (Android) |

---

## Configuração de URLs — region.ts

**Arquivo:** `utils/region.ts`

Todas as URLs são roteadas por uma camada de região (`"us"` | `"eu"`). Regra: **nunca** usar hostnames literais `cal.com`/`cal.eu` no código — CI enforça isso via `bun run check:no-cal-hostnames`.

```typescript
export function getCalAppUrl(region = currentRegion): string {
  // Self-hosted: app.json extra > EXPO_PUBLIC_CALCOM_APP_URL > default
  const url = EXTRA.calcomAppUrl || process.env.EXPO_PUBLIC_CALCOM_APP_URL;
  if (url) return url;
  return region === "eu" ? "https://app.cal.eu" : "https://app.cal.com";
}

export function getCalApiUrl(region = currentRegion): string {
  const url = EXTRA.calcomApiUrl || process.env.EXPO_PUBLIC_CALCOM_API_URL;
  if (url) return url;
  return region === "eu" ? "https://api.cal.eu" : "https://api.cal.com";
}
```

### Hierarquia de configuração de URL

```
1. Constants.expoConfig.extra.calcomAppUrl   ← app.json (baked in build, autopreferido)
2. EXPO_PUBLIC_CALCOM_APP_URL                ← variável de ambiente EAS
3. "https://app.cal.com" / "https://app.cal.eu" ← default
```

Para instância self-hosted (cal.diy/ALLGED), o campo `extra` no `app.json` é o método principal — não requer EAS para funcionar.

### Deep link schemes

```json
// app.json
{
  "expo": {
    "scheme": ["meu-agendamento", "expo-wxt-app"]
  }
}
```

- `meu-agendamento://` — scheme principal da app
- `expo-wxt-app://oauth/callback` — redirect URI para OAuth

---

## Fluxo OAuth — CalComOAuthService

**Arquivo:** `services/oauthService.ts`

`CalComOAuthService` implementa OAuth2 + PKCE (S256) do zero (sem `expo-auth-session`). Suporta três contextos de execução:

### Contextos de execução

| Contexto | Detecção | Método |
|----------|----------|--------|
| Mobile (iOS/Android) | `Platform.OS !== "web"` | `WebBrowser.openAuthSessionAsync` |
| Extensão | `chrome.identity` / `browser.identity` | `launchWebAuthFlow` |
| Iframe | `window.parent !== window` | postMessage para content script |

### Fluxo mobile

```
1. generatePKCEParams() → codeVerifier + codeChallenge(S256) + state
2. buildAuthorizationUrl() → {calcomBaseUrl}/auth/oauth2/authorize?...
   - iOS: append register=false (não redireciona para cadastro)
3. WebBrowser.openAuthSessionAsync(authUrl, redirectUri)
   + Linking.addEventListener("url", ...) ← Android fix

4. Android: Chrome Custom Tab fecha via deep link → type="dismiss"
   Linking event captura URL antes do timeout de 2s

5. iOS: tipo "success" retorna URL diretamente via SFAuthenticationSession

6. exchangeCodeForTokens(code, state)
   → POST {calcomBaseUrl}/api/auth/oauth/token
   → retorna { accessToken, refreshToken, expiresAt, scope }
```

### Android — correção de redirect crítica

Chrome Custom Tab no Android não retorna `type: "success"` ao fechar via deep link — retorna `"dismiss"`. Fix implementado em `getMobileAuthResult()`:

```typescript
const subscription = Linking.addEventListener("url", ({ url }) => {
  if (url.startsWith(redirectUri)) {
    finish({ type: "success", params: this.parseCallbackUrl(url) });
  }
});

WebBrowser.openAuthSessionAsync(authUrl, redirectUri, {
  preferEphemeralSession: false,
}).then((result) => {
  if (result.type === "success") {
    finish({ type: "success", params: this.parseCallbackUrl(result.url) });
    return;
  }
  if (Platform.OS === "android") {
    setTimeout(() => finish({ type: "error" }), 2000); // grace window
  } else {
    finish({ type: "error" });
  }
});
```

### Fluxo extensão de browser

```
chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true })
  → resolve com responseUrl contendo code
  → parseCallbackUrl → code, state
  → exchangeCodeForTokens

Firefox/Safari: browser.identity.launchWebAuthFlow (Promise-based)
Iframe fallback: postMessage OAUTH_REQUEST → parent → OAUTH_RESULT
```

### Configuração por browser e região

```typescript
// Web: cliente OAuth diferente por browser (extensões têm IDs diferentes)
// Mobile: mesmo redirectUri para US e EU (só clientId muda)
function getBrowserSpecificOAuthConfig(region: CalRegion): { clientId, redirectUri }

// Variáveis de ambiente:
// EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID        (Chrome/mobile US)
// EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID_EU     (Chrome/mobile EU)
// EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID_FIREFOX
// EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID_SAFARI
// EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID_EDGE
// (mesmo padrão para _REDIRECT_URI)
```

### Token refresh

```typescript
async refreshAccessToken(refreshToken: string): Promise<OAuthTokens> {
  // POST {calcomBaseUrl}/api/auth/oauth/refreshToken
  // Se iframe: via postMessage → syncTokensToExtension(tokens)
}

isTokenExpired(tokens: OAuthTokens): boolean {
  // Trata ausência de expiresAt como expirado (fail-safe)
  return !tokens.expiresAt || Date.now() >= tokens.expiresAt - 5 * 60 * 1000;
}
```

---

## API de Bookings

**Arquivo:** `services/calcom/bookings.ts`
**API version:** `2024-08-13` (header `cal-api-version`)

### Operações disponíveis

| Função | Método | Endpoint |
|--------|--------|---------|
| `getBookings(filters)` | GET | `/bookings` |
| `getBookingByUid(uid)` | GET | `/bookings/{uid}` |
| `cancelBooking(uid, reason)` | POST | `/bookings/{uid}/cancel` |
| `rescheduleBooking(uid, input)` | POST | `/bookings/{uid}/reschedule` |
| `confirmBooking(uid)` | POST | `/bookings/{uid}/confirm` |
| `declineBooking(uid, reason)` | POST | `/bookings/{uid}/decline` |
| `markAbsent(uid, email, absent)` | POST | `/bookings/{uid}/mark-absent` |
| `addGuests(uid, guests)` | POST | `/bookings/{uid}/guests` |
| `updateLocationV2(uid, location)` | PATCH | `/bookings/{uid}/location` |
| `getRecordings(uid)` | GET | `/bookings/{uid}/recordings` |
| `getConferencingSessions(uid)` | GET | `/bookings/{uid}/conferencing-sessions` |
| `getTranscripts(uid)` | GET | `/bookings/{uid}/transcripts` |

### Filtragem de participação

`getBookings()` filtra automaticamente somente bookings onde o usuário logado participa (como organizer, host ou attendee):

```typescript
export const getBookingParticipation = (booking, userId, userEmail) => ({
  isOrganizer: booking.user.id === userId || booking.user.email === userEmail,
  isHost:      booking.hosts?.some(h => h.id === userId || h.email === userEmail),
  isAttendee:  booking.attendees?.some(a => a.id === userId || a.email === userEmail),
  isParticipating: isOrganizer || isHost || isAttendee,
});
```

### Parsing defensivo de resposta

API pode retornar `data`, `bookings`, `items`, `data.bookings`, ou `data.items`:

```typescript
if (resp.data && Array.isArray(resp.data))         bookingsArray = resp.data;
else if (resp.bookings && Array.isArray(resp.bookings)) bookingsArray = resp.bookings;
else if (resp.items && Array.isArray(resp.items))  bookingsArray = resp.items;
// ... fallback para Object.values
```

---

## Hooks React Query

**Arquivo:** `hooks/useBookings.ts`

```typescript
// Query (leitura)
useBookings(filters?: BookingFilters)     // staleTime do CACHE_CONFIG, placeholderData
useBookingByUid(uid?: string)             // enabled apenas se uid existir

// Mutations (escrita) — todas invalidam queryKeys.bookings.all + detail
useCancelBooking()
useMarkNoShow()
useRescheduleBooking()
useConfirmBooking()    // triggers App Store rating review
useDeclineBooking()    // triggers App Store rating review
useUpdateLocation()
useAddGuests()

// Utilitários
usePrefetchBookings()    // prefetch por filtro
useInvalidateBookings()  // invalidar manualmente
```

Estratégia de retry:
```typescript
retry: (failureCount, error) => {
  // Não retenta erros de rede — mantém dados em cache visíveis
  if (error?.message?.includes("Network") || error?.message?.includes("fetch")) return false;
  return failureCount < 2;
}
```

---

## Filtro ativo de bookings

**Arquivo:** `hooks/useActiveBookingFilter.tsx`

```typescript
type BookingFilter = "upcoming" | "unconfirmed" | "recurring" | "past" | "cancelled";

// Converte filtro para params da API:
case "upcoming":    return { status: ["upcoming"], take: 50 };
case "unconfirmed": return { status: ["unconfirmed"], take: 50 };
case "recurring":   return { status: ["recurring"], take: 100 };
case "past":        return { status: ["past"], take: 100 };
case "cancelled":   return { status: ["cancelled"], take: 100 };
```

Integra com `SegmentedControl` nativo via `handleSegmentChange`.

---

## Widget sync — iOS/Android

**Arquivo:** `hooks/useWidgetSync.ts`

Widget exibe próximos bookings na tela inicial sem abrir o app.

### Estratégia cache-first

```typescript
// Tenta 4 combinações de filtro no React Query cache:
const possibleFilters = [
  { status: ["upcoming"], take: 50 },
  { status: ["upcoming"] },
  { status: ["upcoming", "unconfirmed"] },
  {},
];

// Se cache vazio → fetchs da API (take: 10)
```

### Filtragem e ordenação

```typescript
const upcomingBookings = cachedBookings
  .filter(b => new Date(b.endTime || b.end) > new Date())  // inclui em curso
  .sort((a, b) => new Date(a.startTime || a.start) - new Date(b.startTime || b.start));

await updateWidgetBookings(upcomingBookings);
```

### Auto-sync em app state change

```typescript
useEffect(() => {
  syncBookingsToWidget();
  const cleanup = setupWidgetRefreshOnAppStateChange(syncBookingsToWidget);
  return cleanup;
}, [syncBookingsToWidget]);
```

Widget se atualiza quando app volta ao foreground. Web: skipped.

**Arquivos do widget:** `widgets/UpcomingBookingsWidget.tsx`, `widgets/widgetTaskHandler.tsx`

---

## Tela de bookings

**Arquivo:** `app/(tabs)/(bookings)/index.tsx`

```
Bookings screen
├── WeekCalendarView (viewMode: "calendar")
├── BookingListScreen (viewMode: "list")
├── SegmentedControl / useActiveBookingFilter
├── search (TextInput)
├── event type filter (DropdownMenu)
└── view mode toggle (list | calendar)
```

Suporta deep link `?filter=unconfirmed` para abrir diretamente em filtro específico.

---

## Operação — instância self-hosted (cal.diy/ALLGED)

### Configuração em app.json

```json
{
  "expo": {
    "extra": {
      "calcomAppUrl": "https://cal.seudominio.com",
      "calcomApiUrl": "https://api.cal.seudominio.com",
      "calcomOauthClientId": "SEU_CLIENT_ID",
      "calcomOauthRedirectUri": "expo-wxt-app://oauth/callback"
    }
  }
}
```

`Constants.expoConfig.extra` é lido antes de qualquer env var — baked no build, sem EAS necessário.

### OAuth client no cal.diy

Criar OAuth App em: `Settings → Developer → OAuth Apps`
- Redirect URI: `expo-wxt-app://oauth/callback`
- Scopes: `READ_PROFILE READ_BOOKING`

### Diagnóstico

| Sintoma | Causa |
|---------|-------|
| "OAuth configuration incomplete" | `clientId` ou `redirectUri` ausente em `extra` e env |
| Android fica na tela de carregamento após login | Chrome Custom Tab retornou antes do Linking event — verificar `Linking.addEventListener` ativo |
| Widget não atualiza | `updateWidgetBookings` falhou — verificar `widgetStorage` permissions |
| "Network" error não retenta | Comportamento esperado — dados em cache continuam visíveis |

---

## Rastreabilidade

| Módulo | Arquivo |
|--------|---------|
| OAuth service | `services/oauthService.ts` |
| Region/URLs | `utils/region.ts` |
| Bookings API | `services/calcom/bookings.ts` |
| React Query hooks | `hooks/useBookings.ts` |
| Filtro ativo | `hooks/useActiveBookingFilter.tsx` |
| Widget sync | `hooks/useWidgetSync.ts` |
| Widget UI | `widgets/UpcomingBookingsWidget.tsx` |
| Tela principal | `app/(tabs)/(bookings)/index.tsx` |
| App config | `app.json` — extra keys |
