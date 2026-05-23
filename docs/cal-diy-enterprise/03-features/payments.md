---
title: "Payments — cal-diy Enterprise"
tags: [payments, stripe, paypal, btcpay, webhook, booking]
created: 2026-05-23
---

# Payments

## Posição no sistema

```
EventType (price + metadata.apps) 
  → handleNewBooking detecta requiresPayment
  → cria Payment record (status PENDING)
  → redireciona booker para checkout
  → booker paga
  → BOOKING_PAID webhook
  → handlePaymentSuccess()
  → Booking.status = ACCEPTED + calendário criado
```

Pagamento é um **gate**: booking só avança para ACCEPTED após confirmação de pagamento.

---

## Interface central — `IAbstractPaymentService`

**Arquivo:** `packages/types/PaymentService.d.ts`

```typescript
export interface IAbstractPaymentService {
  create(
    payment: Pick<Prisma.PaymentUncheckedCreateInput, "amount" | "currency">,
    bookingId: Booking["id"],
    userId: Booking["userId"],
    username: string | null,
    bookerName: string | null,
    paymentOption: PaymentOption,
    bookerEmail: string,
    bookerPhoneNumber?: string | null,
    eventTitle?: string,
    bookingTitle?: string
  ): Promise<Payment>;

  collectCard(
    payment: Pick<Prisma.PaymentUncheckedCreateInput, "amount" | "currency">,
    bookingId: Booking["id"],
    paymentOption: PaymentOption,
    bookerEmail: string,
    bookerPhoneNumber?: string | null
  ): Promise<Payment>;

  chargeCard(
    payment: Pick<Prisma.PaymentUncheckedCreateInput, "amount" | "currency">,
    bookingId?: Booking["id"]
  ): Promise<Payment>;

  update(paymentId: Payment["id"], data: Partial<Prisma.PaymentUncheckedCreateInput>): Promise<Payment>;
  refund(paymentId: Payment["id"]): Promise<Payment | null>;
  getPaymentPaidStatus(): Promise<string>;
  getPaymentDetails(): Promise<Payment>;
  afterPayment(event: CalendarEvent, booking: {...}, paymentData: Payment): Promise<void>;
  deletePayment(paymentId: Payment["id"]): Promise<boolean>;
  isSetupAlready(): boolean;
}
```

**Dois modos de cobrança:**

| Método | PaymentOption | Quando usar |
|--------|--------------|-------------|
| `create()` | `ON_BOOKING` | Cobra imediatamente no booking |
| `collectCard()` | `HOLD` | Salva cartão; cobra depois via `chargeCard()` |
| `chargeCard()` | — | No-show fees, cobranças tardias |

---

## Implementações disponíveis

**Arquivo:** `packages/app-store/payment.services.generated.ts`

```typescript
export const PaymentServiceMap = {
  alby: import("./alby/lib/PaymentService"),
  btcpayserver: import("./btcpayserver/lib/PaymentService"),
  hitpay: import("./hitpay/lib/PaymentService"),
  "mock-payment-app": import("./mock-payment-app/lib/PaymentService"),
  paypal: import("./paypal/lib/PaymentService"),
  stripepayment: import("./stripepayment/lib/PaymentService"),
};
```

Arquivo autogenerade por `yarn app-store:build`. Cada `PaymentService.ts` deve exportar uma classe `implements IAbstractPaymentService` e uma factory `BuildPaymentService`.

---

## Configuração por EventType

### `getPaymentAppData()`

**Arquivo:** `packages/app-store/_utils/payments/getPaymentAppData.ts`

Lê `EventType.metadata.apps`, encontra o app com `price > 0` e `enabled = true`:

```typescript
export function getPaymentAppData(eventType: {
  price: number;
  currency: string;
  metadata: z.infer<typeof EventTypeMetaDataSchema>;
}, forcedGet?: boolean): PaymentAppData

// Retorna:
{
  enabled: boolean;
  price: number;          // centavos (ex: 5000 = $50.00)
  currency: string;       // "usd", "brl", etc.
  appId: EventTypeAppsList | null;
  paymentOption: "ON_BOOKING" | "HOLD";
  credentialId?: number;
  refundPolicy?: string;
  refundDaysCount?: number;
  refundCountCalendarDays?: boolean;
}
```

Regra: somente um app de pagamento ativo por EventType.

### Schema Prisma

```prisma
model EventType {
  price         Int     @default(0)    // legado — preferir metadata.apps
  currency      String  @default("usd")
  // ...
}

model Payment {
  id         Int     @id
  uid        String  @unique @default(cuid())
  amount     Int                     // centavos
  fee        Int                     // taxa da plataforma
  currency   String
  success    Boolean @default(false)
  refunded   Boolean @default(false)
  data       Json                    // dados do provider (paymentIntent, etc.)
  externalId String                  // ID no provider (pi_xxx para Stripe)
  paymentOption PaymentOption @default(ON_BOOKING)
  bookingId  Int?    @unique
  booking    Booking? @relation(fields: [bookingId], references: [id])
}

enum PaymentOption {
  ON_BOOKING  // cobra ao criar booking
  HOLD        // salva cartão, cobra depois
}
```

---

## Stripe — implementação de referência

**Arquivo:** `packages/app-store/stripepayment/lib/PaymentService.ts`

### ON_BOOKING — cobrança imediata

```
create() → stripe.paymentIntents.create() → prisma.payment.create() → retorna Payment
                                              ↓
                              data: { payment_intent: pi_xxx, ... }
                              externalId: pi_xxx
```

