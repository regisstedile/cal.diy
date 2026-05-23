# Event Types

## Papel no produto

`EventType` é a unidade central de configuração do agendamento no Cal.diy. Ele define o que pode ser reservado: título, slug público, duração, localização, disponibilidade, campos do formulário, regras de confirmação, limites, seats, recorrência, webhooks, apps, calendário destino e regras de equipe.

Na prática, `Booking` executa uma configuração previamente definida por `EventType`.

## Fluxos cobertos

| Fluxo | Superfície |
|---|---|
| Listar tipos de evento | `/event-types` |
| Criar tipo de evento | UI web, tRPC heavy create, API v2 |
| Editar configuração | `/event-types/[id]` |
| Duplicar | tRPC heavy duplicate |
| Excluir | tRPC `delete`, API v2 `DELETE /event-types/:id` |
| Time/equipe | collective, round robin, managed |
| Apps e webhooks | abas de apps/webhooks no editor |
| Booking público | página pública usa o EventType para montar disponibilidade e formulário |

## Arquivos principais

| Camada | Arquivo |
|---|---|
| Lista web | `apps/web/app/(use-page-wrapper)/(main-nav)/event-types/page.tsx` |
| Editor web | `apps/web/app/(use-page-wrapper)/event-types/[type]/page.tsx` |
| Wrapper do editor | `apps/web/modules/event-types/components/EventTypeWebWrapper.tsx` |
| Aba Setup | `apps/web/modules/event-types/components/tabs/setup/EventSetupTab.tsx` |
| Aba Advanced | `apps/web/modules/event-types/components/tabs/advanced/EventAdvancedTab.tsx` |
| tRPC router leve | `packages/trpc/server/routers/viewer/eventTypes/_router.ts` |
| tRPC router pesado | `packages/trpc/server/routers/viewer/eventTypes/heavy/_router.ts` |
| Create handler | `packages/trpc/server/routers/viewer/eventTypes/heavy/create.handler.ts` |
| Update handler | `packages/trpc/server/routers/viewer/eventTypes/heavy/update.handler.ts` |
| API v2 controller | `apps/api/v2/src/platform/event-types/event-types_2024_06_14/controllers/event-types.controller.ts` |
| API input service | `apps/api/v2/src/platform/event-types/event-types_2024_06_14/services/input-event-types.service.ts` |
| API service | `apps/api/v2/src/platform/event-types/event-types_2024_06_14/services/event-types.service.ts` |
| Prisma | `packages/prisma/schema.prisma` |
| Repository | `packages/features/eventtypes/repositories/eventTypeRepository.ts` |

## Modelo de dados

Modelos diretamente relacionados:

| Modelo | Uso |
|---|---|
| `EventType` | Configuração principal do tipo de evento |
| `Host` | Hosts atribuídos a event types de equipe |
| `HostGroup` | Agrupamento de hosts para regras avançadas |
| `HostLocation` | Localização por host quando habilitado |
| `CalVideoSettings` | Configuração de vídeo Cal.com/Cal.diy |
| `Availability` / `Schedule` | Disponibilidade e restrições de agenda |
| `DestinationCalendar` | Calendário onde o booking será gravado |
| `Webhook` | Eventos disparados a partir de bookings/event types |
| `Booking` | Instância agendada usando um `eventTypeId` |

Enums importantes:

| Enum | Valores principais |
|---|---|
| `SchedulingType` | `ROUND_ROBIN`, `COLLECTIVE`, `MANAGED` |
| `PeriodType` | `UNLIMITED`, `ROLLING`, `ROLLING_WINDOW`, `RANGE` |
| `CancellationReasonRequirement` | `MANDATORY_BOTH`, `MANDATORY_HOST_ONLY`, `MANDATORY_ATTENDEE_ONLY`, `OPTIONAL_BOTH` |
| `CreationSource` | `WEBAPP`, `API_V1`, `API_V2` |

## Grupos de configuração

