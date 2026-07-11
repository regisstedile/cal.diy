# Sprint 11 — Triagem das 35 procedures faltantes de `viewer.teams`

**Gerado:** 2026-07-11 por análise de cada handler no REF
(`docs/cal-fork/cal-diy-opensource/.../viewer/teams/`) cruzada com o router
custom do fork (`packages/trpc/server/routers/viewer/teams/_router.tsx`).
Fonte da lista: `PARITY-PROCEDURES.md`.

**Regra:** "billing_hits" = nº de linhas do handler REF citando
stripe/billing/subscription/invoice/trial/seat/entitlement. Procedure não é
tratada como ausente só por nome — coluna "Equivalente no fork" busca
equivalência semântica no router custom.

## Consumers atuais de `viewer.teams.*` no fork (o que NÃO pode quebrar)

`getById` (12×), `list` (7×), `update` (5×), `eventTypes.*` (5×),
`listMembers` (3×), `inviteMember` (3×), `removeMember` (2×), `publish` (2×),
`listPendingInvites` (2×), `listForUser` (2×), `delete` (2×), `create` (2×),
`updateMemberRole`, `declineInvite`, `createInvite`, `checkIfMembershipExists`,
`acceptInvite`. **Todos servidos hoje pelo router custom.** Nenhuma procedure
DESTA triagem pode remover ou alterar assinatura dessas.

## Tabela de decisão

| Procedure REF | linhas | billing | Equivalente no fork | Decisão | Justificativa |
|---|---|---|---|---|---|
| `inviteMemberByToken` | 19 | 0 | — (delega TeamService, AUSENTE) | **PORTAR 11.1B** | núcleo do fluxo convite-por-link |
| `listInvites` | 22 | 0 | — (fork tem `listPendingInvites`, é do PONTO DE VISTA do convidado; este é do time) | **PORTAR 11.1A** | UI de convites do time precisa |
| `deleteInvite` | 51 | 0 | — | **PORTAR 11.1A** | revogar convite pendente |
| `resendInvitation` | 84 | 1 | — (dep email-service + onboarding, pesado) | **PORTAR 11.1A** (se couber no limite; senão 11.1C) | reenviar convite |
| `setInviteExpiration` | 61 | 0 | — | **PORTAR 11.1A** | expiração de token |
| `changeMemberRole` | 82 | 0 | `updateMemberRole` (custom, cobre) | **JÁ COBERTA (custom)** | fork já muda role via `updateMemberRole` |
| `updateMembership` | 36 | 0 | parte de `updateMemberRole` | **REVISAR 11.2** | REF permite mais campos (accepted, etc.) |
| `acceptOrLeave` | 29 | 0 | `acceptInvite`+`declineInvite` (custom) | **JÁ COBERTA (custom)** | fork separa aceitar/recusar |
| `get` | 50 | 0 | `getById` (custom) | **JÁ COBERTA (custom)** | contrato diferente; `getById` já usado 12× |
| `hasTeamMembership` | 15 | 0 | derivável de `getById` | **PORTAR 11.2** (barato) | guard usado por outras telas |
| `hasEditPermissionForUser` | 21 | 0 | — | **PORTAR 11.3** | proteção de permissão |
| `listOwnedTeams` | 15 | 0 | subconjunto de `listForUser` | **JÁ COBERTA (custom, filtrar)** | `listForUser` traz role; filtrar OWNER no client |
| `listSimpleMembers` | 68 | 0 | `listMembers` (custom, parcial) | **REVISAR 11.4** | contrato diferente (cross-team); 0 consumers no fork hoje |
| `legacyListMembers` | 155 | 0 | `listMembers` (custom) | **JÁ COBERTA (custom)** | "legacy" no REF; não portar código morto |
| `getMembershipbyUser` | 33 | 0 | — | **PORTAR 11.2** | leitura de membership específica |
| `getMemberAvailability` | 56 | 0 | — (dep GetUserAvailability DI) | **PORTAR 11.5** | usado em round-robin/scheduling |
| `getUserConnectedApps` | 164 | 0 | — | **PORTAR DEPOIS** | grande; baixa prioridade |
| `getInternalNotesPresets` | 33 | 0 | — | **PORTAR DEPOIS** | feature de notas internas, não crítica |
| `updateInternalNotesPresets` | 96 | 0 | — | **PORTAR DEPOIS** | idem |
| `addMembersToEventTypes` | 47 | 0 | `eventTypes.setHosts` (custom, parcial) | **REVISAR 11.6** | bulk add; setHosts cobre 1 event |
| `removeHostsFromEventTypes` | 55 | 0 | `eventTypes.setHosts` (custom) | **REVISAR 11.6** | idem |
| `getManagedEventUsersToReassign` | — | — | — (sem handler próprio: router externo) | **NÃO VERIFICADA** | vem de spread de managed-events; conferir |
| `managedEventManualReassign` | — | — | — (idem) | **PORTAR 11.6** | managed events |
| `managedEventReassign` | — | — | — (idem) | **PORTAR 11.6** | managed events |
| `getRoundRobinHostsToReassign` | — | — | — (idem) | **PORTAR 11.5** | round robin |
| `roundRobinManualReassign` | — | — | — (idem) | **PORTAR 11.5** | round robin |
| `roundRobinReassign` | — | — | — (idem) | **PORTAR 11.5** | round robin |
| `getActiveUserBookings` | 127 | **16** | — | **IGNORAR — BILLING** | mede assentos p/ cobrança |
| `getActiveUserBreakdown` | 99 | **18** | — | **IGNORAR — BILLING** | idem |
| `getSubscriptionStatus` | 88 | **27** | — | **IGNORAR — BILLING** | status assinatura Stripe |
| `hasActiveTeamPlan` | 68 | **21** | **stub custom no fork** | **PRESERVAR (stub)** | fork já tem `hasActiveTeamPlan.handler.ts` sem billing |
| `getUpgradeable` | 44 | 5 | — | **IGNORAR — BILLING** | upsell de plano |
| `listInvoices` | 136 | **40** | — | **IGNORAR — BILLING** | faturas Stripe |
| `skipTeamTrials` | 57 | **18** | — | **IGNORAR — BILLING** | trial SaaS |
| `skipTrialForTeam` | 96 | **23** | — | **IGNORAR — BILLING** | trial SaaS |

