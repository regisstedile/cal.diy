---
title: "Feature — Bookings"
tags: [cal-diy, bookings, api-v2, trpc, prisma, playwright]
created: 2026-05-23
---

# Feature — Bookings

## Para que serve

Bookings são o domínio central do `cal-diy`: representam uma reserva/agendamento entre organizador, event type, participantes, calendário, localização, pagamentos, webhooks e estado operacional.

## Fluxos cobertos

- Criar booking regular.
- Criar booking recorrente.
- Listar bookings por status.
- Ver booking e página de sucesso.
- Cancelar booking.
- Reagendar booking.
- Solicitar reagendamento.
- Confirmar/rejeitar booking pendente.
- Adicionar convidados.
- Editar localização.
- Marcar no-show.
- Registrar histórico/auditoria.
- Alimentar insights e views denormalizadas.

## Arquivos principais

| Camada | Arquivos |
|---|---|
| Booking page pública | `apps/web/app/(booking-page-wrapper)/[user]/[type]/page.tsx` |
| Booking success/single view | `apps/web/modules/bookings/views/bookings-single-view.tsx` |
| Lista/calendário de bookings | `apps/web/modules/bookings/views/bookings-view.tsx` |
| Componentes de booking | `apps/web/modules/bookings/components/**` |
| Ações de booking | `apps/web/components/booking/actions/bookingActions.ts` |
| Cancelamento UI | `apps/web/components/booking/CancelBooking.tsx` |
| tRPC router | `packages/trpc/server/routers/viewer/bookings/_router.tsx` |
| API v2 controller | `apps/api/v2/src/platform/bookings/2024-04-15/controllers/bookings.controller.ts` |
| Criação core | `packages/features/bookings/lib/handleNewBooking/**` |
| Cancelamento core | `packages/features/bookings/lib/handleCancelBooking.ts` |
| Repository | `packages/features/bookings/repositories/BookingRepository.ts` |
| Prisma | `packages/prisma/schema.prisma` |
| Webhooks | `packages/features/webhooks/lib/service/BookingWebhookService.ts` |
| Audit | `packages/features/booking-audit/**` |
| Insights | `packages/features/insights/**`, `apps/web/modules/insights/components/booking/**` |
| E2E | `apps/web/playwright/booking-*.e2e.ts` |

## Modelos Prisma relevantes

| Modelo | Papel |
|---|---|
| `Booking` | Registro principal do agendamento |
| `Attendee` | Participantes vinculados ao booking |
| `BookingReference` | Referências externas: calendário, conferência, meeting URL, credential |
| `BookingSeat` | Assentos em eventos com seats |
| `Payment` | Pagamento/hold/no-show fee |
| `BookingAudit` | Histórico/auditoria de ações |
| `BookingReport` | Reporte de booking problemático |
| `WrongAssignmentReport` | Reporte de atribuição errada |
| `Tracking` | UTM/tracking por booking |

## Estados principais

Enum: `BookingStatus` em `packages/prisma/schema.prisma`.

| Status | Significado |
|---|---|
| `ACCEPTED` | Booking confirmado |
| `PENDING` | Booking pendente de aprovação/pagamento/host |
| `AWAITING_HOST` | Aguardando confirmação do host |
| `REJECTED` | Rejeitado |
| `CANCELLED` | Cancelado ou substituído por reschedule |

Campos importantes em `Booking`:

- `uid`: identificador público.
- `idempotencyKey`: evita duplicidade em alguns fluxos.
- `userId` e `userPrimaryEmail`: organizador.
- `eventTypeId`: origem da configuração.
- `responses` e `customInputs`: respostas do formulário.
- `startTime` e `endTime`: janela do agendamento.
- `location`: localização final.
- `cancellationReason`, `cancelledBy`, `rescheduledBy`.
- `rescheduled`, `fromReschedule`, `recurringEventId`.
- `noShowHost`, `rating`, `ratingFeedback`.

## API v2

Controller: `apps/api/v2/src/platform/bookings/2024-04-15/controllers/bookings.controller.ts`.

| Endpoint | Método | Papel |
|---|---|---|
| `/v2/bookings` | GET | Lista bookings do usuário autenticado por status, cursor e limit |
| `/v2/bookings/:bookingUid` | GET | Busca booking por UID |
| `/v2/bookings/:bookingUid/reschedule` | GET | Busca dados para reagendamento |
| `/v2/bookings` | POST | Cria booking regular |
| `/v2/bookings/:bookingUid/cancel` | POST | Cancela booking por UID |
| `/v2/bookings/:bookingUid/mark-no-show` | POST | Marca no-show |
| `/v2/bookings/recurring` | POST | Cria bookings recorrentes |

Observações:

