# Public Booking Page

## Papel no produto

A página pública de booking transforma um `EventType` em uma experiência reservável para o booker externo. Ela carrega o evento público, calcula slots, permite escolher data/hora, coleta respostas do formulário, verifica email quando necessário, reserva temporariamente o slot, cria ou reagenda o booking e redireciona para sucesso ou pagamento.

## Rotas públicas

| Rota | Uso |
|---|---|
| `/[user]` | Perfil público do usuário |
| `/[user]/[type]` | Booking público individual |
| `/org/[orgSlug]/[user]` | Perfil público dentro de organização |
| `/org/[orgSlug]/[user]/[type]` | Booking individual dentro de organização |
| `/team/[slug]` | Perfil público de time |
| `/team/[slug]/[type]` | Booking público de time |
| `/d/[link]/[slug]` | Link privado/hashed |
| `/booking/[uid]` | Gerenciar booking existente |
| `/booking-successful/[uid]` | Página de sucesso |
| `/booking/dry-run-successful` | Sucesso de dry run |
| `embed` variants | Booking embutido |

## Arquivos principais

| Camada | Arquivo |
|---|---|
| App Router user/type | `apps/web/app/(booking-page-wrapper)/[user]/[type]/page.tsx` |
| App Router org user/type | `apps/web/app/(booking-page-wrapper)/org/[orgSlug]/[user]/[type]/page.tsx` |
| App Router team/type | `apps/web/app/(booking-page-wrapper)/team/[slug]/[type]/page.tsx` |
| View pública | `apps/web/modules/users/views/users-type-public-view.tsx` |
| Wrapper Booker | `apps/web/modules/bookings/components/BookerWebWrapper.tsx` |
| Componente Booker | `apps/web/modules/bookings/components/Booker.tsx` |
| Formulário | `apps/web/modules/bookings/components/BookEventForm/BookEventForm.tsx` |
| Campos do formulário | `apps/web/modules/bookings/components/BookEventForm/BookingFields.tsx` |
| Hook criação/reagendamento | `apps/web/modules/bookings/hooks/useBookings.ts` |
| Hook slots/reserva | `apps/web/modules/bookings/hooks/useSlots.ts` |
| Hook formulário | `packages/features/bookings/Booker/hooks/useBookingForm.ts` |
| Valores iniciais | `packages/features/bookings/Booker/hooks/useInitialFormValues.ts` |
| SSR legado | `apps/web/server/lib/[user]/[type]/getServerSideProps.ts` |
| Criar booking client | `packages/features/bookings/lib/create-booking.ts` |
| Criar recorrente client | `packages/features/bookings/lib/create-recurring-booking.ts` |
| Redirect sucesso | `packages/features/bookings/lib/bookingSuccessRedirect.ts` |

## Renderização inicial

A rota `/[user]/[type]` usa App Router, mas reaproveita SSR legado:

1. `page.tsx` cria `legacyCtx` com headers, cookies, params e search params.
2. `withAppDirSsr(getServerSideProps)` busca os dados públicos do evento.
3. Se `eventData.interfaceLanguage` existir, carrega traduções específicas com `loadTranslations`.
4. Renderiza `users-type-public-view.tsx`.
5. A metadata SEO respeita `eventData.hidden` e `isSEOIndexable`.

## Dados entregues ao Booker

`users-type-public-view.tsx` passa ao `BookerWebWrapper`:

| Prop | Uso |
|---|---|
| `username` | Dono público do evento |
| `eventSlug` | Slug do event type |
| `bookingData` | Booking existente em reschedule/manage |
| `eventData` | Event type público já carregado por SSR |
| `entity` | Dados de org/team/user e `eventTypeId` |
| `durationConfig` | `metadata.multipleDuration` |
| `duration` | Duração escolhida por query param, se válida |
| `hideBranding` | Branding escondido por plano/config |
| `orgBannerUrl` | Banner de organização |

## Estado do Booker

`BookerWebWrapper` inicializa dois stores:

| Store | Uso |
|---|---|
| `useInitializeBookerStore` | Estado global do Booker |
| `useInitializeBookerStoreContext` | Contexto usado pelos componentes internos |

Dados importantes no store:

