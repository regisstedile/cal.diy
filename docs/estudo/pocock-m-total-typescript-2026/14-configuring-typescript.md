---
title: "14. Configuring TypeScript"
book: "[[_INDEX]]"
tags: [book, typescript, tsconfig, compiler]
created: 2026-05-23
---

# 14. Configuring TypeScript

## Ideia Central

Configuração TypeScript define o contrato de rigor do projeto. Em app pequeno, `tsconfig` parece detalhe; em monorepo enterprise, ele controla compatibilidade entre pacotes, build, JSX, resolução de módulos e geração de declarações.

## Tópicos

- `target`
- `esModuleInterop`
- `isolatedModules`
- strictness options
- `noUncheckedIndexedAccess`
- `module`: `NodeNext` vs `Preserve`
- `noEmit`
- source maps
- declaration files
- declaration maps
- JSX
- múltiplos `tsconfig.json`
- `extends`
- `--project`
- project references

## Aplicação no cal-diy

Estudar:

- `apps/web/tsconfig.json`
- `apps/api/v2/tsconfig.json`
- `apps/api/v2/tsconfig.build.json`
- `packages/tsconfig`
- scripts `type-check` e `type-check:ci` no `package.json`

## Checklist Operacional

- Identificar configuração base compartilhada.
- Ver quais apps emitem JS e quais só fazem typecheck.
- Ver se `strict` está ativo e quais exceções existem.
- Ver como Next.js, API e packages resolvem paths internos.
