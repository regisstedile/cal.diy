---
title: "Mapa geral do cal-diy enterprise"
tags: [cal-diy, arquitetura, monorepo]
created: 2026-05-23
---

# Mapa geral do cal-diy enterprise

## Objetivo

Dar um caminho de leitura para quem precisa alterar ou revisar o `cal-diy` sem depender de tentativa e erro.

## Apps principais

| App | Papel | Diretórios principais |
|---|---|---|
| Web | Produto principal, settings, booking pages, admin, insights | `apps/web/app`, `apps/web/modules`, `apps/web/components`, `apps/web/pages/api` |
| API v2 | API REST/NestJS exposta para integrações e MCP | `apps/api/v2/src` |
| Docs | Documentação pública upstream/custom | `apps/docs` |

## Packages principais

| Package | Papel |
|---|---|
| `packages/prisma` | Schema, migrations, enums, selects e client Prisma |
| `packages/trpc` | Routers, schemas Zod, handlers e client tRPC |
| `packages/features` | Regras de negócio reutilizáveis por domínio |
| `packages/ui` | Componentes compartilhados |
| `packages/i18n` | Traduções `pt`, `pt-BR` e demais idiomas |
| `packages/app-store` | Apps, credentials, integrações e webhooks |

## Como rastrear uma feature

1. Comece pela rota em `apps/web/app` ou `apps/web/modules`.
2. Identifique chamadas `trpc.viewer.*` ou fetch/API.
3. Abra o router em `packages/trpc/server/routers/viewer/**`.
4. Abra o `*.handler.ts` chamado pelo router.
5. Rastreie Prisma em `packages/prisma/schema.prisma`, repositories ou selects.
6. Procure testes em `apps/web/playwright`, `apps/web/test` e `packages/features/**/test`.
7. Verifique tradução em `packages/i18n/locales/pt-BR/common.json` quando mexer em UI.

## Documentos de feature

- [`03-features/organizations.md`](03-features/organizations.md)
- [`03-features/bookings.md`](03-features/bookings.md)
- [`03-features/event-types.md`](03-features/event-types.md)
- [`03-features/availability-and-slots.md`](03-features/availability-and-slots.md)
- [`03-features/public-booking-page.md`](03-features/public-booking-page.md)
- [`03-features/teams-routing.md`](03-features/teams-routing.md)
- [`03-features/webhooks-integrations.md`](03-features/webhooks-integrations.md)
- [`03-features/payments.md`](03-features/payments.md)
- [`03-features/auth-sso.md`](03-features/auth-sso.md)
- [`03-features/mobile.md`](03-features/mobile.md)

## Documentos já existentes que continuam válidos

- `docs/allged/README.md`: visão operacional da instância ALLGED.
- `docs/allged/09-infra/05-rebuild.md`: rebuild Docker.
- `docs/allged/05-api/05-endpoints-ref.md`: referência de endpoints.
- `docs/estudo/02-linha-estudo-cal-diy.md`: trilha de estudo aplicada ao código.
