# Sprint 11.1B — Fechamento (2026-07-11)

**Escopo:** convite de time por link/token. Sem billing, sem email resend, sem refatorar membership/roles.

## Entregue

| Procedure | Tipo | Regra |
|---|---|---|
| `viewer.teams.createInvite({teamId, token?})` | mutation | owner/admin cria/reusa link real de 7 dias |
| `viewer.teams.getInviteByToken({token})` | query | usuário autenticado visualiza convite válido |
| `viewer.teams.inviteMemberByToken({token, creationSource?})` | mutation | usuário autenticado vira membership pendente `MEMBER` |

Também foi preservado `?token=` no redirect de `/teams` para login e consumido no server quando o usuário já está autenticado:
`/teams?token=abc` → cria membership pendente quando válido → `/teams`.

## Regras

- token expirado ou inexistente → `NOT_FOUND`
- token sem `teamId` ou de organização → `NOT_FOUND` nesta fatia de teams
- membership já existente ou pendente → `FORBIDDEN`
- `createInvite` exige owner/admin via membership do time
- link novo cria `VerificationToken` com `identifier=invite-link-for-teamId-${teamId}`, `expiresInDays=7` e `teamId`

## Validação

| Comando | Resultado |
|---|---|
| `node_modules/.bin/vitest run packages/trpc/server/routers/viewer/teams/invites.test.ts` | 22 passed |
| `node_modules/.bin/tsc --noEmit --project packages/trpc/tsconfig.json` | exit=0 |
| `node_modules/.bin/biome check --write ...` | exit=0, warnings nursery/preexistentes |
| `node_modules/.bin/tsc --noEmit --project apps/web/tsconfig.json` | falha baseline fora da fatia; filtro dos arquivos tocados sem erro local esperado |

## Paridade

`docs/cal-fork/PARITY-PROCEDURES.md` regenerado:

- `viewer.teams`: 24→26 procedures no fork
- faltantes em teams: 32→31
- faltantes total: 76→75
- `getInviteByToken` aparece como extra custom do fork

## Segurança / decisão de design (revisão pós-implementação)

Implementado pelo Codex (GPT-5.5), **revisado e validado independentemente** antes do commit.

- **Consumo do token no server render de `/teams?token=`**: levantei que isso é uma
  mutação (cria membership) dentro de um GET, com potencial de disparo por prefetch.
  **Verificado contra o REF** (`.../(main-nav)/teams/server-page.tsx:48-52`): o
  upstream cal.com faz exatamente isso — `TeamService.inviteMemberByToken(token, userId)`
  no server component, criando membership pendente. Decisão: **manter (espelha upstream)**.
  Mitigantes reais: (a) o link de convite chega por email/externo, não é um `<Link>`
  prefetchável do Next; (b) cria `accepted=false` (pendente, exige aceite posterior),
  reversível; (c) `getTeamInviteByToken` valida expiração/org/teamId e nunca expõe o token.
- **`getTeamInviteByToken` é leitura sem dados sensíveis**: retorna só `{team:{id,name,slug}, expires}`,
  nunca o `token`.
- **Idempotência**: membership já existente → `FORBIDDEN`; token inválido/expirado → `NOT_FOUND`,
  engolido na página para não quebrar `/teams`.

## Transferido

- **11.1C**: `resendInvitation` (dep pesada de email-service) + feedback de UI explícito
  para token inválido/expirado (o REF mostra `teamNameFromInvite`/`errorMsgFromInvite`;
  hoje a página só ignora e renderiza `/teams`) + suporte a `?autoAccept=true` como no REF.
