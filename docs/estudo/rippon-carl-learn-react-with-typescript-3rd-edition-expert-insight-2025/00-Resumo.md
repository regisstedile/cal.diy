---
title: "Learn React with TypeScript, 3rd Edition — Resumo"
book: "[[_INDEX]]"
tags: [book, resumo, react, typescript, nextjs, frontend]
created: 2026-05-23
source_pdf: "/home/regis/stack/cal-diy/docs/estudo/Rippon Carl - Learn React with TypeScript, 3rd Edition (Expert Insight) - 2025.pdf"
---

# Resumo — Learn React with TypeScript, 3rd Edition

## Resumo Executivo

O livro ensina a construir aplicações React modernas com TypeScript, cobrindo desde componentes, props, state e hooks até Next.js, React Server Components, Server Functions, TanStack Query, formulários, state management, componentes reutilizáveis e testes com Vitest/React Testing Library.

Para o `cal-diy`, esse é o material mais próximo do `apps/web`: Next.js, React Server/Client Components, formulários, data fetching, estado compartilhado e testes de UI aparecem diretamente no código real.

## Estrutura

- **Capítulos 1-3:** base React + TypeScript + hooks.
- **Capítulos 4-6:** styling, Server/Client Components e Next.js multi-page app.
- **Capítulos 7-9:** data fetching/mutations, Server Functions, TanStack Query e formulários.
- **Capítulos 10-12:** state management, componentes reutilizáveis e testes.

## Como Aplicar no cal-diy

1. Ler um capítulo.
2. Escolher um arquivo equivalente em `apps/web`.
3. Mapear quais dados ficam no servidor e quais ficam no cliente.
4. Ver como tipos entram em props, hooks, query/mutation e forms.
5. Criar uma nota com risco de bug evitado.

## Trilhas Práticas

### Booking UI

- `apps/web/components/booking/CancelBooking.tsx`
- `apps/web/modules/bookings/**`
- estudar props, state, handlers, formulários e mutations.

### App Router / Server Components

- `apps/web/app/**`
- estudar layout, rotas, server/client boundaries e providers.

### Data Fetching

- `apps/web/app/_trpc/**`
- `packages/trpc/components/QueryCell.tsx`
- estudar query client, loading, error, mutation e tipagem de resposta.

### Componentes Compartilhados

- `packages/ui/**`
- estudar generics, composição, render props e APIs de componentes.

### Testes

- `apps/web/playwright/**`
- testes unitários com Vitest e componentes quando existirem.

## Relação Com os Outros Materiais

- Frontend Masters: modelo mental TypeScript.
- Total TypeScript: fundamentos e tipos avançados.
- Практический TypeScript: checklist de boas práticas.
- Learn React with TypeScript: aplicação prática em React/Next.

## Referência

[[_INDEX]]
