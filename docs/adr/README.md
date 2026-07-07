# Architecture Decision Records (ADRs)

Decisões arquiteturais do cal-diy documentadas. Cada ADR registra **o contexto**, **a decisão** e **as consequências** — incluindo os trade-offs negativos.

## Índice

| # | Decisão | Status |
|---|---|---|
| [0001](0001-vertical-slice-architecture.md) | Vertical Slice Architecture como estrutura base | ✅ Aceito |
| [0002](0002-trpc-como-boundary.md) | tRPC como boundary entre backend e frontend | ✅ Aceito |
| [0003](0003-di-container-ioctopus.md) | Dependency Injection com @evyweb/ioctopus | ✅ Aceito |
| [0004](0004-repository-pattern.md) | Repository Pattern com interfaces explícitas | ✅ Aceito |
| [0005](0005-separacao-features-modules.md) | Separação packages/features vs apps/web/modules | ✅ Aceito |

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
