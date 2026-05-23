# Gráficos de Insights

## Gráficos Disponíveis

### 1. Bookings por Dia (BookingsByDayChart)

**Componente**: `apps/web/modules/insights/components/booking/BookingsByDayChart.tsx`

**tRPC**: `viewer.insights.bookingsByDayOfWeek`

Input: `{ startDate, endDate, teamId?, userId?, eventTypeId? }`

Response:
```typescript
Array<{
  day: string;        // "Monday", "Tuesday", ...
  count: number;
}>
```

Mostra barras horizontais com contagem por dia da semana. Útil para identificar dias de pico.

---

### 2. Bookings por Hora (BookingsByHourChart)

**Componente**: `BookingsByHourChart.tsx`

**tRPC**: `viewer.insights.bookingsByHour`

Response:
```typescript
Array<{
  hour: number;    // 0–23
  count: number;
}>
```

Identifica horários de maior demanda.

---

### 3. Bookings ao Longo do Tempo (BookingsOverTimeChart)

**Componente**: `BookingsOverTimeChart.tsx`

**tRPC**: `viewer.insights.bookingOverTime`

Response:
```typescript
Array<{
  date: string;    // ISO date
  created: number;
  completed: number;
  rescheduled: number;
  cancelled: number;
}>
```

Gráfico de linha mostrando evolução dos bookings no período.

---

### 4. Membros Mais Populares (MostBookedMembersTable)

**Componente**: `MostBookedMembersTable.tsx`

**tRPC**: `viewer.insights.membersWithMostBookings`

Response:
```typescript
Array<{
  userId: number;
  username: string;
  emailMd5: string;
  bookingCount: number;
}>
```

Ranking de membros por número de bookings recebidos.

---

### 5. Event Types Mais Reservados (MostBookedEventTypesTable)

**Componente**: `MostBookedEventTypesTable.tsx`

**tRPC**: `viewer.insights.popularEventTypes`

Response:
```typescript
Array<{
  eventTypeId: number;
  eventTypeName: string;
  count: number;
}>
```

---

### 6. Duração Média (AverageEventDuration)

**tRPC**: `viewer.insights.averageEventDuration`

Response: `{ hours: number; minutes: number }`

---

## Filtros Globais

Todos os gráficos respeitam os filtros do topo:

| Filtro | Campo |
|--------|-------|
| Período | `startDate` + `endDate` |
| Team | `teamId` |
| Membro | `userId` |
| Event Type | `eventTypeId` |

Os filtros são propagados via contexto React (`FiltersContext`) e sincronizados com query params da URL.

## Página

`apps/web/app/(use-page-wrapper)/insights/page.tsx`

Renderiza todos os gráficos dentro de `DataTableProvider`. Marcada `force-dynamic` para evitar cache estático.
