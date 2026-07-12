# Sprint 12 — Triagem verificável de `viewer.organizations`

**Gerado:** 2026-07-11, após `git fetch --all --prune`.

## Sync / fonte da verdade

- Branch local: `deploy`
- HEAD local: `55e4488381`
- HEAD remoto `fork/deploy`: `55e4488381`
- Working tree: limpo, exceto transcript não rastreado `2026-07-11-182453-local-command-caveatcaveat-the-messages-below.txt`

Condição de entrada da Fase H satisfeita: Teams fechado em `55e4488381`; próxima direção recomendada no `STATUS-EXECUTIVO.md` é Organizations.

## Inventário confirmado

- Matriz nominal de entrada: `docs/cal-fork/PARITY-PROCEDURES.md` indicava `organizations` REF 41, fork 26, faltam 25, só no fork 10. Após 12.1A: fork 29, faltam 22.
- Router custom: `packages/trpc/server/routers/viewer/organizations/_router.tsx`.
- REF local: `docs/cal-fork/cal-diy-opensource/.../viewer/organizations/`.
- UI atual usa `getCurrent`, `create`, `update`, `listMembers`, `inviteMember`, `removeMember`, `updateMemberRole`, `listPendingInvites`, `acceptInvite`, `declineInvite`, SAML, privacy stubs e other-team helpers.
- E2E existente: `apps/web/playwright/settings/organizations.e2e.ts` cobre 7 fluxos principais, conforme `docs/cal-diy-enterprise/03-features/organizations.md`.

## Consumers atuais que NÃO podem quebrar

`getCurrent`, `create`, `update`, `listMembers`, `inviteMember`, `removeMember`, `updateMemberRole`, `listPendingInvites`, `acceptInvite`, `declineInvite`, `getSamlSettings`, `saveSamlConnection`, `deleteSamlConnection`, `getOtherTeam`, `getMembers`, `listOtherTeamMembers`, `listOtherTeams`, `deleteTeam`, `listWatchlistEntries`, `listBookingReports`, `pendingReportsCount`, `getWatchlistEntryDetails`, `createWatchlistEntry`, `deleteWatchlistEntry`, `addToWatchlist`, `dismissBookingReport`.

## Decisão por procedure nominal faltante

| Procedure REF | Linhas REF | Sinais | Equivalente no fork | Decisão | Justificativa |
|---|---:|---|---|---|---|
| `listCurrent` | 36 | feature flag delegation | `getCurrent` parcial | **PORTADO 12.1A** | Compat sem billing: org atual + `features.delegationCredential=false`, preservando `getCurrent`. |
| `getOrganizationOnboarding` | 21 | onboarding repo | — | **REVISAR 12.2** | Necessário para wizard `/settings/organizations/new`; sem consumer hoje. Depende de decidir wizard sem billing. |
| `intentToCreateOrg` | 116 | license/self-hosted/onboarding | — | **REVISAR 12.2** | Parte do wizard. Alto acoplamento a licença; precisa adaptação self-hosted/ALLGED, não copy-paste. |
| `createWithPaymentIntent` | 92 | payment/checkout | — | **IGNORAR — BILLING** | Fluxo SaaS de pagamento. Fora do escopo ALLGED. |
| `checkIfOrgNeedsUpgrade` | 52 | billing/subscription/PBAC | — | **IGNORAR — BILLING** | Upsell/upgrade de plano. |
| `publish` | 109 | billing/payment/checkout/seat | — | **IGNORAR — BILLING** | Publicação com compra/assinatura. |
| `createTeams` | 372 | stripe/subscription/PBAC | — | **REVISAR 12.3** | Criação/migração bulk de times no wizard; parte útil existe, mas handler REF mistura billing/credit/org-domain. Não portar inteiro. |
| `getTeams` | 50 | PBAC/team.read | `listOtherTeams` parcial | **PORTADO 12.1A** | Lista times filhos da organização atual sem PBAC enterprise, preservando `listOtherTeams`. |
| `addMembersToTeams` | 19 | helper comum | — | **PORTADO 12.1A** | Owner/admin da org adiciona membros aceitos da org a times filhos, com `skipDuplicates`. |
| `addMembersToEventTypes` | 64 | PBAC/event hosts | — | **REVISAR 12.4** | Útil, mas cruza com hosts/eventTypes. Deve seguir depois de members-to-teams. |
| `removeHostsFromEventTypes` | 50 | PBAC/event hosts | — | **REVISAR 12.4** | Mesmo bloco de hosts/eventTypes; evitar antes de provar event host model do fork. |
| `getBrand` | 18 | brand helper | `getCurrent` traz org/branding parcial | **PORTAR 12.1 opcional** | Pequeno, mas sem consumer atual. Pode ser alias seguro se UI REF precisar. |
| `getUser` | 132 | PBAC/custom role | — | **PORTAR 12.5** | Administração de usuário dentro da org; útil, mas toca permissions/profile/role. |
| `updateUser` | 196 | PBAC/role/profile/avatar | — | **PORTAR 12.5** | Alto risco: username/avatar/role/customRoleId. Não primeira fatia. |
| `bulkDeleteUsers` | 167 | billing/seat/PBAC/profile | — | **IGNORAR/REFAZER DEPOIS** | Mistura remoção real de usuários com billing seat tracking. Requer desenho próprio se ALLGED precisar. |
| `sendPasswordReset` | 62 | password reset | — | **PORTAR DEPOIS** | Útil para org admin, mas tem impacto auth/email. Não primeira fatia. |
| `setPassword` | 64 | password/hash | — | **PORTAR DEPOIS** | Segurança alta; requer testes específicos e UX clara. |
| `verifyCode` | 65 | TOTP/rate limit | — | **REVISAR COM AUTH** | Fluxo sensível de código. Não portar sem entender tela/uso. |
| `adminGetAll` | 54 | platform admin | — | **IGNORAR — ADMIN GLOBAL** | Admin de plataforma, não org owner. Fora do escopo operacional imediato. |
| `adminGet` | 18 | platform admin | — | **IGNORAR — ADMIN GLOBAL** | Idem. |
| `adminUpdate` | 25 | platform admin service | — | **IGNORAR — ADMIN GLOBAL** | Idem. |
| `adminVerify` | 130 | platform admin verify | — | **IGNORAR — ADMIN GLOBAL** | Idem. |
| `adminDelete` | 106 | platform admin delete/domain | — | **IGNORAR — ADMIN GLOBAL** | Idem; destrutivo. |
| `createPhoneCall` | 27 | Cal AI Phone | — | **IGNORAR — AI PHONE** | Fora de escopo decidido. |
| `createSelfHosted` | 83 | self-hosted onboarding/license | — | **REVISAR 12.2** | Pode ter valor em self-hosted, mas toca onboarding/licença. Adaptar, não copiar. |

