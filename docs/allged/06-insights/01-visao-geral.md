# Insights — Visão Geral

## O que é

Dashboard de analytics que mostra métricas de agendamentos: total, concluídos, cancelados, no-shows, e gráficos por período.

## Acesso

`https://cal.allged.com.br/insights`

## Fix Implementado

A página ficava em skeleton eterno. Causa: `"insights"` não estava no array `ENDPOINTS` em `packages/trpc/react/shared.ts`.

Sem essa entry, `links["insights"]` era `undefined` → TypeError em toda chamada tRPC → `isError=true` → skeleton permanente. **Corrigido no commit** `eb7b606648`.

## Dados Disponíveis

### KPI Cards

| Métrica | Descrição |
|---------|-----------|
| Total bookings | Todos no período |
| Completed | status=ACCEPTED e endTime < agora |
| Cancelled | status=CANCELLED |
| No-Show | Host marcou no-show |
| Rescheduled | Foram reagendados |

### Gráficos

- Bookings por dia (série temporal)
- Bookings por tipo de evento
- Bookings por membro da equipe
- Tempo médio de duração

### Routing Insights

Sub-página `/insights/routing` — mostra métricas de routing forms. **Atualmente 0 dados** (nenhum routing form configurado).

## Filtros

| Filtro | Opções |
|--------|--------|
| Período | Últimos 7 dias, 30 dias, mês atual, ano atual, personalizado |
| Tipo de evento | Todos ou específico |
| Membro | Todos ou específico (para admins) |
| Team | Todos ou específico |

Filtros persistem na URL via `activeFilters` parâmetro JSON.

## Escopo de Dados

Controlado por `InsightsOrgTeamsProvider`:

| Tipo de usuário | Dados visíveis |
|----------------|----------------|
| Admin global | Todos os bookings pessoais (`teamId IS NULL`) |
| Membro de time | Bookings do time |
| Admin de org | Todos os bookings da org |

## Código Relevante

- tRPC router: `packages/trpc/server/routers/viewer/insights/`
- Service: `packages/features/insights/services/`
- UI: `apps/web/app/(use-page-wrapper)/insights/`
- Hooks: `apps/web/modules/insights/`
