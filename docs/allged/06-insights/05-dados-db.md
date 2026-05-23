# Insights — Dados no Banco

## View Principal: BookingTimeStatusDenormalized

```sql
-- Estrutura da view
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'BookingTimeStatusDenormalized'
ORDER BY ordinal_position;
```

A view computa `timeStatus` dinamicamente:

```sql
-- Lógica aproximada
CASE
  WHEN status = 'cancelled' THEN 'cancelled'
  WHEN status = 'accepted' AND endTime < NOW() THEN 'completed'
  WHEN status = 'accepted' AND endTime >= NOW() THEN 'upcoming'
  WHEN noShowHost = true THEN 'noShowHost'
  ...
END as "timeStatus"
```

## Tabela BookingDenormalized

Tabela desnormalizada mantida por triggers. Contém campos de `Booking` + `EventType` + `User` combinados para consultas de insights rápidas.

```sql
SELECT * FROM "BookingDenormalized" LIMIT 5;
```

## Query KPI Cards (Real)

```sql
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE "timeStatus" = 'completed') as completed,
  COUNT(*) FILTER (WHERE "timeStatus" = 'rescheduled') as rescheduled,
  COUNT(*) FILTER (WHERE "timeStatus" = 'cancelled') as cancelled,
  COUNT(*) FILTER (WHERE "noShowHost" = true) as "noShowHost"
FROM "BookingTimeStatusDenormalized"
WHERE "startTime" BETWEEN '2026-05-16' AND '2026-05-23'
AND "teamId" = 2;
```

## Query Bookings por Dia

```sql
SELECT 
  EXTRACT(DOW FROM "startTime" AT TIME ZONE 'America/Sao_Paulo') as day_of_week,
  COUNT(*) as count
FROM "BookingTimeStatusDenormalized"
WHERE "startTime" BETWEEN $start AND $end
AND "teamId" = 2
GROUP BY day_of_week
ORDER BY day_of_week;
```

DOW: 0=Domingo, 1=Segunda, ..., 6=Sábado.

## Escopo de Filtro

Os handlers de insights aceitam três tipos de escopo:

| Escopo | Condição SQL |
|--------|-------------|
| Global (admin) | Sem filtro de team/user |
| Time | `WHERE "teamId" = $teamId` |
| Usuário | `WHERE "userId" = $userId` |

Na ALLGED, o admin (registedile@gmail.com) vê todos os bookings. Os técnicos veem apenas os próprios.

## Dados Atuais (2026-05-23)

```sql
-- Total de bookings
SELECT COUNT(*) FROM "Booking"; -- 10

-- Por status
SELECT status, COUNT(*) FROM "Booking" GROUP BY status;

-- Bookings da última semana (filtro padrão dos insights)
SELECT COUNT(*) FROM "BookingTimeStatusDenormalized"
WHERE "startTime" >= NOW() - INTERVAL '7 days';
```

## Manutenção

Se a view `BookingTimeStatusDenormalized` ficar desatualizada ou corrompida:

```sql
-- Recriar (cuidado em produção)
-- Ver definição atual:
SELECT pg_get_viewdef('"BookingTimeStatusDenormalized"'::regclass, true);
```
