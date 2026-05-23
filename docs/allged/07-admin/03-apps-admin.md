# Admin — Gerenciamento de Apps

## Página

`/settings/admin/apps`

Lista todos os apps disponíveis na instância (App Store) com controle de habilitação.

## Categorias de Apps

| Categoria | Exemplos |
|-----------|---------|
| Calendário | Google Calendar, Outlook, Apple Calendar |
| Conferência | Google Meet, Zoom, MS Teams |
| Pagamento | Stripe, PayPal |
| Analytics | Cal.ai |
| CRM | Salesforce, HubSpot |
| Automação | Zapier, Make |
| Outros | Webhooks, iCal |

## Estado Atual (ALLGED)

Apps instalados por usuário ficam em:

```sql
SELECT c.type, c."userId", c.invalid
FROM "Credential" c
JOIN users u ON c."userId" = u.id
ORDER BY c."userId";
```

## Habilitar/Desabilitar Apps

Via `/settings/admin/apps`:
- Toggle para habilitar/desabilitar app para toda a instância
- Apps desabilitados não aparecem para usuários na App Store

### Apps Relevantes para ALLGED

| App | Status Recomendado | Motivo |
|-----|-------------------|--------|
| `google-calendar` | ON | Integrar calendário dos técnicos |
| `google-meet` | ON | Videoconferências com clientes |
| `caldav` | ON | Clientes com Apple Calendar |
| `office365calendar` | Opcional | Se técnicos usarem Outlook |
| `stripe` | OFF | Sem billing configurado |
| `paypal` | OFF | Sem billing configurado |

## Configuração de Apps com Credenciais

Alguns apps requerem credenciais OAuth ou API keys configuradas no nível da instância:

### Google Calendar/Meet

Requer:
- `GOOGLE_API_CREDENTIALS` no `.env`
- OAuth app configurado no Google Cloud Console
- Redirect URI: `https://cal.allged.com.br/api/integrations/googlecalendar/callback`

### Zoom

Requer:
- `ZOOM_CLIENT_ID` + `ZOOM_CLIENT_SECRET` no `.env`
- App OAuth configurado em marketplace.zoom.us

## tRPC

```
viewer.appStore.toggle        -- habilitar/desabilitar app
viewer.appStore.listLocal     -- listar apps instalados
```
