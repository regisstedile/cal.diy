---
title: "Total TypeScript: The Essentials"
author: "Matt Pocock; Taylor Bell"
year: 2026
tags: [book, typescript, programacao, desenvolvimento, educacao]
created: 2026-05-23
source_pdf: "/home/regis/Pocock M. - Total Typescript - 2026.pdf"
pages: 545
publisher: "No Starch Press"
---

# Total TypeScript: The Essentials

## Estado da Organização

- **PDF analisado:** `/home/regis/Pocock M. - Total Typescript - 2026.pdf`
- **Páginas:** 545
- **Autores:** Matt Pocock com Taylor Bell
- **Editora:** No Starch Press
- **Status:** índice completo mapeado; capítulos 1-12 já tinham notas preliminares; capítulos 13-16 foram adicionados; falta enriquecer cada capítulo com exemplos próprios.

## Índice

### Parte I — Getting Started

- [[01-kickstart-your-typescript-setup|1. Kickstart Your TypeScript Setup]]
- [[02-ide-superpowers|2. IDE Superpowers]]
- [[03-typescript-in-the-development-pipeline|3. TypeScript in the Development Pipeline]]

### Parte II — Fundamentals

- [[04-essential-types-and-annotations|4. Essential Types and Annotations]]
- [[05-unions-literals-and-narrowing|5. Unions, Literals, and Narrowing]]

### Parte III — Objects, Classes, and Mutability

- [[06-objects-classes-and-mutability|6. Objects]]
- [[07-mutability|7. Mutability]]
- [[08-classes|8. Classes]]
- [[09-typescript-only-features|9. TypeScript-Only Features]]

### Parte IV — Working With the Compiler

- [[10-deriving-types|10. Deriving Types]]
- [[11-annotations-and-assertions|11. Annotations and Assertions]]
- [[12-the-weird-parts|12. The Weird Parts]]

### Parte V — Understanding the Environment

- [[13-modules-scripts-and-declaration-files|13. Modules, Scripts, and Declaration Files]]
- [[14-configuring-typescript|14. Configuring TypeScript]]

### Parte VI — Advanced Application Development

- [[15-designing-your-types|15. Designing Your Types]]
- [[16-building-powerful-shared-utilities|16. Building Powerful Shared Utilities]]

### Aplicação no Projeto Real

- [[90-plano-estudo-cal-diy-enterprise|Plano de Estudo: cal-diy Enterprise com TypeScript]]

## Conceitos Atômicos

- [[atomic/type-inference|Type Inference]]
- [[atomic/discriminated-unions|Discriminated Unions]]
- [[atomic/readonly|Readonly]]
- [[atomic/enums|Enums]]
- `keyof`
- `typeof` em tipos
- `satisfies`
- `as const`
- `unknown` vs `any`
- `never`
- index signatures
- `Record`
- utility types: `Partial`, `Required`, `Pick`, `Omit`
- declaration files
- module augmentation
- `tsconfig.json`
- strictness options
- template literal types
- conditional types
- mapped types
- generic functions
- type predicates
- assertion functions
- overloads

## Estratégia de Estudo Recomendada

1. Ler capítulo curto.
2. Criar exemplo mínimo em TypeScript.
3. Encontrar uso real equivalente no `cal-diy`.
4. Escrever nota com: conceito, exemplo isolado, exemplo real, risco comum.
5. Rodar typecheck/teste focado quando aplicável.

## Referências Locais

- Curso relacionado: `/home/regis/vault/Cursos/frontendmasters---typescript-5-fundamentals`
- Código real: `/home/regis/stack/cal-diy`
