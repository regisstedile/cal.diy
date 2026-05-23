# Availability e Slots

## Papel no produto

Availability define quando uma pessoa ou um event type pode receber reservas. Slots são o resultado calculado dessa disponibilidade depois de aplicar event type, agenda, calendários ocupados, bookings existentes, buffers, seats, round robin e janela de booking.

Separação mental importante:

| Conceito | O que é |
|---|---|
| `Schedule` | Grade reutilizável de disponibilidade do usuário |
| `Availability` | Linhas de dias/horários dentro de um schedule |
| `SelectedCalendar` | Calendários externos usados para free/busy |
| `EventType.scheduleId` | Schedule que um event type usa para aceitar bookings |
| `Slots` | Horários finais disponíveis para reservar |
| `SelectedSlot` / reserva temporária | Bloqueio curto para segurar um slot antes do booking |

## Superfícies de produto

| Área | Rota |
|---|---|
| Lista de disponibilidades | `/availability` |
| Editar schedule | `/availability/[schedule]` |
| Troubleshoot | `/availability/troubleshoot` |
| Aba de disponibilidade do event type | `/event-types/[id]?tab=availability` |
| API v2 schedules | `/v2/schedules` |
| API v2 slots | `/v2/slots` |
| API busy times | `/v2/calendars/busy-times` e unified calendars |

## Arquivos principais

| Camada | Arquivo |
|---|---|
| Página availability | `apps/web/app/(use-page-wrapper)/(main-nav)/availability/page.tsx` |
| View lista | `apps/web/modules/availability/availability-view.tsx` |
| Página schedule | `apps/web/app/(use-page-wrapper)/availability/[schedule]/page.tsx` |
| View schedule | `apps/web/modules/availability/[schedule]/schedule-view.tsx` |
| Aba EventType | `apps/web/modules/event-types/components/tabs/availability/EventAvailabilityTab.tsx` |
| Wrapper aba EventType | `apps/web/modules/event-types/components/tabs/availability/EventAvailabilityTabWebWrapper.tsx` |
| API schedules controller | `apps/api/v2/src/platform/schedules/schedules_2024_06_11/controllers/schedules.controller.ts` |
| API schedules service | `apps/api/v2/src/platform/schedules/schedules_2024_06_11/services/schedules.service.ts` |
| API schedules repository | `apps/api/v2/src/platform/schedules/schedules_2024_06_11/schedules.repository.ts` |
| API slots controller | `apps/api/v2/src/modules/slots/slots-2024-09-04/controllers/slots.controller.ts` |
| API slots service | `apps/api/v2/src/modules/slots/slots-2024-09-04/services/slots.service.ts` |
| API slots input | `apps/api/v2/src/modules/slots/slots-2024-09-04/services/slots-input.service.ts` |
| API available slots lib | `apps/api/v2/src/lib/services/available-slots.service.ts` |
| Busy times service | `apps/api/v2/src/lib/services/busy-times.service.ts` |
| User availability service | `apps/api/v2/src/lib/services/user-availability.service.ts` |
| tRPC slots | `packages/trpc/server/routers/viewer/slots/isAvailable.handler.ts` |
| Core slot tests | `packages/features/schedules/lib/slots.test.ts` |

## Modelo de dados

| Modelo | Uso |
|---|---|
| `Schedule` | Container de disponibilidade do usuário |
| `Availability` | Faixas semanais: dias, início, fim |
| `EventType` | Aponta para `scheduleId` e define duração/limites/buffers |
| `SelectedCalendar` | Calendários externos considerados para busy times |
| `Booking` | Ocupa intervalos já reservados |
| `SelectedSlot` | Reserva temporária de slot antes do booking |
| `OutOfOfficeEntry` | Pode redirecionar disponibilidade para outro usuário |
| `Host` | Disponibilidade em event types de time |

## Schedules

Schedules são CRUD autenticado. Cada usuário precisa de um schedule padrão para ser reservável.

### API v2

Controller versionado: `schedules_2024_06_11`, path `/v2/schedules`.

| Método | Endpoint | Função |
|---|---|---|
| `POST` | `/v2/schedules` | Criar schedule |
| `GET` | `/v2/schedules/default` | Buscar schedule padrão |
| `GET` | `/v2/schedules/:scheduleId` | Buscar schedule específico |
| `GET` | `/v2/schedules` | Listar schedules do usuário |
| `PATCH` | `/v2/schedules/:scheduleId` | Atualizar schedule |
| `DELETE` | `/v2/schedules/:scheduleId` | Excluir schedule |

Permissões: `SCHEDULE_READ` e `SCHEDULE_WRITE` via `ApiAuthGuard` e `PermissionsGuard`.

