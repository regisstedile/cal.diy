# Sprint 11.2 — Fechamento (2026-07-11)

**Escopo:** membership self-service (usuário na própria membership). Sem admin
gerenciando outros, sem roles, sem billing.

**Entregue 2 de 3** — `updateMembership` bloqueado por schema drift (ver Fase D).

## Procedures adicionadas (aditivas ao router custom)

| Procedure | Tipo | Regra |
|---|---|---|
| `viewer.teams.hasTeamMembership()` | query | booleano: caller tem alguma membership de time (via `MembershipRepository.hasAnyTeamMembershipByUserId`, já no fork) |
| `viewer.teams.getMembershipbyUser({teamId, memberId})` | query | **self-only**: `memberId ≠ caller` → `UNAUTHORIZED` |
| ~~`updateMembership`~~ | — | **NÃO entregue** — depende de coluna ausente no banco (abaixo) |

Lógica self-only em `membership.ts` (`getOwnMembership`), testável sem session
middleware. `hasTeamMembership` é inline (trivial, sem input).

## Fase D/F pegou um bug antes do commit (valor do protocolo)

Ao type-checkar, `updateMembership` falhou: `disableImpersonation` não existe no
tipo do Prisma Client. **Removida da fatia** — sem o type-check da Fase F isso
teria sido commitado quebrado.

**Causa (corrigida após auditoria de drift, `docs/cal-fork/SCHEMA-DRIFT-AUDIT.md`):**
minha primeira explicação — "coluna no schema mas não no banco" — estava imprecisa.
O correto: `schema.prisma:519` (`disableImpersonation`) é do model **User**, não
Membership. O **fork removeu** impersonation do model Membership (só User tem;
banco e schema do Membership concordam, sem drift). Portar o `updateMembership` do
REF exigiria readicionar o campo ao model Membership + migration — **decisão de
produto**, não correção de drift. A decisão (não portar) segue certa; a causa foi
corrigida no código (`membership.ts`) e aqui. Exemplo de Fase C funcionando:
reverificar derrubou minha própria hipótese inicial.

## Espelha o REF

REF `getMembershipbyUser` faz `UNAUTHORIZED` quando `ctx.user.id !== memberId`
(ADR-0009 upstream-first). Idêntico aqui.

## Segurança confirmada (testes)

- caller vê só a própria membership; `memberId` de terceiro → `UNAUTHORIZED`
  antes de qualquer query

## Validação

| Comando | Resultado |
|---|---|
| `vitest run .../teams/membership.test.ts` | **2 passed** |
| `tsc --noEmit` (pacote `packages/trpc`) | exit=0, 0 erros (baseline já 0 → 0 novos) |
| `biome check --write` | limpo |

Erros novos: 0. Baseline trpc: 0. (O erro de `updateMembership` foi resolvido
removendo a procedure, não mascarado.)

## Paridade antes/depois

| Métrica | Antes | Depois |
|---|---|---|
| `viewer.teams` procedures no fork | 26 | **28** |
| Faltando (teams) | 31 | **29** |
| Faltando (total) | 75 | **73** |

## Diff

Produção: `_router.tsx` (+2 procedures) + `membership.ts` (novo). Teste:
`membership.test.ts`. 2 arquivos de produção, <500 linhas.

## Transferido

- **`updateMembership`** — incompatível com o model Membership do fork (sem
  `disableImpersonation`). Volta só se for decisão de produto readicionar o campo.
- **Auditoria de drift feita** (`docs/cal-fork/SCHEMA-DRIFT-AUDIT.md`): banco vs
  schema tem só 1 drift, benigno (`App_RoutingForms_FormResponse.uuid` DB-default
  redundante). Nenhum drift bloqueante. Meu alarme inicial era falso positivo.
- 11.3 permissão (`hasEditPermissionForUser` + proteção do último owner)
- 11.1C resend + UI feedback

## Decisão: **ENCERRADA (2 de 3; updateMembership transferido com causa registrada)**