| Campo | Origem |
|---|---|
| `eventId` | `entity.eventTypeId` ou `event.data.id` |
| `eventSlug` | rota pública |
| `username` | rota pública |
| `selectedDate` | interação do calendário |
| `selectedTimeslot` | slot escolhido |
| `tentativeSelectedTimeslots` | fluxo sem etapa de confirmação |
| `selectedDuration` | duração múltipla escolhida |
| `rescheduleUid` | query param `rescheduleUid` |
| `rescheduledBy` | query param `rescheduledBy` |
| `bookingUid` | query param `bookingUid` |
| `timezone` | query param `cal.tz` ou detecção do booker |
| `layout` | month/week/column/mobile conforme profile e viewport |

## Carregamento de slots

`BookerWebWrapper` usa dois caminhos relacionados:

| Hook | Função |
|---|---|
| `useScheduleForEvent` | Busca agenda/slots para renderizar calendário e horários |
| `useSlots` | Controla seleção, reserva temporária e quick availability checks |

`useScheduleForEvent` recebe event id, username, slug, mês, duração, data selecionada, team member email, org slug, layout e flag `useApiV2`.

`useSlots` faz:

1. Observa `selectedTimeslot` e `tentativeSelectedTimeslots`.
2. Calcula duração efetiva: `selectedDuration` ou `event.length`.
3. Reserva o slot via `viewer.slots.reserveSlot`.
4. Guarda o `slotReservationId`.
5. Renova a reserva em intervalo baseado em `MINUTES_TO_BOOK`.
6. Remove a reserva no cleanup via `viewer.slots.removeSelectedSlotMark`.
7. Opcionalmente faz quick availability check via `viewer.slots.isAvailable`.

## Reserva temporária

A reserva temporária reduz risco de double booking enquanto o usuário preenche o formulário.

| Situação | Comportamento |
|---|---|
| Usuário escolhe slot | `reserveSlot` marca intervalo |
| Usuário troca slot | reserva antiga é removida no cleanup |
| Usuário fica na tela | reserva é renovada antes de expirar |
| Usuário sai da tela | `removeSelectedSlotMark` tenta liberar |
| Slot fica indisponível | formulário mostra alerta para escolher outro horário |
| Dry run | `useSlots` envia `_isDryRun` |

## Formulário de booking

`useBookingForm` monta o schema com `getBookingResponsesSchema` a partir de `event.bookingFields`.

Fontes de preenchimento inicial:

| Fonte | Exemplo |
|---|---|
| Sessão logada | nome/email do usuário autenticado |
| Query params | `name`, `firstName`, `lastName`, `guests`, campos extras |
| Booking existente | reschedule/manage |
| Store do Booker | valores preservados ao voltar para trocar horário |

A organização pode bloquear autofill via `disableAutofillOnBookingPage` no time, parent org ou owner org.

## Submit

`BookEventForm` chama `onSubmit`, que vem de `bookings.handleBookEvent`.

`useBookings` conecta:

| Condição | Mutação |
|---|---|
| Booking simples | `createBooking` |
| Booking recorrente | `createRecurringBooking` |
| Reschedule | mesma mutação, com `rescheduleUid` e dados existentes |
| Dry run | redireciona para `/booking/dry-run-successful` |
| Pagamento requerido | redireciona para link de pagamento |
| Sucesso normal | `bookingSuccessRedirect` |

O payload de sucesso dispara eventos para embed SDK:

| Evento | Quando |
|---|---|
| `bookingSuccessful` | booking simples criado |
| `bookingSuccessfulV2` | payload v2 de sucesso |
| `rescheduleBookingSuccessful` | reagendamento |
| `rescheduleBookingSuccessfulV2` | payload v2 de reagendamento |
| `dryRunBookingSuccessfulV2` | dry run simples |
| `dryRunRescheduleBookingSuccessfulV2` | dry run de reagendamento |

## Verificação de email

`BookerWebWrapper` usa:

| Hook | Uso |
|---|---|
| `useVerifyEmail` | Decide se precisa verificar email do booker |
| `useVerifyCode` | Valida código informado |

Se `requiresBookerEmailVerification` estiver ativo, o botão pode virar fluxo de verificação antes de confirmar. Quando o código é validado, `verifyCode.onSuccess` marca o email como verificado e chama `bookings.handleBookEvent()`.

## Pagamento

`BookEventForm` detecta evento pago via `getPaymentAppData`.

| Condição | UI/redirect |
|---|---|
| `price > 0` e app de pagamento válido | Botão mostra `pay_and_book` |
| API retorna `paymentUid` | `createPaymentLink` gera redirect |
| Sem pagamento | redirect direto para sucesso |