### Uso no EventType

Um event type pode usar:

| Situação | Comportamento |
|---|---|
| `scheduleId` próprio | Slots seguem esse schedule |
| Sem schedule próprio | Usa disponibilidade padrão do usuário/host |
| Team event type | Usa schedules dos hosts conforme tipo de scheduling |
| Restriction schedule | Limita ainda mais a janela reservável |
| Managed event type | O template gera children por membro; slots devem ser buscados nos children |

A aba de disponibilidade no editor mostra o schedule selecionado, permite escolher schedule/restriction schedule e, em times, exibe/seleciona schedules por host.

## Slots

Slots são calculados a partir de uma query de intervalo (`start`, `end`) e uma forma de localizar o event type.

### API v2

Controller versionado: `slots-2024-09-04`, path `/v2/slots`.

| Método | Endpoint | Função |
|---|---|---|
| `GET` | `/v2/slots` | Buscar slots disponíveis |
| `POST` | `/v2/slots/reservations` | Reservar temporariamente um slot |
| `GET` | `/v2/slots/reservations/:uid` | Buscar reserva temporária |
| `PATCH` | `/v2/slots/reservations/:uid` | Atualizar reserva temporária |
| `DELETE` | `/v2/slots/reservations/:uid` | Remover reserva temporária |

Header crítico: `cal-api-version: 2024-09-04`.

### Formas de buscar slots

| Forma | Parâmetros |
|---|---|
| Por ID | `eventTypeId`, `start`, `end` |
| Por usuário + slug | `username`, `eventTypeSlug`, `start`, `end` |
| Por usuário + slug + org | `organizationSlug`, `username`, `eventTypeSlug`, `start`, `end` |
| Por time + slug | `teamSlug`, `eventTypeSlug`, `start`, `end` |
| Por time + slug + org | `organizationSlug`, `teamSlug`, `eventTypeSlug`, `start`, `end` |
| Evento dinâmico | `usernames`, `organizationSlug`, `start`, `end`, opcional `duration` |

Parâmetros opcionais importantes:

| Parâmetro | Uso |
|---|---|
| `timeZone` | Timezone de retorno; default UTC |
| `duration` | Duração específica em event types com múltiplas durações ou dynamic events |
| `format` | `time`/default ou `range` para retornar start/end |
| `bookingUidToReschedule` | Exclui o booking atual dos conflitos ao reagendar |
| `rrHostSubsetIds` | Limita subset de hosts em round robin |

`SlotsInputService_2024_09_04` normaliza a query para um formato interno com `eventTypeId`, `eventTypeSlug`, `usernameList`, `startTime`, `endTime`, `timeZone`, `orgSlug`, `rescheduleUid` e flags de time.

## Pipeline de cálculo

1. A UI pública ou API chama slots com intervalo e event type.
2. `SlotsInputService` resolve o event type por id, usuário+slug, time+slug ou dynamic event.
3. Datas sem hora são normalizadas: início vira começo do dia e fim vira `23:59:59` UTC.
4. `SlotsService` chama `AvailableSlotsService.getAvailableSlots`.
5. A biblioteca de slots combina disponibilidade do usuário/host, schedule, janela do event type, busy times, bookings existentes, buffers e regras de time.
6. `SlotsOutputService` formata por data e por `format=time` ou `format=range`.
7. Se não houver slots, a resposta de `data` é objeto vazio.

## Reservas temporárias de slot

`POST /v2/slots/reservations` cria um bloqueio curto antes do booking final.

Regras principais:

| Regra | Comportamento |
|---|---|
| Duração padrão | 5 minutos |
| `reservationDuration` custom | Exige autenticação |
| Event type inexistente | `404` |
| `slotStart` inválido | `400` |
| `slotDuration` em event type sem múltiplas durações | `400` |
| `slotDuration` fora das opções | `400` |
| Slot já reservado | `422` |
| Event type não seated já booked | `422`, exceto round robin |
| Seats lotados | `422` |
| Team event sem host | `400` |
| Round robin | Valida disponibilidade por host antes de reservar |

Para event types seated, uma reserva pode coexistir até o limite de `seatsPerTimeSlot`. Para event types não seated, overlap bloqueia.

## Calendários e busy times

Busy times entram por serviços de calendário:

| Área | Arquivo |
|---|---|
| Busy times API | `apps/api/v2/src/platform/calendars/controllers/calendars.controller.ts` |
| Busy times service | `apps/api/v2/src/lib/services/busy-times.service.ts` |
| Unified calendars | `apps/api/v2/src/modules/cal-unified-calendars/services/unified-calendars-freebusy.service.ts` |
| Selected calendars | `apps/api/v2/src/modules/selected-calendars/selected-calendars.repository.ts` |