- API v2 aceita API key ou OAuth, dependendo do endpoint/guard.
- `GET /v2/bookings` usa `ApiAuthGuard` e permissão `BOOKING_READ`.
- `mark-no-show` usa `BOOKING_WRITE`.
- Criação usa `RegularBookingService` ou `RecurringBookingService`.
- Cancelamento chama `handleCancelBooking` com `actionSource: "API_V2"`.

## tRPC viewer.bookings

Router: `packages/trpc/server/routers/viewer/bookings/_router.tsx`.

| Procedure | Tipo | Papel |
|---|---|---|
| `get` | query | Lista bookings para a UI autenticada |
| `requestReschedule` | mutation | Solicita reagendamento |
| `editLocation` | mutation | Edita localização |
| `addGuests` | mutation | Adiciona convidados |
| `confirm` | mutation | Confirma booking pendente |
| `getBookingAttendees` | query | Lista participantes |
| `getBookingDetails` | query | Detalhes de booking |
| `find` | public query | Busca pública por input específico |
| `reportBooking` | mutation | Reporta booking e pode cancelar dependendo do status |
| `reportWrongAssignment` | mutation | Reporta atribuição errada |
| `hasWrongAssignmentReport` | query | Verifica reporte existente |
| `getBookingHistory` | query | Histórico/auditoria do booking |
| `getWrongAssignmentReports` | query PBAC | Lista reportes por time |
| `updateWrongAssignmentReportStatus` | mutation | Atualiza status de reporte |

## Fluxo de criação

Arquivos principais:

- `packages/features/bookings/lib/handleNewBooking/getBookingData.ts`
- `packages/features/bookings/lib/handleNewBooking/createBooking.ts`
- `packages/features/bookings/lib/handleNewBooking/**`

Passos observados:

1. Entrada é validada por schema de criação.
2. `getBookingData` normaliza `start/end`, responses, campos legados, guests, location, SMS e notes.
3. Custom inputs obrigatórios são checados por `handleCustomInputs`.
4. `getCalEventResponses` transforma booking fields em respostas estruturadas.
5. `createBooking` monta `Prisma.BookingCreateInput`.
6. Status inicial é `ACCEPTED` quando confirmado por padrão, senão `PENDING`.
7. Attendees são criados junto com booking.
8. Em reschedule, booking antigo pode ser atualizado para `CANCELLED` e novo booking recebe `fromReschedule`.
9. Booking é salvo em transação.

## Fluxo de cancelamento

Arquivo: `packages/features/bookings/lib/handleCancelBooking.ts`.

Regras principais:

- Não cancela booking já `CANCELLED`.
- Exige organizador/usuário válido.
- Respeita `eventType.disableCancelling`.
- Pode exigir motivo de cancelamento conforme `requiresCancellationReason` e se o ator é host ou attendee.
- Não cancela booking que já terminou.
- Em booking com seats, valida host quando não há `seatReferenceUid`.
- Busca webhooks `BOOKING_CANCELLED`.
- Monta `CalendarEvent` para emails, SMS, calendário e payloads.
- Cancela/remarca integrações externas via `EventManager`, `BookingReferenceRepository`, scheduled triggers e webhooks.
- Pode processar refund/no-show fee dependendo de payment/app metadata.

UI de cancelamento:

- `apps/web/components/booking/CancelBooking.tsx`.
- Calcula se motivo é obrigatório via `isCancellationReasonRequired`.
- Para host, pode exigir internal note preset.
- Para attendee com pagamento hold/no-show fee, pode exigir aceite explícito da cobrança.
- Em embed, usa `sdkActionManager` para sinalizar eventos.

## Ações disponíveis na UI

Arquivo: `apps/web/components/booking/actions/bookingActions.ts`.

Grupos principais:

- Pending: confirmar/rejeitar.
- Cancel: cancelar evento ou todos restantes de recorrência.
- Edit: reagendar, solicitar reagendamento, alterar localização, adicionar convidados, reatribuir.
- After event: gravações, sessão de reunião, cobrar no-show, marcar no-show.
- Report: reportar booking.

Desabilitações consideram:

- booking no passado;
- status cancelado/rejeitado/pending;
- regras do event type (`disableCancelling`, `disableRescheduling`, minimum notice);
- seats;
- attendee vs host;
- pagamento;
- tipo de localização.

## Listagem e views

`apps/web/modules/bookings/views/bookings-view.tsx`:

- Usa `DataTableProvider`.
- Cria segmento de sistema `my_bookings` para usuário atual.
- Valida filtros conforme permissão `canReadOthersBookings`.
- Renderiza lista ou calendário conforme `useBookingsView` e flag `bookingsV3Enabled`.

`apps/web/modules/bookings/views/bookings-single-view.tsx`:

