# Webhooks & Integrações

## Modelo `Webhook` (Prisma)

```typescript
// packages/prisma/schema.prisma
model Webhook {
  id              String                  // UUID único
  userId          Int?                    // escopo: usuário
  teamId          Int?                    // escopo: time
  eventTypeId     Int?                    // escopo: event type específico
  subscriberUrl   String                  // destino HTTP POST
  payloadTemplate String?                 // template customizado de payload
  active          Boolean  @default(true)
  eventTriggers   WebhookTriggerEvents[]  // quais eventos disparam
  secret          String?                 // para assinatura HMAC
  time            Int?                    // delay em minutos (MEETING_ENDED etc)
  timeUnit        TimeUnit?               // MINUTE | HOUR | DAY
  version         String   @default("2021-10-20")
  platform        Boolean  @default(false) // webhook de OAuth client (plataforma)
}
```

---

## Eventos disponíveis (`WebhookTriggerEvents`)

```typescript
// packages/prisma/schema.prisma — enum WebhookTriggerEvents
BOOKING_CREATED
BOOKING_PAYMENT_INITIATED
BOOKING_PAID
BOOKING_RESCHEDULED
BOOKING_REQUESTED             // booking aguarda confirmação manual
BOOKING_CANCELLED
BOOKING_REJECTED
BOOKING_NO_SHOW_UPDATED
FORM_SUBMITTED                // routing form submetido (com booking)
FORM_SUBMITTED_NO_EVENT       // routing form submetido (sem booking)
MEETING_ENDED                 // agendado com delay configurável
MEETING_STARTED               // agendado com delay configurável
RECORDING_READY
RECORDING_TRANSCRIPTION_GENERATED
OOO_CREATED
AFTER_HOSTS_CAL_VIDEO_NO_SHOW
AFTER_GUESTS_CAL_VIDEO_NO_SHOW
DELEGATION_CREDENTIAL_ERROR
WRONG_ASSIGNMENT_REPORT
```

---

## Escopos de webhook

`getWebhooks()` busca subscribers que correspondem a **qualquer** dos critérios:

```
platform=true             → OAuth client (plataforma externa)
userId = booking.userId   → webhook pessoal do host
eventTypeId = booking.et  → webhook do event type específico
eventTypeId = parentId    → webhook do managed event pai
teamId ∈ [team, org]      → webhook do time ou organização
```

**Herança:** webhook no time dispara para todos os event types do time.
Arquivo: `packages/features/webhooks/lib/getWebhooks.ts`

---

## Pipeline de disparo

```
Booking criado/alterado
    └─ handleNewBooking() ou handler específico
         └─ WebhookFeature.booking.emitBookingCreated()  [ou outro evento]
              └─ getWebhooks({ userId, eventTypeId, teamId, triggerEvent })
                   └─ sendOrSchedulePayload()
                        ├─ TASKER_ENABLE_WEBHOOKS=1 → schedulePayload()  [fila]
                        └─ padrão              → sendPayload()             [síncrono]
```

### Modo síncrono vs fila

```typescript
// packages/features/webhooks/lib/sendOrSchedulePayload.ts
const sendOrSchedulePayload: SendOrSchedulePayload = async (...args) => {
  if (process.env.TASKER_ENABLE_WEBHOOKS === "1") return schedulePayload(...args);
  return sendPayload(...args);
};
```

> No ALLGED: `TASKER_ENABLE_WEBHOOKS` não setado = modo síncrono.
> Falha no endpoint de destino não bloqueia o booking — Promise.allSettled().

---

## Assinatura `X-Cal-Signature-256`

```typescript
// packages/features/webhooks/lib/sendPayload.ts
export const createWebhookSignature = ({ secret, body }) =>
  secret
    ? createHmac("sha256", secret).update(`${body}`).digest("hex")
    : "no-secret-provided";

// Headers enviados em toda requisição:
"X-Cal-Signature-256": createWebhookSignature({ secret: secretKey, body })
"X-Cal-Webhook-Version": webhook.version   // "2021-10-20"
"Content-Type": "application/json"
```

**Verificação no n8n:**
```javascript
// Code node no n8n para verificar assinatura
const crypto = require("crypto");
const secret = $env.CAL_WEBHOOK_SECRET;
const body = JSON.stringify($input.first().json);
const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
const received = $input.first().headers["x-cal-signature-256"];
if (expected !== received) throw new Error("Assinatura inválida");
```

---

## Payload de booking (versão 2021-10-20)

```typescript
// packages/features/webhooks/lib/factory/versioned/v2021-10-20/types.ts
{
  triggerEvent: "BOOKING_CREATED" | ...,
  createdAt: "ISO8601",
  payload: {
    uid: string,
    type: string,           // slug do event type
    title: string,
    startTime: "ISO8601",
    endTime: "ISO8601",
    status: "ACCEPTED" | "PENDING" | "CANCELLED" | ...,
    organizer: { id, name, email, timeZone, language },
    attendees: [{ name, email, timeZone, language }],
    location?: string,
    description?: string,
    customInputs?: Record<string, any>,
    responses?: Record<string, any>,   // campos do form de booking
    metadata?: Record<string, any>,
    // extras por evento:
    cancellationReason?: string,
    rescheduleUid?: string,
    rescheduleStartTime?: string,
    assignmentReason?: [{ reasonEnum, reasonString }],
    paymentId?: number,
  }
}
```

