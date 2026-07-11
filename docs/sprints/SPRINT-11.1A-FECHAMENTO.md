# Sprint 11.1A — Fechamento (2026-07-11)

**Escopo:** administração autenticada de convites de time (owner/admin) —
listar, revogar, alterar expiração. Sem envio, sem token público, sem
aceitação, sem membership/roles, sem billing.

## Procedures adicionadas (aditivas ao router custom)

| Procedure | Tipo | Autorização | Isolamento |
|---|---|---|---|
| `viewer.teams.listInvites({teamId})` | query | owner/admin (`getMembershipOrThrow`+role) | escopo `teamId` |
| `viewer.teams.deleteInvite({teamId, membershipId?\|tokenId?})` | mutation | owner/admin | membership `accepted=false` e do teamId; token do teamId |
| `viewer.teams.setInviteExpiration({teamId, tokenId, expiresInDays})` | mutation | owner/admin | token do teamId |

Lógica em `packages/trpc/server/routers/viewer/teams/invites.ts` (funções puras
`listTeamInvites`/`deleteTeamInvite`/`setTeamInviteExpiration`), procedures no
`_router.tsx` só resolvem membership e delegam.

## Regras de autorização/segurança confirmadas

- só OWNER/ADMIN lista/revoga/expira (member comum → `FORBIDDEN`, antes de qualquer query)
- `listInvites` **nunca** seleciona `VerificationToken.token` (teste verifica o `select`)
- identificador exposto é `id` interno, não o token bruto (melhora sobre o REF)
- `deleteInvite` só remove membership **pendente** (`accepted=false`) — membership aceita → `NOT_FOUND`
- IDOR cross-team bloqueado: query sempre filtra por `teamId` do caller (token/membership de outro time → `NOT_FOUND`)
- `deleteInvite` exige exatamente um de membershipId/tokenId (zod refine + guard na função) → senão `BAD_REQUEST`
- `setInviteExpiration` não altera o token; `expiresInDays=0` = expira agora (ação explícita, testada à parte); range 0–365

## Contratos preservados (não quebrados)

Router custom intacto. 17 consumers de `viewer.teams.*` (getById 12×, list 7×,
update, eventTypes.*, listMembers, inviteMember, removeMember, publish,
listPendingInvites, listForUser, delete, create, updateMemberRole,
declineInvite, createInvite, checkIfMembershipExists, acceptInvite) inalterados.
Nenhuma procedure removida ou com assinatura alterada. Zero import de billing/PBAC/REF.

## Testes

`packages/trpc/server/routers/viewer/teams/invites.test.ts` — **15 testes, todos ✅**
(`vitest run`, 30ms):
- listInvites: owner ok, admin ok, member FORBIDDEN, não seleciona token, marca expirados
- deleteInvite: owner revoga pendente, member FORBIDDEN, não revoga aceita (NOT_FOUND),
  IDOR outro time (NOT_FOUND), nenhum id (BAD_REQUEST), ambos ids (BAD_REQUEST)
- setInviteExpiration: owner futura, expiresInDays=0 imediato, member FORBIDDEN, IDOR outro time

Padrão: `prismaMock` (mesmo dos testes existentes do fork). Lógica extraída para
funções puras porque `authedProcedure`/`isAuthed` exigem sessão completa —
testar a lógica de autorização direto é mais robusto que mockar sessão.

## Validação (comandos + exit codes)

| Comando | Resultado |
|---|---|
| `vitest run .../teams/invites.test.ts` | **15 passed** |
| `tsc --noEmit` (pacote `packages/trpc`) | **exit=0, 0 erros** (pacote inteiro; baseline já era 0 → sem erro novo) |
| `biome check --write` (3 arquivos) | limpo (1 warning pré-existente de estilo, 0 erro) |

**Erros novos provocados pelo diff:** 0. **Erros pré-existentes no pacote trpc:** 0
(baseline limpo). Sem ambiguidade.

## Paridade antes/depois

| Métrica | Antes | Depois |
|---|---|---|
| `viewer.teams` procedures no fork | 21 | **24** |
| Procedures faltando (teams) | 35 | **32** |
| Procedures faltando (total) | 79 | **76** |

(`docs/cal-fork/PARITY-PROCEDURES.md` regenerado.)

## Diff

3 arquivos, +414/−12. Produção: `_router.tsx` (+95, delega) + `invites.ts` (+145,
novo). Teste: `invites.test.ts` (+174). Dentro do limite (2 arquivos de produção,
<500 linhas de código de produção: ~240).

## Limitações restantes / transferido

- **11.1B**: `inviteMemberByToken` + página `/teams?token=` (leitura pública + aceitação).
- **11.1C**: `resendInvitation` (dep pesada de email-service).
- `listInvites` do fork ≠ `listInvites` do REF (este é do usuário) — a matriz conta
  por nome; ambas as capacidades coexistem.
- Sem frontend nesta fatia (procedures prontas para a UI de convites da 11.1B/futuro).

## Commit / push / working tree

- Commit: (ver git log — `feat(teams): sprint 11.1A ...`)
- Push: `fork/deploy`
- Working tree: limpo após commit

## Decisão: **ENCERRADA**

Fluxo administrativo de convites completo e isolado por time (o risco central
desta área — isolamento cross-team — coberto por teste). 11.1B não inicia antes
deste fechamento.