- Renderiza página de sucesso/detalhes.
- Lê query params para cancelamento, reschedule, feedback, no-show e seat reference.
- Mostra links de calendário, localização, pagamento, UTM, attendees e ações.
- Usa `CancelBooking` quando entra em modo cancelamento.

## Auditoria e histórico

Arquivos:

- `packages/features/booking-audit/**`
- `apps/web/modules/booking-audit/components/BookingHistory.tsx`
- `apps/web/app/(use-page-wrapper)/(main-nav)/booking/[uid]/logs/page.tsx`

A auditoria registra ações como created, accepted, cancelled, rescheduled, reschedule requested, seat rescheduled e mudanças de campos. Há lógica específica para mostrar booking criado por reschedule como "rescheduled from".

## Insights

Arquivos:

- `apps/web/modules/insights/components/booking/**`
- `packages/features/insights/services/InsightsBookingBaseService.ts`
- `packages/features/insights/services/InsightsBookingDIService.ts`
- `packages/features/insights/lib/bookingUtils.ts`
- `docs/allged/06-insights/05-dados-db.md`

Os insights usam views/tabelas denormalizadas como `BookingTimeStatusDenormalized` e `BookingDenormalized`, com status derivado para completed/upcoming/cancelled/rescheduled/no-show.

## Testes existentes

| Área | Arquivos |
|---|---|
| Booking page | `apps/web/playwright/booking-pages.e2e.ts` |
| Confirmação/rejeição | `apps/web/playwright/booking-confirm-reject.e2e.ts` |
| Seats | `apps/web/playwright/booking-seats.e2e.ts` |
| Limits | `apps/web/playwright/booking-limits.e2e.ts` |
| Duplicate API calls | `apps/web/playwright/booking-duplicate-api-calls.e2e.ts` |
| Keyboard/sheet | `apps/web/playwright/booking-sheet-keyboard.e2e.ts` |
| Phone autofill | `apps/web/playwright/booking-phone-autofill.e2e.ts` |
| Booker components | `apps/web/modules/bookings/components/Booker.test.tsx` |
| Booking details sheet | `apps/web/modules/bookings/components/BookingDetailsSheet.test.tsx` |
| Cancel booking fee UI | `apps/web/components/booking/__tests__/CancelBooking.cancellationFee.test.tsx` |
| Booking actions | `apps/web/components/booking/actions/bookingActions.test.ts` |
| New booking core | `packages/features/bookings/lib/handleNewBooking/test/*.test.ts` |
| Cancel core | `packages/features/bookings/lib/handleCancelBooking/test/handleCancelBooking.test.ts` |
| tRPC reports | `packages/trpc/server/routers/viewer/bookings/reportBooking.handler.test.ts` |
| API v2 controller | `apps/api/v2/src/platform/bookings/2024-04-15/controllers/bookings.controller.e2e-spec.ts` |
| Booking audit | `packages/features/booking-audit/lib/service/__tests__/*.test.ts` |

## Como validar rapidamente

Testes focados úteis:

```bash
corepack yarn test packages/features/bookings/lib/handleCancelBooking/test/handleCancelBooking.test.ts
corepack yarn test packages/features/bookings/lib/handleNewBooking/test/fresh-booking.test.ts
NEXT_PUBLIC_IS_E2E=1 PLAYWRIGHT_HEADLESS=1 corepack yarn playwright test apps/web/playwright/booking-confirm-reject.e2e.ts --project=@calcom/web --workers=1
```

Observação: os nomes exatos dos scripts podem variar por workspace; se falhar, usar o runner padrão do repo já documentado nos agentes/rules.

## Riscos e lacunas

- Booking é grande demais para uma única regra mental; editar sem rastrear UI -> handler -> repository -> webhook costuma gerar regressão.
- Cancelamento tem efeitos colaterais: calendário, meeting, email/SMS, webhooks, scheduled triggers, payment/refund/no-show fee.
- Reschedule cria relação entre booking antigo e novo via `fromReschedule`, `rescheduled` e status `CANCELLED`; isso impacta auditoria e insights.
- `responses` e `customInputs` são JSON; TypeScript ajuda pouco se a validação runtime não estiver correta.
- Seats alteram profundamente cancelamento, attendees e reschedule.
- API v2 e web app compartilham lógica, mas têm wrappers/guards diferentes; bug em um caminho pode não aparecer no outro.

## Próximas melhorias recomendadas

1. Criar diagrama separado de `handleNewBooking` por etapas.
2. Criar diagrama separado de `handleCancelBooking` com efeitos colaterais.
3. Documentar `BookingRepository` por método mais usado.
4. Documentar `BookingStatus` vs `timeStatus` dos insights.
5. Rodar e registrar uma matriz de testes verdes para booking core, API v2 e E2E principal.
