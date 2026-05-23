---
title: "12. Unit Testing with Vitest and the React Testing Library"
book: "[[_INDEX]]"
tags: [react, typescript, vitest, testing-library, tests]
created: 2026-05-23
---

# 12. Unit Testing with Vitest and the React Testing Library

## Ideia Central

Testes em React devem verificar comportamento observável. TypeScript reduz bugs de contrato; testes verificam fluxo, interação e regressões.

## Tópicos

- Testes de funções puras
- Testes de exceções
- Testes de componentes
- Queries da React Testing Library
- `fireEvent` e `user-event`
- Coverage

## Aplicação no cal-diy

Estudar:

- `packages/features/bookings/lib/handleCancelBooking/test/handleCancelBooking.test.ts`
- `apps/web/test/**`
- `apps/web/playwright/**`
- testes de componentes existentes em `apps/web/modules/**`

## Checklist

- O teste cobre comportamento ou implementação?
- Usa query acessível antes de test id?
- O TypeScript já cobre parte do contrato?
- Falta teste para regra de negócio que o tipo não consegue garantir?
