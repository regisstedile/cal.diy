---
title: "Plano de Estudo: cal-diy Enterprise com TypeScript"
book: "[[_INDEX]]"
tags: [typescript, cal-diy, enterprise, estudo, arquitetura]
created: 2026-05-23
repo: "/home/regis/stack/cal-diy"
---

# Plano de Estudo: cal-diy Enterprise com TypeScript

## Objetivo

Estudar TypeScript usando o `cal-diy` como projeto real. A meta não é só entender sintaxe: é conseguir ler, modificar e revisar código enterprise com segurança.

## Repositório

- Caminho: `/home/regis/stack/cal-diy`
- Branch atual observada: `deploy`
- Stack principal: Next.js, React, TypeScript, Prisma, tRPC, Zod, Turbo, Vitest, Playwright, Biome.
- Apps principais: `apps/web`, `apps/api`, `apps/docs`
- Packages principais: `packages/features`, `packages/trpc`, `packages/prisma`, `packages/ui`, `packages/lib`, `packages/i18n`, `packages/app-store`

## Regra de Estudo

Cada sessão deve produzir uma nota pequena com quatro blocos:

1. Conceito TypeScript.
2. Exemplo mínimo isolado.
3. Exemplo real no `cal-diy`.
4. Risco de manutenção ou bug que esse conceito ajuda a evitar.

## Trilha 1 — Fundamentos no Código Real

### Tema: Anotações, Inferência e Props

Livro: capítulos 4 e 5.

Arquivos para estudar:

- `apps/web/components/booking/CancelBooking.tsx`
- `apps/web/modules/bookings/types.ts`
- `apps/web/components/booking/types.ts`

Perguntas:

- Quais props são opcionais?
- Onde a inferência ajuda?
- Onde existe casting ou non-null assertion?
- Algum estado inválido poderia ser impedido por tipo?

## Trilha 2 — Domínio de Booking

### Tema: unions, narrowing e regras de negócio

Livro: capítulos 5, 15 e 16.

Arquivos para estudar:

- `packages/features/bookings/lib/handleCancelBooking.ts`
- `packages/features/bookings/lib/cancellationReason.ts`
- `packages/features/bookings/lib/getBookingToDelete.ts`
- `packages/features/bookings/repositories/BookingRepository.ts`

Exercício:

Mapear o fluxo de cancelamento:

- entrada da UI/API;
- validação;
- busca no banco;
- regra de host/attendee;
- atualização de booking;
- notificações/webhooks;
- testes.

## Trilha 3 — Prisma e Tipos Derivados

### Tema: `satisfies`, selects e DTOs

Livro: capítulos 10, 11 e 15.

Arquivos para estudar:

- `packages/prisma/schema.prisma`
- `packages/prisma/selects/event-types.ts`
- `packages/prisma/enum-generator.ts`
- `packages/prisma/zod-utils.ts`

Perguntas:

- Onde o tipo vem do schema?
- Onde o repo duplica tipo manualmente?
- Onde `satisfies Prisma.XSelect` protege selects?
- Qual dado sai do banco e chega na UI?

## Trilha 4 — tRPC, Zod e Fronteiras Externas

### Tema: `unknown`, schemas e validação runtime

Livro: capítulos 5, 13, 15 e 16.

Arquivos para estudar:

- `packages/trpc`
- `apps/web/app/_trpc/trpc.ts`
- `apps/web/app/_trpc/trpc-provider.tsx`
- rotas em `packages/trpc/server/routers/**`

Perguntas:

- O que é validado em runtime?
- O que é garantido só por TypeScript?
- Onde Zod vira contrato de API?
- Onde seria perigoso confiar apenas no tipo?

## Trilha 5 — Configuração Enterprise

### Tema: `tsconfig`, módulos, builds e monorepo

Livro: capítulos 13 e 14.

Arquivos para estudar:

- `package.json`
- `turbo.json`
- `apps/web/tsconfig.json`
- `apps/api/v2/tsconfig.json`
- `apps/api/v2/tsconfig.build.json`
- `packages/tsconfig`

Perguntas:

- Como o monorepo executa typecheck?
- Quais pacotes compartilham configuração?
- O build emite JS ou só valida tipos?
- Como aliases/imports internos funcionam?

## Trilha 6 — UI e Componentes Compartilhados

### Tema: generics, composição e inferência em React

Livro: capítulos 4, 10, 15 e 16.

Arquivos para estudar:

- `packages/ui`
- `apps/web/lib/QueryCell.tsx`
- `packages/trpc/components/QueryCell.tsx`
- componentes em `apps/web/modules/**`

Perguntas:

- Quais componentes são genéricos?
- Como estados loading/error/empty/success são tipados?
- Onde a UI aceita dados demais?
- Onde um discriminated union deixaria o componente mais seguro?

## Trilha 7 — Testes Como Documentação de Tipos

### Tema: comportamento + tipos

Livro: capítulos 3, 11 e 16.

Arquivos para estudar:

- `packages/features/bookings/lib/handleCancelBooking/test/handleCancelBooking.test.ts`
- `apps/web/playwright/**/*.e2e.ts`
- testes de lib em `apps/web/test/**`

Perguntas:

- O teste cobre regra de negócio ou só renderização?
- O teste falharia se o tipo aceitasse estado inválido?
- Há casos onde `@ts-expect-error` seria útil para documentar restrição?

## Primeiro Projeto Prático Recomendado

Usar a feature `CancellationReason` como estudo completo:

1. Ler enum/schema no Prisma.
2. Ler validação em `handleCancelBooking`.
3. Ler UI em `CancelBooking.tsx`.
4. Ler tradução em `packages/i18n/locales/pt-BR/common.json`.
5. Ler testes focados.
6. Escrever uma nota explicando o fluxo de ponta a ponta.

## Rotina de 7 Dias

### Dia 1

Livro capítulos 1-3 + mapear scripts e `tsconfig` do repo.

### Dia 2

Livro capítulo 4 + estudar props/componentes simples.

### Dia 3

Livro capítulo 5 + estudar cancellation/booking status.

### Dia 4

Livro capítulos 6-8 + estudar Prisma models e DTOs.

### Dia 5

Livro capítulos 10-11 + estudar `satisfies`, `as`, `@ts-expect-error` no repo.

### Dia 6

Livro capítulos 13-14 + estudar monorepo, módulos e configs.

### Dia 7

Livro capítulos 15-16 + criar/refatorar um helper tipado pequeno no repo.

## Critério de Progresso

Você está evoluindo quando consegue responder:

- De onde este tipo vem?
- Esse dado foi validado em runtime ou só em compile-time?
- Qual estado inválido ainda é representável?
- Esse `as` é necessário ou esconde bug?
- O tipo está duplicado ou derivado de uma fonte confiável?
- O teste confirma a regra que o tipo promete?
