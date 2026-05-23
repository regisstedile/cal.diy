# KPI Cards — Métricas Principais

## O que são

Cards no topo do dashboard de insights com métricas numéricas do período selecionado.

## Métricas

| Card | Descrição | timeStatus |
|------|-----------|-----------|
| Total bookings | Todos no período | qualquer |
| Completed | Realizados | `completed` |
| Rescheduled | Reagendados | `rescheduled` |
| Cancelled | Cancelados | `cancelled` |
| No-Show | Host marcou ausência | `noShowHost = true` |

## tRPC

```
viewer.insights.bookingKPIStats
```

Input: `{ startDate, endDate, teamId?, userId?, eventTypeId? }`

Response:
```typescript
{
  total: number;
  completed: number;
  rescheduled: number;
  cancelled: number;
  noShowHost: number;
}
```

## Query SQL (simplificada)

```sql
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE "timeStatus" = 'completed') as completed,
  COUNT(*) FILTER (WHERE "timeStatus" = 'rescheduled') as rescheduled,
  COUNT(*) FILTER (WHERE "timeStatus" = 'cancelled') as cancelled,
  COUNT(*) FILTER (WHERE "noShowHost" = true) as "noShowHost"
FROM "BookingTimeStatusDenormalized"
WHERE "startTime" BETWEEN $startDate AND $endDate
AND {scope condition}
```

## Dados Atuais (ALLGED)

10 bookings no DB, dos quais 3 em 2026-05-21 dentro do filtro "última semana".

## Componente

`apps/web/modules/insights/components/booking/BookingKPICards.tsx`

Mostra skeleton quando `isPending || isError || !data`. O fix do ENDPOINTS resolveu o `isError=true` permanente.