| Grupo | Campos principais |
|---|---|
| Identidade | `title`, `slug`, `description`, `hidden`, `position` |
| Duração | `length`, `offsetStart`, `metadata.multipleDuration` |
| Janela de booking | `periodType`, `periodStartDate`, `periodEndDate`, `periodDays`, `minimumBookingNotice` |
| Buffers e intervalo | `beforeEventBuffer`, `afterEventBuffer`, `slotInterval` |
| Disponibilidade | `scheduleId`, `availability`, `restrictionScheduleId` |
| Localizações | `locations`, `enablePerHostLocations`, `HostLocation`, `calVideoSettings` |
| Formulário | `bookingFields`, `customInputs` legado |
| Confirmação | `requiresConfirmation`, `requiresConfirmationWillBlockSlot`, `requiresConfirmationForFreeEmail` |
| Segurança | `requiresBookerEmailVerification`, `bookingRequiresAuthentication` |
| Cancelamento | `disableCancelling`, `requiresCancellationReason` |
| Reagendamento | `disableRescheduling`, `minimumRescheduleNotice`, `allowReschedulingCancelledBookings`, `allowReschedulingPastBookings` |
| Seats | `seatsPerTimeSlot`, `seatsShowAttendees`, `seatsShowAvailabilityCount` |
| Recorrência | `recurringEvent` |
| Round robin | `schedulingType`, `assignAllTeamMembers`, `isRRWeightsEnabled`, `maxLeadThreshold`, `rrHostSubsetEnabled` |
| Integrações | `webhooks`, `destinationCalendar`, `successRedirectUrl`, `metadata` |

Regra crítica: `seatsPerTimeSlot` e `recurringEvent` não podem coexistir no update handler.

## tRPC

Router leve: `viewer.eventTypes`.

| Procedure | Função |
|---|---|
| `getByViewer` | Lista event types do usuário atual |
| `getUserEventGroups` | Monta grupos para página `/event-types` |
| `getEventTypesFromGroup` | Busca event types de grupo/time |
| `list` / `listWithTeam` | Listagem para seletores e integrações |
| `get` | Busca um event type para edição |
| `delete` | Exclui event type |
| `getHashedLink(s)` | Links privados/hashed |
| `getHostsForAvailability` | Hosts usados na disponibilidade |
| `getHostsForAssignment` | Hosts para atribuição |
| `searchTeamMembers` | Busca membros para event types de time |

Router pesado: `viewer.eventTypesHeavy`.

| Procedure | Função |
|---|---|
| `create` | Cria event type |
| `duplicate` | Duplica event type |
| `update` | Atualiza configuração completa |

As operações sensíveis usam PBAC via `createEventPbacProcedure` quando aplicável, com fallback para papéis `ADMIN`/`OWNER`.

## API v2

Controller versionado: `event-types_2024_06_14`.

| Método | Endpoint | Uso |
|---|---|---|
| `POST` | `/v2/event-types` | Criar event type |
| `GET` | `/v2/event-types` | Listar event types públicos/autorizados |
| `GET` | `/v2/event-types/:eventTypeId` | Buscar por ID |
| `PATCH` | `/v2/event-types/:eventTypeId` | Atualizar |
| `DELETE` | `/v2/event-types/:eventTypeId` | Excluir |

A API v2 transforma o payload público para o formato interno via `InputEventTypesService`. Exemplos de transformações:

| Entrada API | Campo interno |
|---|---|
| `lengthInMinutes` | `length` |
| `lengthInMinutesOptions` | `metadata.multipleDuration` |
| `locations` | `locations` normalizado |
| `bookingFields` | `bookingFields` interno |
| `bookingWindow` | `periodType` e campos relacionados |
| `confirmationPolicy` | `requiresConfirmation*` |
| `recurrence` | `recurringEvent` |
| `seats` | `seatsPerTimeSlot` e flags |
| `disableGuests` | regra de convidados |
| `bookerActiveBookingsLimit` | limite ativo por booker |
| `calVideoSettings` | `CalVideoSettings` |

## Fluxo de criação

### Web/tRPC

1. Usuário cria pelo painel de event types.
2. `viewer.eventTypesHeavy.create` recebe `createEventTypeInput`.
3. `create.handler.ts` aplica defaults e permissões.
4. Se não houver localização explícita, usa localização padrão do usuário.
5. Se for event type de time, valida permissão e conecta o time.
6. Cria via `EventTypeRepository.create`.
7. Erro de slug duplicado (`P2002`) vira `BAD_REQUEST`.

### API v2

1. Cliente chama `POST /v2/event-types` com API key/OAuth.
2. `InputEventTypesService` transforma e valida payload.
3. `EventTypesService.checkCanCreateEventType` valida slug, schedule e permissões.
4. Serviço cria e atualiza usando a biblioteca interna de platform event types.
5. Retorno é transformado para DTO público.

## Fluxo de update