---

## Webhooks agendados (MEETING_STARTED / MEETING_ENDED)

Quando `time` e `timeUnit` são configurados no webhook, o disparo não é imediato:

```typescript
// packages/features/webhooks/lib/handleWebhookScheduledTriggers.ts
// Cron job verifica tabela WebhookScheduledTriggers
// Dispara jobs onde startAfter <= now()
// Limpa jobs com mais de 1 dia de atraso

model WebhookScheduledTriggers {
  jobName       String
  subscriberUrl String
  payload       String    // JSON serializado
  startAfter    DateTime  // quando disparar
  retryCount    Int       @default(0)
  webhook       Webhook?
}
```

---

## Facade `WebhookFeature`

Arquivo: `packages/features/webhooks/lib/facade/WebhookFeature.ts`

| Serviço | Uso |
|---------|-----|
| `webhooks.producer` | Enfileira webhook (leve, sem I/O pesado) |
| `webhooks.consumer` | Processa da fila (busca dados, monta payload, envia HTTP) |
| `webhooks.booking` | Emite eventos de booking diretamente |
| `webhooks.recording` | Emite eventos de gravação |
| `webhooks.ooo` | Emite eventos de OOO |
| `webhooks.notifier` | Orquestra build de payload + entrega |
| `webhooks.core` | Operações de baixo nível (subscriber lookup, scheduling) |

---

## Integrações por App Store

Apps em `packages/app-store/` que processam **webhooks de entrada** (recebem):

| App | Arquivo | Uso |
|-----|---------|-----|
| PayPal | `paypal/api/webhook.ts` | confirmação de pagamento |
| BTCPay | `btcpayserver/api/webhook.ts` | pagamento crypto |
| HitPay | `hitpay/api/webhook.ts` | pagamento HitPay |
| Vital | `vital/api/webhook.ts` | dados de saúde (wearables) |
| Alby | `alby/api/webhook.ts` | pagamento Lightning |

---

## Integração com n8n no ALLGED

### Configuração recomendada

```
cal-diy → Webhook (BOOKING_CREATED) → n8n Webhook node
                                           └─ Code node: verifica X-Cal-Signature-256
                                           └─ Switch: triggerEvent
                                                ├─ BOOKING_CREATED   → Baserow: cria lead
                                                ├─ BOOKING_CANCELLED → Baserow: atualiza status
                                                └─ BOOKING_RESCHEDULED → notifica via Evolution API
```

### URL do webhook no cal-diy

```
https://n8nwebhook.astoriait.com.br/webhook/<uuid-do-webhook-no-n8n>
```

Configurar em: `Settings → Webhooks → Add webhook` no cal-diy.

### Escopo recomendado para ALLGED

- **Escopo Organization**: um webhook cobre todos os times e event types
- **triggerEvent**: `BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`
- **Secret**: gerar via `openssl rand -hex 32`

---

## Payload template customizado

Quando `payloadTemplate` não é null, o cal-diy usa Handlebars para renderizar:

```handlebars
{
  "evento": "{{triggerEvent}}",
  "cliente": "{{payload.attendees.0.name}}",
  "email": "{{payload.attendees.0.email}}",
  "inicio": "{{payload.startTime}}",
  "tipo": "{{payload.type}}"
}
```

Útil para simplificar o payload antes de chegar no n8n.

---

## Arquivos de referência

| Arquivo | Responsabilidade |
|---------|-----------------|
| `packages/features/webhooks/lib/getWebhooks.ts` | Busca subscribers por escopo |
| `packages/features/webhooks/lib/sendPayload.ts` | HTTP POST + assinatura HMAC |
| `packages/features/webhooks/lib/sendOrSchedulePayload.ts` | Roteamento síncrono/fila |
| `packages/features/webhooks/lib/handleWebhookScheduledTriggers.ts` | Cron para triggers agendados |
| `packages/features/webhooks/lib/facade/WebhookFeature.ts` | Facade DI da feature |
| `packages/features/webhooks/lib/constants.ts` | Eventos agrupados, versões, docs |
| `packages/features/webhooks/lib/factory/base/BaseBookingPayloadBuilder.ts` | Schema do payload por evento |
| `packages/prisma/schema.prisma` (linhas 1130-1180) | Enums e modelo Webhook |

---

## Lacunas e próximos testes E2E

- [ ] Criar webhook com secret e verificar cabeçalho `X-Cal-Signature-256`
- [ ] Disparar `BOOKING_CANCELLED` e validar que payload contém `cancellationReason`
- [ ] Configurar webhook com `time=15, timeUnit=MINUTE` para `MEETING_STARTED` e verificar disparo tardio
- [ ] Testar `payloadTemplate` customizado e confirmar que Handlebars renderiza corretamente
- [ ] Webhook em escopo Organization: confirmar que cobre event types de todos os times filhos
