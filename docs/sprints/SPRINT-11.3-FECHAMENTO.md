# Sprint 11.3 — Fechamento (2026-07-11)

**Escopo:** permissão de edição entre usuários + formalização (extração + testes)
da proteção do último owner. Sem billing, sem admin de outros.

## Entregue

| Item | O quê |
|---|---|
| `viewer.teams.hasEditPermissionForUser({memberId})` | query — caller pode editar o user alvo? (compartilham time onde o caller é ADMIN/OWNER). Casca sobre `@calcom/lib/hasEditPermissionForUserID`, que já existia no fork |
| `assertNotLastOwner` (era `assertCanChangeOwner`) | **extraído** de `_router.tsx` para `ownership.ts`, agora testável direto. Comportamento idêntico; os 2 call sites (removeMember, updateMemberRole) preservados |

## Proteção do último owner — regra formalizada

Um time sempre mantém ≥1 OWNER aceito. Chamada antes de remover membro ou baixar
role → um owner não consegue se remover/rebaixar (nem a outro owner) deixando o
time sem dono. Antes vivia inline sem teste; agora é função isolada com 5 testes:

- owner único sendo removido/rebaixado → `BAD_REQUEST` (bloqueado)
- owner com outro owner presente → passa
- não-owner → no-op (nem conta owners)
- sem membership → no-op
- contagem filtra `accepted=true, role=OWNER` do time certo (query verificada)

## Segurança / comportamento preservado

Refatoração pura: `assertNotLastOwner` é byte-por-byte a lógica de
`assertCanChangeOwner`, só movida. `removeMember`/`updateMemberRole` seguem
chamando com os mesmos args. `hasEditPermissionForUser` reusa lib existente,
sem nova dependência.

## Validação

| Comando | Resultado |
|---|---|
| `vitest run .../teams/ownership.test.ts` | **5 passed** |
| `tsc --noEmit` (pacote `packages/trpc`) | exit=0, 0 erros (baseline 0 → 0 novos) |
| `biome check --write` | limpo |

## Paridade antes/depois

| Métrica | Antes | Depois |
|---|---|---|
| `viewer.teams` procedures no fork | 28 | **29** |
| Faltando (teams) | 29 | **28** |
| Faltando (total) | 73 | **72** |

## Diff

Produção: `_router.tsx` (−34 inline / +1 procedure +1 import, delega) +
`ownership.ts` (novo). Teste: `ownership.test.ts`. 2 arquivos de produção.

## Transferido

- 11.4 `listSimpleMembers` (revisar contrato; 0 consumers hoje)
- 11.5 round robin / 11.6 managed events (dependem de handlers por spread)
- 11.1C resend + UI feedback

## Decisão: **ENCERRADA**
