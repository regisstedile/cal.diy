---
title: "15. Designing Your Types"
book: "[[_INDEX]]"
tags: [book, typescript, type-design, advanced-types]
created: 2026-05-23
---

# 15. Designing Your Types

## Ideia Central

Design de tipos é modelagem de domínio. O objetivo é criar tipos que representem estados válidos e eliminem combinações inválidas antes do runtime.

## Tópicos

- Generic types
- Multiple type parameters
- Default type parameters
- Type parameter constraints
- Template literal types
- Conditional types
- Mapped types
- Key remapping com `as`
- Mapped types sobre unions

## Aplicação no cal-diy

Estudar:

- tipos de domínio em `packages/features/**/types.ts`
- selects Prisma com `satisfies Prisma.*Select`
- schemas Zod em rotas/API
- DTOs entre `apps/web`, `packages/trpc` e `packages/prisma`
- enums e unions de status de booking/event type

## Exercício Aplicado

Pegar uma feature real, como cancelamento de booking, e mapear:

- estados possíveis
- estados inválidos hoje aceitos pelo tipo
- campos opcionais que deveriam virar discriminated union
- tipo derivado de Prisma/Zod que pode substituir duplicação manual
