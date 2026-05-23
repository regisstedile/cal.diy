# EventType — Modelo Central

O `EventType` é o coração do sistema. Tudo começa nele.

## O que é

Um tipo de evento define **o que pode ser agendado**: título, duração, link público, quem pode agendar, quando está disponível e como a confirmação funciona.

Exemplo: "Visita técnica — 60 min" é um EventType do técnico Weliton.

## Campos Principais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Int | PK |
| `title` | String | Nome exibido ("Visita Técnica") |
| `slug` | String | URL slug ("visita-tecnica") |
| `length` | Int | Duração em minutos |
| `description` | String? | Descrição pública |
| `userId` | Int? | Dono (usuário individual) |
| `teamId` | Int? | Time dono (se evento de equipe) |
| `schedulingType` | Enum? | `ROUND_ROBIN`, `COLLECTIVE`, null (individual) |
| `requiresConfirmation` | Bool | Se precisa aprovação manual |
| `hidden` | Bool | Se não aparece na página pública |
| `price` | Int | Preço em centavos (0 = gratuito) |
| `currency` | String | Moeda ("brl") |
| `minimumBookingNotice` | Int | Antecedência mínima em minutos |
| `beforeEventBuffer` | Int | Buffer antes do evento (min) |
| `afterEventBuffer` | Int | Buffer após o evento (min) |
| `slotInterval` | Int? | Intervalo entre slots (se null, usa `length`) |
| `scheduleId` | Int? | Schedule de disponibilidade vinculado |
| `destinationCalendarId` | Int? | Calendário onde salvar bookings |
| `locations` | Json | Array de locais possíveis |
| `bookingFields` | Json | Campos customizados do formulário |
| `metadata` | Json | Dados extras |

## Tipos de Agendamento

| `schedulingType` | Descrição |
|-----------------|-----------|
| `null` | Individual — um dono, booking vai para ele |
| `ROUND_ROBIN` | Equipe — distribui entre membros disponíveis |
| `COLLECTIVE` | Equipe — todos os membros devem estar livres |

## URL Pública

```
# Individual
https://cal.allged.com.br/[username]/[slug]
https://cal.allged.com.br/weliton/visita-tecnica

# Com Org
https://cal.allged.com.br/[orgSlug]/[username]/[slug]
https://cal.allged.com.br/allged/weliton/visita-tecnica
```

## Locations (Locais)

Armazenado como JSON. Exemplos:

```json
[
  { "type": "inPerson", "address": "Rua X, 100" },
  { "type": "link", "link": "https://meet.google.com/xxx" },
  { "type": "userPhone", "hostPhoneNumber": "+55..." },
  { "type": "integrations:google:meet" },
  { "type": "integrations:zoom" }
]
```

## Booking Fields (Campos Customizados)

```json
[
  { "name": "name", "type": "name", "required": true },
  { "name": "email", "type": "email", "required": true },
  { "name": "location", "type": "radioInput", "required": true },
  { "name": "notes", "type": "textarea", "required": false }
]
```

Campos default (name, email, location) são sempre adicionados. Campos customizados aparecem depois.

## Relações

```
EventType
  ├─ User (dono individual)
  ├─ Team (dono equipe)
  ├─ Host[] (hosts adicionais para ROUND_ROBIN)
  ├─ Schedule (disponibilidade)
  ├─ DestinationCalendar
  ├─ Booking[] (agendamentos criados deste tipo)
  └─ EventTypeCustomInput[] (campos legados, substituído por bookingFields)
```

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.eventTypes.list` | Lista event types do usuário |
| `viewer.eventTypes.get` | Busca um event type por ID |
| `viewer.eventTypes.create` | Cria novo event type |
| `viewer.eventTypes.update` | Atualiza event type |
| `viewer.eventTypes.delete` | Remove event type |
| `viewer.eventTypes.duplicate` | Duplica event type |

## Código Relevante

- Schema: `packages/prisma/schema.prisma` → model EventType
- tRPC router: `packages/trpc/server/routers/viewer/eventTypes/`
- Página web: `apps/web/app/(use-page-wrapper)/(main-nav)/event-types/`
- Feature package: `packages/features/eventtypes/`
