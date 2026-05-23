---
title: "11. Reusable Components"
book: "[[_INDEX]]"
tags: [react, typescript, reusable-components, generics]
created: 2026-05-23
---

# 11. Reusable Components

## Ideia Central

Componentes reutilizáveis precisam preservar inferência de props e callbacks. TypeScript ajuda a criar componentes genéricos sem perder segurança.

## Tópicos

- Generic props
- `keyof`
- Generic React components
- Prop spreading
- Render props
- Custom hooks
- Controlled/uncontrolled state

## Aplicação no cal-diy

Estudar:

- `packages/ui/**`
- `apps/web/lib/QueryCell.tsx`
- `packages/trpc/components/QueryCell.tsx`
- componentes em `apps/web/modules/**`

## Checklist

- O componente preserva tipo do item em callbacks?
- Usa `any` para simplificar API?
- API de props permite estados inválidos?
- Render prop ou generic simplificaria o uso?
- O estado interno pode ser controlado externamente quando necessário?