### Resumo da triagem (35 procedures)

| Decisão | Qtd | Procedures |
|---|---|---|
| **PORTAR 11.1** (convites) | 5 | listInvites, deleteInvite, setInviteExpiration, resendInvitation, inviteMemberByToken |
| **PORTAR 11.2** (membership) | 3 | updateMembership(revisar), hasTeamMembership, getMembershipbyUser |
| **PORTAR 11.3** (permissão) | 1 | hasEditPermissionForUser |
| **PORTAR 11.4** (listagem) | 1 | listSimpleMembers (revisar contrato) |
| **PORTAR 11.5** (round robin) | 4 | getRoundRobinHostsToReassign, roundRobin(Manual)Reassign, getMemberAvailability |
| **PORTAR 11.6** (managed events + hosts bulk) | 5 | managedEvent*, getManagedEventUsersToReassign, add/removeMembersToEventTypes |
| **PORTAR DEPOIS** | 3 | getUserConnectedApps, get/updateInternalNotesPresets |
| **JÁ COBERTA (custom)** | 5 | changeMemberRole, acceptOrLeave, get, listOwnedTeams, legacyListMembers |
| **PRESERVAR (stub)** | 1 | hasActiveTeamPlan |
| **IGNORAR — BILLING** | 7 | getActiveUserBookings/Breakdown, getSubscriptionStatus, getUpgradeable, listInvoices, skipTeamTrials, skipTrialForTeam |

**Conclusão-chave:** das 35 "faltantes" nominais, só **~19 são capacidade real
faltante** para o escopo ALLGED; 5 já cobertas por custom, 1 preservar como stub,
7 são billing puro. A intuição do GAP estava certa, mas 40% da lista era ruído
nominal — exatamente o que a triagem deveria filtrar.

## Grupos por capacidade (ordem sugerida, ajustada ao pedido do dono)

- **11.1 Convites** — valor: owner/admin gerencia convites pendentes. Pré-req: modelo `VerificationToken` com `teamId`/`expires` (já existe, fork usa em `getById`/`createInvite`). Risco: baixo (tabela já existe). Testes REF: `get.handler.test.ts` (referência de padrão).
- **11.2 Memberships e roles** — pré-req: 11.1 estável.
- **11.3 Permissões e proteção do último owner** — o fork já tem `assertCanChangeOwner` no `_router.tsx`; formalizar.
- **11.4 Listagens** — `listSimpleMembers` só se alguma tela nova precisar (0 consumer hoje).
- **11.5 Round robin** / **11.6 Managed events** — depois de membership sólido; dependem de handlers que vêm por spread (não confirmados nesta passada).
- **11.7 Limpeza de stubs + `python3 scripts/parity_procedures.py`** para fechar a matriz.

