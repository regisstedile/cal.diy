# ADR-0001: Vertical Slice Architecture como Estrutura Base

**Status**: Aceito  
**Data**: 2026-06  
**Decisores**: Time cal-diy

---

## Contexto

O cal-diy é um fork do cal.com e precisa crescer como produto próprio. A codebase original usa uma organização por camadas técnicas espalhadas (controllers aqui, services lá, utils em outro lugar), o que torna difícil entender uma feature de ponta a ponta sem navegar por 5+ pastas.

Avaliamos duas alternativas:

1. **Layered Architecture** — separar todo o código por tipo técnico (`controllers/`, `services/`, `repositories/`)
2. **Feature-Sliced Design (FSD)** — organizar por domínio em um único app
3. **Vertical Slice Architecture (VSA)** — organizar por domínio em monorepo multi-app

## Decisão

Adotamos **Vertical Slice Architecture** adaptada para monorepo.

Cada domínio de negócio (`bookings`, `organizations`, `teams`, etc.) contém tudo que precisa — repositórios, services, tipos, testes — em uma única pasta dentro de `packages/features/[domínio]/`.

A diferença do FSD clássico: como somos um monorepo com múltiplos apps (`apps/web`, `apps/api/v2`), o domínio de negócio fica em `packages/features` (compartilhado) e a UI específica de cada app fica em `apps/web/modules` (isolada).

```
Feature "bookings" completa:

packages/features/bookings/     ← lógica de negócio (compartilhável)
  repositories/
  services/
  di/
  types.ts

apps/web/modules/bookings/      ← UI web (só para o app web)
  views/
  components/
  hooks/

apps/api/v2/modules/bookings/   ← API REST (só para a API v2)
  controllers/
  dto/
```

## Consequências

**Positivas:**
- Ler uma feature = abrir uma pasta, não navegar por 10 diretórios
- Times diferentes podem trabalhar em domínios diferentes sem conflito
- `packages/features/bookings` pode ser usado por `apps/web` E `apps/api/v2` sem duplicação
- Domínios são loosely coupled — alterar `organizations` não afeta `bookings`

**Negativas:**
- Mais pastas e arquivos que um projeto simples
- Requer disciplina para não criar dependências cruzadas entre domínios
- Onboarding mais lento: dev precisa entender a separação packages ↔ apps

## Referências

- [agents/rules/architecture-vertical-slices.md](../agents/rules/architecture-vertical-slices.md)
- [FSD — Паромов, 2023](../../docs/ESTUDOS-AVANCADOS/Паромов%20-%20FSD%20Полный%20КурС/)
- [ARQUITETURA-FSD.md](../ARQUITETURA-FSD.md)
