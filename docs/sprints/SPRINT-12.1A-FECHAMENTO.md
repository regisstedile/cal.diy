# Sprint 12.1A — Organizations compat/admin leve

**Data:** 2026-07-11

## Escopo

Portar apenas procedures úteis de `viewer.organizations` que não dependem de billing, wizard SaaS, PBAC enterprise ou admin global.

## Entregue

- `viewer.organizations.listCurrent` com retorno compatível para organização atual e `features.delegationCredential=false`.
- `viewer.organizations.getTeams` listando times filhos da organização do usuário autenticado.
- `viewer.organizations.addMembersToTeams` permitindo owner/admin adicionar membros aceitos da org a times filhos da org, com deduplicação de input e `skipDuplicates`.
- Helper testável em `packages/trpc/server/routers/viewer/organizations/teams.ts`.
- Teste unitário em `packages/trpc/server/routers/viewer/organizations/teams.test.ts`.

## Paridade

- `organizations`: 26 -> 29 procedures no fork.
- Faltantes de `organizations`: 25 -> 22.
- Total fork: 324 -> 327.
- Total faltante geral: 72 -> 69.

## Validação

- `node_modules/.bin/vitest run packages/trpc/server/routers/viewer/organizations/teams.test.ts`: 9/9 passou.
- `node_modules/.bin/tsc --noEmit --project packages/trpc/tsconfig.json`: exit 0.
- `node_modules/.bin/biome check` em `schema.ts`, `teams.ts` e `teams.test.ts`: exit 0; apenas infos nursery.
- `node_modules/.bin/biome check` incluindo `_router.tsx`: falha por formatação baseline/preexistente no router; `--write` reformataria blocos antigos fora da fatia funcional.

## Fora do escopo

- Wizard `/settings/organizations/new`.
- Billing/payment/upgrade.
- Admin global `admin*`.
- `getUser/updateUser`, password reset e hosts/eventTypes.