1. Editor carrega dados via `viewer.eventTypes.get`.
2. `EventTypeWebWrapper` monta o formulário com `useEventTypeForm`.
3. Submit chama `viewer.eventTypesHeavy.update`.
4. `update.handler.ts` busca event type, hosts, team, children, host groups e settings.
5. Handler valida regras cruzadas antes de gravar.
6. Após sucesso, a UI invalida cache de `viewer.eventTypes.get` e `getByViewer`.

Validações relevantes no update:

| Regra | Motivo |
|---|---|
| `teamId` não pode ser trocado para outro time | Evita mover configuração entre domínios de permissão |
| `seatsPerTimeSlot` + `recurringEvent` é inválido | Modelos de reserva incompatíveis |
| Booking fields devem ser únicos | Evita payload ambíguo no booking |
| Email ou telefone deve existir no formulário | Booker precisa ser identificável |
| `maxActiveBookingsPerBooker` deve ser positivo | Evita limite sem sentido |
| `maxActiveBookingsPerBooker` não pode coexistir com recorrência | Regras de recorrência e limite ativo conflitam |
| Auto tradução exige organização | Depende de contexto org |
| Load balancing tem restrições com host groups e timestamp basis | Evita cálculo de round robin incorreto |

## Relação com bookings

O booking depende do event type para:

| Área | Dependência |
|---|---|
| Slot disponível | `length`, buffers, disponibilidade, calendário, hosts |
| Formulário público | `bookingFields`, `customInputs`, localização |
| Confirmação | `requiresConfirmation*` |
| Autenticação | `bookingRequiresAuthentication`, email verification |
| Seats | `seatsPerTimeSlot` e contagem de vagas |
| Recorrência | `recurringEvent` |
| Cancelamento | `disableCancelling`, `requiresCancellationReason` |
| Reagendamento | `disableRescheduling`, `minimumRescheduleNotice` |
| Webhooks/apps | `webhooks`, `metadata`, apps instalados |
| Calendário | `destinationCalendar`, selected calendars |

Por isso, alterações em `EventType` têm impacto direto na criação, edição, cancelamento, insights e integrações de bookings.

## Testes existentes

| Arquivo | Cobertura |
|---|---|
| `apps/web/playwright/event-types.e2e.ts` | Fluxos UI: listar, criar, duplicar, editar, recorrência, localização e booking com múltiplos organizadores |
| `apps/web/playwright/fixtures/eventTypes.ts` | Fixtures para E2E |
| `packages/trpc/server/routers/viewer/eventTypes/__tests__/*` | Router tRPC |
| `packages/trpc/server/routers/viewer/eventTypes/heavy/update.handler.test.ts` | Regras de update |
| `packages/trpc/server/routers/viewer/eventTypes/heavy/duplicate.handler.test.ts` | Duplicação |
| `packages/trpc/server/routers/viewer/eventTypes/getEventTypesFromGroup.integration-test.ts` | Integração por grupo |
| `apps/api/v2/src/platform/event-types/event-types_2024_06_14/controllers/event-types.controller.e2e-spec.ts` | API v2 |
| `apps/api/v2/src/platform/event-types/event-types_2024_06_14/transformers/**/*.spec.ts` | DTO/transformers |
| `packages/platform/atoms/event-types/__tests__/*` | Atoms de platform |

## Riscos e pontos de atenção

| Risco | Observação |
|---|---|
| `EventType` é altamente acoplado | Pequenas mudanças podem afetar booking, disponibilidade, webhooks e apps |
| Muitos campos JSON | `locations`, `bookingFields`, `metadata`, `recurringEvent`, limits exigem validação de runtime |
| API v2 e web usam formatos diferentes | O service de input precisa continuar alinhado ao formato interno |
| Team event types dependem de PBAC | Testar owner/admin/member antes de mudar handlers |
| Hidden event types | Listagem pública deve respeitar autenticação/owner |
| Cache de edição | Atualizações precisam invalidar queries certas |
| Recorrência e seats | Combinação bloqueada e deve continuar coberta por teste |
| Round robin | Host groups, weights e subset tornam regressões fáceis |

## Próximos documentos recomendados

1. `availability.md`: slots, schedules, selected calendars, buffers e conflitos.
2. `teams-routing.md`: collective, round robin, managed, host groups e pesos.
3. `public-booking-page.md`: como EventType vira formulário público.
4. `api-v2-event-types.md`: contrato externo, DTOs e exemplos.
