# Webhooks

## O que são

Webhooks notificam sistemas externos quando eventos acontecem no cal.diy. Ao criar um booking, por exemplo, o sistema faz um POST para a URL configurada com os dados do evento.

## Eventos Disponíveis

| Trigger | Quando dispara |
|---------|---------------|
| `BOOKING_CREATED` | Novo agendamento criado |
| `BOOKING_RESCHEDULED` | Agendamento reagendado |
| `BOOKING_CANCELLED` | Agendamento cancelado |
| `BOOKING_CONFIRMED` | Agendamento confirmado pelo host |
| `BOOKING_REJECTED` | Agendamento rejeitado pelo host |
| `BOOKING_REQUESTED` | Agendamento pendente de confirmação |
| `BOOKING_PAYMENT_INITIATED` | Pagamento iniciado |
| `FORM_SUBMITTED` | Formulário de routing submetido |
| `MEETING_ENDED` | Reunião finalizada |

## Configuração

`/settings/developer/webhooks` → Adicionar Webhook

Campos:
- **URL**: endpoint que receberá o POST
- **Eventos**: quais triggers assinar
- **Secret**: para validar assinatura HMAC

## Payload

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "createdAt": "2026-05-23T14:00:00Z",
  "payload": {
    "uid": "booking-uid-aqui",
    "title": "Visita Técnica",
    "startTime": "2026-05-23T14:00:00Z",
    "endTime": "2026-05-23T15:00:00Z",
    "status": "ACCEPTED",
    "attendees": [
      { "name": "João Silva", "email": "joao@email.com", "timeZone": "America/Sao_Paulo" }
    ],
    "organizer": { "name": "Weliton", "email": "tecnicoastoria@gmail.com" },
    "eventType": { "id": 1, "title": "Visita Técnica", "slug": "visita-tecnica" },
    "location": "inPerson"
  }
}
```

## Assinatura HMAC

Se configurado um `secret`, o header `X-Cal-Signature-256` contém o HMAC-SHA256 do body. Validar no receptor:

```javascript
const signature = crypto
  .createHmac("sha256", secret)
  .update(JSON.stringify(body))
  .digest("hex");

if (`sha256=${signature}` !== req.headers["x-cal-signature-256"]) {
  return res.status(401).send("Invalid signature");
}
```

## Integração com n8n

Configuração atual: webhooks apontam para n8n em `http://srv-core-01:5678/webhook/...`

O n8n processa os eventos e pode:
- Enviar mensagem WhatsApp
- Criar card no Chatwoot
- Sincronizar com ERP

## Retry

Falhas são retentadas com backoff exponencial. `WebhookScheduledTriggers` armazena tentativas futuras.

## Código Relevante

- Handler: `packages/features/webhooks/`
- tRPC: `packages/trpc/server/routers/viewer/webhook/`
- DB: model `Webhook`, model `WebhookScheduledTriggers`
