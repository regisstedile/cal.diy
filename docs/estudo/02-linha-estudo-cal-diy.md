---
title: "Linha de estudo aplicada ao cal-diy"
tags: [typescript, react, nextjs, prisma, trpc, cal-diy]
created: 2026-05-23
repo: "/home/regis/stack/cal-diy"
---

# Linha de estudo aplicada ao cal-diy

## Objetivo

Chegar ao ponto de conseguir explicar uma feature do `cal-diy` de ponta a ponta: tela, componente, hook, tRPC/API, validação, Prisma, banco, teste, build e operação Docker.

## Linha 0 — mapa do sistema

Leia primeiro:

- `docs/allged/01-visao-geral/03-monorepo.md`
- `docs/allged/01-visao-geral/04-fluxo-request.md`
- `docs/allged/09-infra/01-docker-compose.md`
- `docs/allged/09-infra/05-rebuild.md`

Código para abrir:

- `apps/web/app/`
- `apps/web/modules/`
- `apps/api/v2/src/`
- `packages/prisma/schema.prisma`
- `packages/trpc/`
- `packages/features/`

Resultado esperado: saber onde procurar uma regra antes de editar.

## Linha 1 — TypeScript que aparece todo dia

Fonte principal: Total TypeScript Essentials.

Temas:

- inference vs annotation;
- unions e narrowing;
- tipos derivados;
- `satisfies`;
- assertions e seus riscos;
- configuração TS em monorepo.

Aplicar em:

- `packages/prisma/selects/**`
- `packages/features/bookings/**`
- `packages/trpc/server/routers/**`
- `apps/web/modules/**/types.ts`

Pergunta de revisão: o tipo vem de fonte confiável ou foi duplicado manualmente?

## Linha 2 — React + TypeScript no `apps/web`

Fontes: Rippon + Frontend Masters React and TypeScript v2.

Temas:

- props e children;
- state tipado;
- reducers/actions;
- context;
- componentes polimórficos;
- forms;
- data fetching;
- testes UI.

Aplicar em:

- `apps/web/app/(use-page-wrapper)/settings/**`
- `apps/web/modules/bookings/**`
- `apps/web/modules/event-types/**`
- `apps/web/components/**`
- `packages/ui/**`

Exercício concreto: documentar a tela Organizations Members, incluindo invite, accept, decline, change role e remove member.

## Linha 3 — runtime boundaries

Fontes: Total TypeScript + Practical TypeScript.

Temas:

- diferença entre tipo compile-time e validação runtime;
- Zod como contrato;
- dados externos como `unknown` até validar;
- DTOs entre API, server e UI.

Aplicar em:

- `packages/trpc/server/routers/**`
- `apps/api/v2/src/**`
- `apps/web/app/api/**`
- integrações em `packages/app-store/**`

Pergunta de revisão: se vier payload ruim do cliente ou webhook, onde ele é barrado?

## Linha 4 — dados e Prisma

Fonte: Total TypeScript, capítulos de deriving types e designing types.

Aplicar em:

- `packages/prisma/schema.prisma`
- `packages/prisma/selects/**`
- repositories em `packages/features/**/repositories/**`
- migrations e views documentadas em `docs/allged/03-banco-de-dados/` e `docs/allged/06-insights/05-dados-db.md`

Exercício concreto: escolher uma query de insights e rastrear do SQL até o card na UI.

## Linha 5 — testes como documentação

Fonte: React with TypeScript + testes existentes.

Aplicar em:

- `apps/web/playwright/settings/organizations.e2e.ts`
- `apps/web/playwright/**/*.e2e.ts`
- `packages/features/**/test/**`
- `apps/web/test/**`

Regra: teste bom deve dizer qual regra de negócio foi protegida, não apenas que um botão aparece.

## Linha 6 — estudo por feature real

Use esta ordem para documentar o sistema:

1. Organizations: create org, invite, accept/decline, role, remove, SSO/SAML.
2. Booking: create, cancel, reschedule, no-show, confirmation.
3. Event Types: configuração, disponibilidade, team event types.
4. Insights: KPIs, gráficos, routing forms, views denormalizadas.
5. API v2: auth, bookings, event types, orgs, API keys.
6. Mobile companion: OAuth, SecureStore, bookings, push notifications.
7. Infra: Docker, env vars, rebuild, backup, migrations.

Cada feature deve gerar um arquivo de documentação com:

- entrada de usuário;
- arquivos de UI;
- contrato API/tRPC;
- entidades Prisma;
- regra de negócio;
- testes existentes;
- lacunas e riscos.