A seleção de calendários existe em dois níveis:

| Nível | Uso |
|---|---|
| Usuário | Calendários padrão considerados para conflitos |
| Event type | Calendários específicos para aquele tipo de evento |

O service de event types monta `userLevelSelectedCalendars` e `allSelectedCalendars`, combinando calendários do event type com calendários do usuário.

## Interação com bookings

Na criação de booking, o horário escolhido precisa passar pelas mesmas regras de slot. Erros de API de booking orientam explicitamente o cliente a buscar `/v2/slots` antes de tentar criar um booking.

Impactos diretos:

| Campo/estado | Impacto nos slots |
|---|---|
| `EventType.length` | Duração padrão do slot |
| `metadata.multipleDuration` | Permite `duration`/`slotDuration` específicos |
| `beforeEventBuffer` / `afterEventBuffer` | Reduz disponibilidade ao redor dos bookings |
| `minimumBookingNotice` | Remove slots próximos demais |
| `periodType` e janela | Remove slots fora da janela futura |
| `scheduleId` | Define base semanal de disponibilidade |
| `SelectedCalendar` | Remove horários ocupados externamente |
| `Booking.status` | Bookings ativos ocupam agenda |
| `seatsPerTimeSlot` | Permite múltiplas reservas no mesmo horário |
| `schedulingType=ROUND_ROBIN` | Distribui/valida hosts |
| `bookingUidToReschedule` | Mantém horário original disponível ao reagendar |

## UI web

### `/availability`

A tela lista schedules do usuário e permite:

| Ação | Implementação |
|---|---|
| Criar schedule | `NewScheduleButton` |
| Editar schedule | Link para `/availability/[schedule]` |
| Duplicar | `viewer.availability.schedule.duplicate` |
| Excluir | `viewer.availability.schedule.delete` |
| Tornar padrão | `viewer.availability.schedule.update` |
| Aplicar default em massa | `bulkUpdateToDefaultAvailability` |

### Aba Availability do EventType

A aba mostra:

| Item | Uso |
|---|---|
| Schedule selecionado | Campo `schedule` |
| Restriction schedule | Campo `restrictionSchedule` |
| Tabela semanal | Dias e horários do schedule |
| Team member schedules | Seleção/visualização por host em event types de time |
| Badges `default`/`managed` | Estado do schedule |

## Testes existentes

| Arquivo | Cobertura |
|---|---|
| `apps/web/playwright/availability.e2e.ts` | Fluxos UI de availability |
| `apps/web/playwright/eventType/availability-tab.e2e.ts` | Aba de disponibilidade do event type |
| `apps/web/test/lib/availabilityAsString.test.ts` | Formatação de disponibilidade |
| `packages/features/schedules/lib/slots.test.ts` | Cálculo de slots |
| `packages/features/availability/lib/getAggregatedAvailability/getAggregatedAvailability.test.ts` | Disponibilidade agregada |
| `packages/features/availability/lib/getUserAvailabilityIncludingBusyTimesFromLimits.test.ts` | Disponibilidade + busy times + limits |
| `apps/api/v2/src/modules/slots/slots-2024-09-04/services/slots.service.spec.ts` | Service de slots |
| `apps/api/v2/src/modules/slots/slots-2024-09-04/controllers/e2e/*.e2e-spec.ts` | Slots API por user event, dynamic event e reschedule |
| `apps/api/v2/src/platform/schedules/schedules_2024_06_11/controllers/schedules.controller.e2e-spec.ts` | Schedules API |
| `apps/api/v2/src/platform/calendars/controllers/calendars.controller.e2e-spec.ts` | Busy times |

## Riscos e pontos de atenção

| Risco | Observação |
|---|---|
| Timezone | Datas sem hora são normalizadas em UTC; UI exibe timezone do usuário |
| Performance | Busca de slots combina calendário externo, bookings, schedules e hosts |
| Round robin | Precisa validar disponibilidade por host, não só do event type |
| Managed event types | Parent não deve ser usado diretamente para buscar slots |
| Reservas temporárias | Overlap e expiração precisam estar corretos para evitar double booking |
| Seats | Regras de capacidade mudam a semântica de conflito |
| Reagendamento | `bookingUidToReschedule` precisa excluir o booking original dos conflitos |
| Selected calendars | Diferença entre calendário de usuário e calendário por event type pode gerar falsa disponibilidade |

## Próximos documentos recomendados

1. `public-booking-page.md`: fluxo completo da página pública até criar booking.
2. `teams-routing.md`: round robin, collective, managed e host selection.
3. `calendars-integrations.md`: selected calendars, busy times, Google/Outlook.