## O que NÃO é gap nominal simples

- `create/update/listMembers/invite/remove/updateRole/invites/SAML` já existem com contrato custom e consumers ativos.
- Privacy/blocklist/booking-report procedures existem no fork como stubs de compatibilidade. Elas aparecem em “Só no fork”, não em faltantes, e não devem ser “melhoradas” sem demanda real.
- Admin global (`admin*`) e billing (`createWithPaymentIntent`, `publish`, `checkIfOrgNeedsUpgrade`) não entram no escopo ALLGED por decisão já registrada.

## Conclusões classificadas

- ✅ Confirmado: Organizations atual tem CRUD/membros/convites/SAML custom em produção local (`_router.tsx`, handlers e docs enterprise locais).
- ✅ Confirmado: wizard `/settings/organizations/new/*` existe no REF e não existe no fork atual.
- ✅ Confirmado: a matriz nominal exagera trabalho útil; dos 25 faltantes, pelo menos 9 são billing/admin/AI fora de escopo.
- 🟡 Provável: a primeira entrega de maior valor é compat de leitura/admin leve (`listCurrent`, `getTeams`, `addMembersToTeams`) antes do wizard completo.
- ❓ Não verificado: se o dono precisa do wizard upstream ou se o fluxo custom `/settings/organizations/general` já basta para ALLGED.

## Fatia executada — Sprint 12.1A

**Objetivo:** fortalecer Organizations sem abrir billing/wizard: compat e leitura/admin leve. Executado após autorização do dono (`pode seguir`).

Procedures entregues:

1. `listCurrent` como compat de organização atual + `features.delegationCredential=false`.
2. `getTeams` para listar times filhos da organização atual, preservando `listOtherTeams`.
3. `addMembersToTeams` com isolamento por organização atual: só owner/admin da org, só usuários membros aceitos da org, só teams filhos da org.

Arquivos previstos:

- `packages/trpc/server/routers/viewer/organizations/_router.tsx`
- novo helper testável: `packages/trpc/server/routers/viewer/organizations/teams.ts`
- teste unit focado: `packages/trpc/server/routers/viewer/organizations/teams.test.ts`
- paridade atualizada em `PARITY-PROCEDURES.md`

Contratos a preservar:

- Nenhuma assinatura custom existente muda.
- Não importar billing, Stripe, PBAC enterprise só para tipos.
- Não tocar UI ainda.

Validação executada:

- `node_modules/.bin/vitest run packages/trpc/server/routers/viewer/organizations/teams.test.ts` — 9/9 passou.
- `node_modules/.bin/tsc --noEmit --project packages/trpc/tsconfig.json` — exit 0.
- `node_modules/.bin/biome check` em `schema.ts`, `teams.ts` e `teams.test.ts` — exit 0, só infos nursery.
- `node_modules/.bin/biome check` incluindo `_router.tsx` — bloqueado por formatação baseline/preexistente no router; `--write` reformataria blocos antigos fora do delta funcional.

## Alternativas de direção

| Opção | Valor | Risco | Decisão |
|---|---|---|---|
| 12.1A compat org teams/members | médio | baixo | **recomendada** |
| 12.2 wizard `/organizations/new` sem billing | alto se onboarding for prioridade | médio/alto | só depois de confirmar demanda |
| 12.5 user admin (`getUser/updateUser`) | médio | alto | depois de roles/permissions |
| admin global | baixo p/ ALLGED | alto | ignorar |
| billing/payment | fora de escopo | alto | ignorar |

## Critério para próxima implementação

A 12.1A está fechada. Para avançar, escolher entre 12.2 wizard `/settings/organizations/new` adaptado sem billing, 12.4 hosts/eventTypes, ou 12.5 administração de usuários. Não portar billing/admin global por matriz nominal.
