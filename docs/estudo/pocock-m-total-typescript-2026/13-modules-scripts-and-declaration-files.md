---
title: "13. Modules, Scripts, and Declaration Files"
book: "[[_INDEX]]"
tags: [book, typescript, modules, declaration-files]
created: 2026-05-23
---

# 13. Modules, Scripts, and Declaration Files

## Ideia Central

Este capítulo explica como TypeScript entende arquivos como módulos ou scripts e como arquivos `.d.ts` descrevem JavaScript existente, globais e bibliotecas externas.

## Tópicos

- Modules têm escopo local.
- Scripts têm escopo global.
- TypeScript tenta inferir pelo uso de `import`/`export`.
- `moduleDetection` pode forçar comportamento.
- Declaration files descrevem tipos sem implementação.
- `declare` permite tipar globais, módulos e APIs externas.
- Module augmentation adiciona tipos a módulos existentes.
- `skipLibCheck` evita checar declarações de dependências, mas pode esconder problemas.

## Aplicação no cal-diy

Estudar:

- `apps/web/next-env.d.ts`
- `apps/web/app/_types.ts`
- arquivos `*.d.ts` gerados por frameworks
- tipos vindos de pacotes internos em `packages/*`

## Perguntas de Estudo

- Onde o repo depende de tipos globais?
- Quais módulos expõem tipos públicos para outros pacotes?
- Há uso de module augmentation?
- Quais arquivos são implementação real e quais são só descrição de tipos?
