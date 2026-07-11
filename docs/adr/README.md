# Architecture Decision Records (ADRs)

Decisões arquiteturais documentadas. Cada ADR registra **o contexto**, **a decisão**
e **as consequências** — incluindo os trade-offs negativos.

0001–0005 são de **arquitetura de código do cal.diy**. 0006+ são decisões de
**processo/escopo/plataforma** (várias transversais a todos os projetos — ver
coluna Escopo). Todas vivem aqui por ser repo versionado; as transversais espelham
para `/home/regis/OPS/` quando este virar git.

## Índice

| # | Decisão | Status | Escopo |
|---|---|---|---|
| [0001](0001-vertical-slice-architecture.md) | Vertical Slice Architecture como estrutura base | ✅ Aceito | Cal.diy |
| [0002](0002-trpc-como-boundary.md) | tRPC como boundary entre backend e frontend | ✅ Aceito | Cal.diy |
| [0003](0003-di-container-ioctopus.md) | Dependency Injection com @evyweb/ioctopus | ✅ Aceito | Cal.diy |
| [0004](0004-repository-pattern.md) | Repository Pattern com interfaces explícitas | ✅ Aceito | Cal.diy |
| [0005](0005-separacao-features-modules.md) | Separação packages/features vs apps/web/modules | ✅ Aceito | Cal.diy |
| [0006](0006-fetch-first-remote-source-of-truth.md) | Git remoto é fonte de verdade; fetch antes de afirmar sync | ✅ Aceito | Todos |
| [0007](0007-sql-server-only-no-sqlite.md) | SQL Server é o único dialeto; SQLite proibido | ✅ Aceito | ADMCOPY/MSSQL |
| [0008](0008-allged-scope-excludes-enterprise-saas.md) | Escopo ALLGED exclui billing/AI Phone/SCIM/Platform | ✅ Aceito | Cal.diy |
| [0009](0009-upstream-first-on-ambiguity.md) | Em ambiguidade, seguir o upstream cal.com | ✅ Aceito | Cal.diy |
| [0010](0010-audit-protocol-mandatory.md) | Protocolo de auditoria A–H obrigatório | ✅ Aceito | Todos |
| [0011](0011-dual-metrics-coverage-readiness.md) | Métricas = cobertura auditada × prontidão | ✅ Aceito | Todos |
| [0012](0012-git-worktree-per-agent.md) | Trabalho multi-agente usa git worktree por agente | ✅ Aceito | Todos |

## Como Criar um Novo ADR

Copie o template abaixo para `docs/adr/XXXX-nome-da-decisao.md`:

```markdown
# ADR-XXXX: Título

**Status**: Proposto | Aceito | Depreciado | Substituído por ADR-XXXX
**Data**: AAAA-MM

## Contexto
Por que essa decisão foi necessária. Qual problema existe.

## Decisão
O que foi decidido. Como funciona.

## Consequências
**Positivas:** o que fica melhor
**Negativas:** trade-offs aceitos
```

## Regras

- ADR é **imutável** após aceito — não editar, criar novo que substitui
- Decisões de "como fazer" (estilo, linting) vão em `agents/rules/`, não em ADRs
- ADRs documentam PORQUÊ, não COMO — o código documenta o como
