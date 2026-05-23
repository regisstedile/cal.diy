# App Store

## O que é

O App Store é o sistema de plugins do cal.diy. Apps adicionam integrações (calendários, conferências, CRMs, etc.) e são instalados por usuário ou globalmente.

## Categorias

| Categoria | Exemplos |
|-----------|---------|
| `calendar` | Google Calendar, Outlook, Apple |
| `video` | Zoom, Google Meet, Teams |
| `crm` | HubSpot, Salesforce |
| `messaging` | WhatsApp, Telegram |
| `analytics` | Google Analytics, PostHog |
| `payment` | Stripe, PayPal |
| `other` | Zapier, Make, n8n |

## Configurar Apps (Admin)

`/settings/admin/apps/calendar` — habilitar/configurar apps globalmente.

Para OAuth apps (Google, Zoom): inserir Client ID e Client Secret.

## Modelo App

```
App {
  slug: "google-calendar"
  dirName: "googlecalendar"
  categories: ["calendar"]
  enabled: true  // se está disponível para uso
  keys: Json     // Client ID e Secret (global)
}
```

## Modelo Credential

Quando usuário conecta um app:
```
Credential {
  userId: 1
  type: "google_calendar"
  key: Json  // tokens do usuário (access_token, refresh_token)
  appId: "google-calendar"
}
```

## Arquitetura do App Store

```
packages/app-store/
  googlecalendar/
    api/            # Callbacks OAuth
    lib/
      CalendarService.ts  # Implementa interface Calendar
    index.ts
  zoom/
    api/
    lib/
      VideoApiAdapter.ts  # Implementa interface Video
```

## Geração de Código

Os arquivos `*.generated.ts` são criados automaticamente pelo CLI:
```bash
yarn workspace @calcom/app-store-cli build
```

Nunca editar arquivos `.generated.ts` manualmente.