## Página de sucesso

`bookingSuccessRedirect` recebe:

| Campo | Uso |
|---|---|
| `successRedirectUrl` | Redirect custom do event type |
| `forwardParamsSuccessRedirect` | Decide se encaminha query params |
| `booking.uid` | Link para `/booking-successful/[uid]` |
| `email` | Query de sucesso |
| `eventTypeSlug` | Contexto do evento |
| `seatReferenceUid` | Sucesso em seated event |
| `formerTime` | Reagendamento |

## Erros exibidos ao booker

| Erro | UI |
|---|---|
| Evento não carregou | `error_booking_event` |
| Slot ausente | tela `timeslot_missing_*` |
| Slot ficou indisponível | alerta `unavailable_timeslot_title` |
| Erro de form | alerta `booking_fail` ou `reschedule_fail` |
| Limite excedido em reschedule | atualiza `rescheduleUid`/booking data quando o backend retorna dados |
| Falha recorrente | loga erro e mantém usuário no formulário |

## Embed

Quando em embed:

| Integração | Uso |
|---|---|
| `sdkActionManager.fire("navigatedToBooker")` | Notifica abertura |
| `useBookerEmbedEvents` | Publica eventos do booker e schedule |
| `overlayCalendar` query param | Liga/desliga overlay calendar |
| `onClickOverlayContinue` | Redireciona para login com callback |
| Eventos de sucesso | Enviados ao SDK pai |

## Relação com outros domínios

| Domínio | Dependência |
|---|---|
| Event Types | Configuração base: campos, duração, seats, recorrência, confirmação |
| Availability/Slots | Slots e reservas temporárias |
| Bookings | Mutação final que cria/reagenda |
| Payments | Redirect quando há `paymentUid` |
| Webhooks | Disparados após criação/cancelamento pelo backend |
| Apps | Localização, conferencing, calendário, pagamentos |
| Organizations | Branding, idioma, políticas de autofill, rotas `/org` |
| Teams | Hosts, round robin, collective, team member email |

## Testes existentes

| Arquivo | Cobertura |
|---|---|
| `apps/web/playwright/booking-pages.e2e.ts` | Fluxos principais da página pública |
| `apps/web/playwright/dynamic-booking-pages.e2e.ts` | Dynamic booking pages |
| `apps/web/playwright/booking-seats.e2e.ts` | Seats |
| `apps/web/playwright/booking-confirm-reject.e2e.ts` | Confirmação/rejeição |
| `apps/web/playwright/booking-limits.e2e.ts` | Limites de booking |
| `apps/web/playwright/booking-duplicate-api-calls.e2e.ts` | Evita chamadas duplicadas |
| `apps/web/playwright/booking-phone-autofill.e2e.ts` | Autofill por telefone |
| `apps/web/playwright/manage-booking-questions.e2e.ts` | Perguntas no gerenciamento |
| `apps/web/modules/bookings/components/Booker.test.tsx` | Componente Booker |
| `apps/web/modules/bookings/components/DatePicker.test.tsx` | Date picker |
| `packages/features/bookings/Booker/hooks/useInitialFormValues.test.ts` | Prefill/autofill |
| `packages/features/bookings/Booker/utils/isTimeslotAvailable.test.ts` | Disponibilidade de slot no client |
| `packages/features/bookings/Booker/utils/getPrefetchMonthCount.test.ts` | Prefetch de slots |

## Riscos e pontos de atenção

| Risco | Observação |
|---|---|
| Estado duplicado | Há store global e context store; mudanças precisam manter ambos coerentes |
| Timezone | `cal.tz`, timezone detectado e timezone do event type podem divergir |
| Slot stale | Quick check é auxiliar; backend ainda precisa validar no create booking |
| Reserva temporária | Cleanup depende do ciclo do componente/browser |
| Recorrência | Mutação e redirect são diferentes do booking simples |
| Pagamento | Booking pode existir antes do pagamento dependendo do app/fluxo |
| Embed | Eventos SDK são contrato externo; cuidado ao renomear payload |
| Autofill | Políticas de organização podem bloquear uso de query params |
| SEO | Event type hidden ou não indexável deve impedir index/follow |

## Próximos documentos recomendados

1. `teams-routing.md`: como team event types escolhem hosts.
2. `calendars-integrations.md`: busy times e selected calendars em detalhe.
3. `payments.md`: fluxo Stripe/paymentUid na criação de booking.
