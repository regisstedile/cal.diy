# Integrações de Calendário

## Como Funciona

Cada integração de calendário é um "app" no app store. O usuário conecta via OAuth ou credenciais, e o sistema:
1. Salva o token em `Credential`
2. Usa o token para buscar busy times (CalendarCache)
3. Cria/atualiza/remove eventos ao criar/modificar bookings

## Modelo Credential

```
Credential {
  id, userId, teamId,
  type: "google_calendar" | "office365_calendar" | "apple_calendar" | ...
  key: Json  // tokens OAuth (NUNCA retornar via API)
  appId: String  // referência ao App
}
```

**NUNCA** expor `credential.key` via tRPC ou REST. É bloqueado por linting.

## Calendários Suportados

| App | type | Auth |
|-----|------|------|
| Google Calendar | `google_calendar` | OAuth 2.0 |
| Outlook/Office 365 | `office365_calendar` | OAuth 2.0 |
| Apple Calendar | `apple_calendar` | App Password |
| CalDAV | `caldav_calendar` | Usuario/Senha |
| Lark Calendar | `lark_calendar` | OAuth |
| Feishu Calendar | `feishu_calendar` | OAuth |
| Zoho Calendar | `zoho_calendar` | OAuth |
| Exchange | `exchange_calendar` | EWS |

## Configurar Google Calendar

Settings → Minha Conta → Calendários → Adicionar Google Calendar

Requer configuração do OAuth app no Google Cloud Console:
- Client ID e Secret em `/settings/admin/apps/calendar`
- Redirect URI: `https://cal.allged.com.br/api/integrations/googlecalendar/callback`

## SelectedCalendar vs DestinationCalendar

| | SelectedCalendar | DestinationCalendar |
|--|-----------------|---------------------|
| Propósito | Calendários para verificar busy times | Onde salvar novos bookings |
| Quantidade | Múltiplos | Um por event type |
| Config | Settings → Calendários | Config do Event Type |

## CalendarCache

Eventos externos são cacheados para performance:

```sql
-- Cache de eventos do Google Calendar
SELECT * FROM "CalendarCache" 
WHERE "credentialId" = 1 
AND "expiresAt" > NOW();
```

Se o cache expirou ou não existe, a API do Google é chamada e o resultado é salvo.

## Código Relevante

- App store: `packages/app-store/googlecalendar/`
- Calendar service: `packages/features/calendars/`
- Cache: `packages/features/calendar-cache-sql/`