## ✅ Sprint 11.1A ENTREGUE (2026-07-11)

3 procedures aditivas no router custom, lógica em `invites.ts` (testável),
15 testes unit passando, tsc do pacote trpc limpo (0 erros). Router custom
intacto (17 consumers preservados). `viewer.teams`: 21→24 procedures no fork.

- `listInvites({teamId})` — owner/admin listam convites pendentes do time
  (memberships accepted=false + invite links), **sem** expor `token`.
- `deleteInvite({teamId, membershipId?|tokenId?})` — revoga convite pendente;
  só pendente; IDOR cross-team bloqueado.
- `setInviteExpiration({teamId, tokenId, expiresInDays})` — ajusta expiração do
  link; `0 = expira agora` (ação explícita); não troca o token.

Diferença vs REF registrada: REF `listInvites` é do USUÁRIO (= `listPendingInvites`
custom, já existia); REF `deleteInvite`/`setInviteExpiration` identificam por
`token` bruto — a versão do fork usa `id` interno (mais seguro, alinhado à regra
"não expor token"). Detalhe: `docs/sprints/SPRINT-11.1A-FECHAMENTO.md`.

## Plano da PRIMEIRA fatia — Sprint 11.1A (criação/listagem/admin de convites)

Divisão adotada (o fluxo completo passa de 10 arquivos/500 linhas):
- **11.1A** (esta): `listInvites`, `deleteInvite`, `setInviteExpiration` — lado do TIME (owner/admin lista, revoga, ajusta expiração de convites pendentes). NÃO inclui envio (fork já tem `inviteMember`/`createInvite`) nem aceitação por token.
- **11.1B** (próxima): `inviteMemberByToken` + página `/teams?token=` — leitura por token e aceitação.
- **11.1C** (se necessário): `resendInvitation` (dep pesada de email-service).

### 11.1A — contrato pré-implementação

**Procedures a adicionar ao router custom (SEM remover nada):**
1. `listInvites({ teamId })` → convites pendentes (membership `accepted=false`) + tokens do time. Só ADMIN/OWNER.
2. `deleteInvite({ teamId, membershipId | token })` → remove convite pendente. Só ADMIN/OWNER.
3. `setInviteExpiration({ teamId, token, expiresInDays })` → ajusta `VerificationToken.expires`. Só ADMIN/OWNER.

**Arquivos a MODIFICAR (1):**
- `packages/trpc/server/routers/viewer/teams/_router.tsx` — 3 procedures novas usando os helpers já existentes no arquivo (`getMembershipOrThrow`, `canManageMembers`). Reusa padrão local, NÃO importa PermissionCheckService do REF (evita dep nova).

**Arquivos a CRIAR (0 no core; 1 de teste):**
- `packages/trpc/server/routers/viewer/teams/invites.test.ts` — unit dos guards.

**Contratos que devem permanecer compatíveis:** todos os 17 consumers listados acima. As 3 novas são aditivas.

**Migrations:** nenhuma (`VerificationToken` já tem `teamId`, `expires`, `expiresInDays` — usados hoje por `getById`).

**Billing/Stripe/Enterprise:** nenhum import. Guards por `MembershipRole` local, não PBAC.

**Riscos:** (1) `deleteInvite` precisa garantir que o convite pertence ao `teamId` (evitar IDOR entre times); (2) não deletar membership `accepted=true` (só pendente); (3) não expor email/token de convite a não-admin.

**Segurança a confirmar nos testes:**
- só owner/admin lista/revoga/expira ✅
- membro comum → FORBIDDEN ✅
- convite de outro time → NOT_FOUND (isolamento) ✅
- não remove membership aceita ✅

**Testes mínimos (11.1A):** owner lista; membro comum bloqueado (FORBIDDEN); deleteInvite de convite pendente ok; deleteInvite de membership aceita rejeitado; deleteInvite cross-team NOT_FOUND; setInviteExpiration só admin.

**Limite:** 1 arquivo core + 1 teste, <500 linhas. Dentro do orçamento.

**Verificação:** `node_modules/.bin/tsc -p ...` no pacote trpc + vitest do arquivo novo + diferenciar erros novos de baseline.
