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

## Fase D pegou um bug antes do commit (valor do protocolo)

Ao type-checkar, `updateMembership` falhou: `disableImpersonation` não existe no
tipo do Prisma Client. Investigação (Fase D):
- coluna **existe** em `schema.prisma:519` mas **NÃO existe no banco `cal_src`**
  (query em `information_schema.columns` retornou vazio);
- o client TS gerado também não a conhece → schema nunca foi `generate`+`migrate`.

Conclusão: portar `updateMembership` agora entregaria uma escrita que quebra em
runtime. **Removida da fatia** (exigiria migration, fora do escopo). Sem o
type-check da Fase F, isso teria sido commitado quebrado — exatamente o tipo de
erro que o gate D/F existe para pegar. Transferido para quando o campo
`disableImpersonation` for aplicado (migration/db push), aí `updateMembership`
volta como fatia própria.

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

- **`updateMembership`** — bloqueado por schema drift (`disableImpersonation` no
  schema mas não no banco). Volta como fatia própria APÓS aplicar o campo.
- **Achado de infra a registrar:** o `schema.prisma` do fork tem pelo menos 1
  campo (`Membership.disableImpersonation`) não aplicado ao banco `cal_src` — vale
  um `prisma migrate diff` completo para achar outros drifts antes que virem bug.
- 11.3 permissão (`hasEditPermissionForUser` + proteção do último owner)
- 11.1C resend + UI feedback

## Decisão: **ENCERRADA (2 de 3; updateMembership transferido com causa registrada)**