Parâmetros relevantes:
- `stripe_user_id` da credential → cobrança via Stripe Connect
- API version: `2020-08-27`
- `confirm: false` — booker confirma no frontend

### HOLD — salvar cartão

```
collectCard() → stripe.setupIntents.create() → prisma.payment.create()
chargeCard()  → stripe.paymentIntents.create({ confirm: true, payment_method: ... })
             → prisma.payment.update({ externalId, success: ... })
```

Uso: EventType com `paymentOption: HOLD` + no-show fee configurada.

### Refund

```typescript
async refund(paymentId) {
  const payment = await prisma.payment.findFirst({ where: { id: paymentId } });
  if (!payment.success) throw new Error("Unable to refund failed payment");
  if (payment.refunded) return payment; // idempotente
  
  const refund = await this.stripe.refunds.create({ payment_intent: payment.externalId });
  return prisma.payment.update({ where: { id: paymentId }, data: { refunded: true } });
}
```

### afterPayment()

Enfileira no tasker a criação do link de pagamento para envio ao booker:

```typescript
await tasker.create("sendAwaitingPaymentEmail", {
  bookingId,
  paymentId,
  ...
});
```

---

## Pipeline pós-pagamento — `handlePaymentSuccess()`

**Arquivo:** `packages/app-store/_utils/payments/handlePaymentSuccess.ts`

```
1. Cancelar email "aguardando pagamento" agendado (tasker.deleteByType)
2. prisma.payment.update({ success: true })
3. prisma.booking.update({ status: ACCEPTED, paid: true })  ← se attendee confirma
4. EventManager.createAllCalendarEvents(calEvent)           ← cria no calendário
5. scheduleWorkflowReminders(...)                           ← lembretes
6. handleConfirmation() ou handleBookingRequested()
7. trigger BOOKING_PAID webhook
```

Condição para ACCEPTED: booking era `PENDING` e o pagante é o attendee principal (não third-party).

```typescript
// Trecho simplificado
await prisma.booking.update({
  where: { id: booking.id },
  data: {
    status: BookingStatus.ACCEPTED,
    paid: true,
  },
});

await triggerWebhook({
  eventTrigger: WebhookTriggerEvents.BOOKING_PAID,
  booking,
  payment,
});
```

---

## Fluxo completo de estados

```
handleNewBooking()
  ├── price > 0 → cria Booking(status=PENDING) + Payment(success=false)
  │                → redireciona para /payment/{uid}
  │                → booker paga no frontend
  │                → Stripe webhook → /api/integrations/stripepayment/webhook
  │                    → handlePaymentSuccess()
  │                        → Booking(status=ACCEPTED, paid=true)
  │                        → BOOKING_PAID webhook → n8n/integração
  │
  └── price = 0 → cria Booking(status=ACCEPTED) diretamente
```

---

## Operação — ALLGED / instância própria

### Apps de pagamento habilitados

Para habilitar Stripe na instância:

1. App Store → Stripe → instalar credential (Stripe Connect ou API key)
2. No EventType → aba "Apps" → Stripe → preço + moeda + opção de pagamento
3. Verificar: `EventType.metadata.apps.stripepayment.enabled = true`

### Webhook Stripe → cal-diy

Configurar no Stripe Dashboard:
```
URL: https://cal.seudominio.com/api/integrations/stripepayment/webhook
Eventos: payment_intent.succeeded, payment_intent.payment_failed, checkout.session.completed
```

Sem esse webhook, `handlePaymentSuccess()` nunca é chamado — booking fica em `PENDING` eternamente.

### Variáveis de ambiente relevantes

```env
# Stripe Connect (app-store global)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_PRIVATE_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Para BTCPay (alternativa self-hosted)
BTCPAY_URL=https://btcpay.seudominio.com
```

### Monitoramento

Sinais de problema:
- `Payment.success = false` + `Booking.status = PENDING` após longo tempo → webhook Stripe não chegou
- `Payment.refunded = true` + `Booking.status = ACCEPTED` → refund não cancelou booking — checar fluxo
- Log: `Stripe: Payment could not be created` → credential inválida ou Connect account desconectada

---

## Adicionando novo provider de pagamento

1. Criar `packages/app-store/{provider}/lib/PaymentService.ts` implementando `IAbstractPaymentService`
2. Exportar `BuildPaymentService(credentials)` factory
3. Rodar `yarn app-store:build` → atualiza `payment.services.generated.ts`
4. Criar `packages/app-store/{provider}/zod.ts` com `appDataSchema` incluindo campos `price`, `currency`, `paymentOption`
5. Registrar no app-store (`app.json` / `metadata.ts`)

---

## Rastreabilidade

| Camada | Arquivo |
|--------|---------|
| Interface | `packages/types/PaymentService.d.ts` |
| Stripe impl | `packages/app-store/stripepayment/lib/PaymentService.ts` |
| PayPal impl | `packages/app-store/paypal/lib/PaymentService.ts` |
| BTCPay impl | `packages/app-store/btcpayserver/lib/PaymentService.ts` |
| Map gerado | `packages/app-store/payment.services.generated.ts` |
| Config leitura | `packages/app-store/_utils/payments/getPaymentAppData.ts` |
| Pós-pagamento | `packages/app-store/_utils/payments/handlePaymentSuccess.ts` |
| Schema | `packages/prisma/schema.prisma` — Payment model, PaymentOption enum |
| Webhook trigger | `packages/features/webhooks/lib/` — `WebhookTriggerEvents.BOOKING_PAID` |
