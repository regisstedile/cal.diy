# BookingDenormalized — Tabela para Insights

## Por que existe

Queries de analytics (insights) precisam agregar muitos dados: total de bookings por período, por usuário, por tipo, por status. Fazer JOINs complexos na tabela `Booking` a cada request seria lento.

`BookingDenormalized` é uma tabela pré-calculada que já contém todos os dados necessários para insights em uma única linha por booking.

## Campos

| Campo | Fonte |
|-------|-------|
| `id` | = Booking.id |
| `uid` | = Booking.uid |
| `title` | = Booking.title |
| `status` | = Booking.status |
| `startTime` / `endTime` | = Booking.startTime/endTime |
| `createdAt` | = Booking.createdAt |
| `location` | = Booking.location |
| `userId` | Host do booking |
| `teamId` | Time (se evento de equipe) |
| `eventTypeId` | Tipo do evento |
| `eventLength` | Duração em minutos |
| `eventParentId` | EventType parent (managed events) |
| `isTeamBooking` | Boolean derivado |
| `attendees` | JSON com nome+email dos participantes |
| `paid` | Se foi pago |
| `noShowHost` | Se host marcou no-show |

## View BookingTimeStatusDenormalized

Sobre `BookingDenormalized`, há uma **view** que adiciona `timeStatus`:

```sql
CREATE VIEW "BookingTimeStatusDenormalized" AS
SELECT *,
  CASE
    WHEN status = 'cancelled' THEN 'cancelled'
    WHEN status = 'rescheduled' THEN 'rescheduled'  
    WHEN "endTime" < NOW() AND status = 'accepted' THEN 'completed'
    ELSE 'uncompleted'
  END as "timeStatus"
FROM "BookingDenormalized";
```

`timeStatus` não é armazenado — é calculado em tempo real baseado em `NOW()`. Isso significa que um booking `ACCEPTED` com `endTime` no passado aparece automaticamente como `completed` sem nenhuma job de atualização.

## Como é Populado

Quando um booking é criado/atualizado/cancelado, o sistema atualiza `BookingDenormalized` via:
- Triggers no DB (se configurados)
- Chamadas explícitas no handler de booking

## Uso nos Insights

Todas as queries de insights filtram em `BookingTimeStatusDenormalized`:

```sql
-- KPI: total de bookings no período
SELECT COUNT(*) FROM "BookingTimeStatusDenormalized"
WHERE "startTime" BETWEEN $startDate AND $endDate
AND ("teamId" IS NULL)  -- scope: bookings pessoais

-- Por status
SELECT "timeStatus", COUNT(*) 
FROM "BookingTimeStatusDenormalized"
GROUP BY "timeStatus"
```

## Scope das Queries

Controlado por `InsightsBookingBaseService.buildBaseWhereCondition()`:

| Scope | Condição SQL |
|-------|-------------|
| `user` (admin global) | `("teamId" IS NULL)` — todos os bookings pessoais |
| `team` | `"teamId" = $teamId` |
| `org` | booking dentro da org |

## Código Relevante

- View: `packages/prisma/schema.prisma` → model BookingTimeStatusDenormalized
- Service de insights: `packages/features/insights/services/InsightsBookingBaseService.ts`
- Adapter: `apps/web/modules/insights/`
