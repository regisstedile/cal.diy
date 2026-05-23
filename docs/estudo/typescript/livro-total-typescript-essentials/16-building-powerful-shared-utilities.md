---
title: "16. Building Powerful Shared Utilities"
book: "[[_INDEX]]"
tags: [book, typescript, generics, utilities]
created: 2026-05-23
---

# 16. Building Powerful Shared Utilities

## Ideia Central

Utilitários compartilhados precisam preservar inferência. Uma função helper boa reduz repetição sem apagar informação de tipo com `any`.

## Tópicos

- Generic functions
- Generic function type alias vs generic type
- Missing/conflicting type arguments
- Debugging inferred types
- Type parameter defaults
- Type parameter constraints
- Type predicates
- Assertion functions
- Function overloads
- Overloads vs unions

## Aplicação no cal-diy

Estudar:

- helpers em `packages/lib`
- hooks e componentes genéricos em `packages/ui`
- `QueryCell` e padrões de render por estado
- helpers de API/tRPC
- validadores que poderiam ser type predicates ou assertion functions

## Critério de Qualidade

Um helper compartilhado deve:

- preservar o tipo de entrada no retorno quando fizer sentido;
- usar `unknown` em fronteiras externas;
- evitar `any` salvo quando isolado e documentado;
- ter testes cobrindo inferência ou comportamento;
- não exigir type arguments manuais quando o compilador pode inferir.
