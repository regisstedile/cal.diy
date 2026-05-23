---
title: "10. State Management"
book: "[[_INDEX]]"
tags: [react, typescript, state-management]
created: 2026-05-23
---

# 10. State Management

## Ideia Central

Estado em React não é uma coisa só. O capítulo separa server state, form state, URL state, local state, derived state e shared state. Cada categoria pede ferramenta diferente.

## Tópicos

- Prop drilling
- Composição melhor que passagem excessiva de props
- React Context
- Zustand
- TanStack Query com URL parameters

## Aplicação no cal-diy

Estudar:

- filtros/listagens em `apps/web/modules/bookings/**`
- providers em `apps/web/app/providers.tsx`
- `apps/web/app/_trpc/query-client.ts`
- estado de URL em hooks como `useRouterQuery`, `useNuqsParams`, `useToggleQuery`

## Checklist

- Este estado é local, servidor, formulário, URL ou compartilhado?
- Está duplicado em mais de um lugar?
- Deveria estar na URL para ser compartilhável?
- Deveria estar no cache de query em vez de `useState`?
