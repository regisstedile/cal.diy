---
title: "Практический TypeScript — Resumo"
book: "[[_INDEX]]"
tags: [book, resumo, typescript, programacao, desenvolvimento-web, javascript]
created: 2026-05-23
source_pdf: "/home/regis/Герасимов А. - Практический TypeScript - 2025.pdf"
---

# Resumo — Практический TypeScript

## Resumo Executivo

Este livro é um checklist prático de TypeScript com 83 recomendações. Ele cobre desde fundamentos, configuração e sistema de tipos até melhores práticas, tipos avançados, publicação de APIs, performance do compilador e migração gradual de JavaScript para TypeScript.

Para o `cal-diy`, ele é útil como guia de revisão de código: ajuda a identificar `any` amplo demais, assertions inseguras, aliases mal modelados, `null` espalhado, propriedades opcionais excessivas, tipos duplicados e falta de exaustividade.

## Estrutura

- **01-10:** fundamentos, relação com JavaScript, configuração, `any`, tipagem estrutural e tipos como conjuntos.
- **11-30:** sistema de tipos, `type` vs `interface`, readonly, index signatures, narrowing, inferência e estados válidos.
- **31-49:** boas práticas de domínio, `null`, unions, strings estreitas, aliases, `unknown`, safety e cobertura de tipos.
- **50-64:** generics, conditional types, template literal types, mapped types, `never`, object iteration, variadic tuples e branding.
- **65-71:** publicação, API pública, TSDoc, `this`, module augmentation e tipos exportados.
- **72-83:** ECMAScript vs TypeScript-only, source maps, runtime, DOM, testes, performance e migração gradual.

## Uso Prático no cal-diy

Aplicar como checklist em cada feature:

1. A feature usa `any` ou `as` sem encapsular o risco?
2. Os tipos são derivados de Prisma/Zod/API ou duplicados manualmente?
3. Existem estados inválidos representáveis?
4. `null`/`undefined` estão no centro do domínio ou só nas bordas?
5. O tipo público exporta tudo que aparece na API?
6. Switches sobre unions têm checagem com `never`?
7. O teste cobre comportamento e não apenas renderização?
8. A migração permite `noImplicitAny` ou ainda depende de inferência frouxa?

## Relação Com Total TypeScript

- `Total TypeScript` é mais didático e sequencial.
- `Практический TypeScript` é mais prescritivo e funciona melhor como checklist de engenharia.
- Juntos, os dois formam base teórica + revisão prática para estudar o `cal-diy` enterprise.

## Próximo Passo

Copiar este material para `docs/estudo/typescript` e usar o plano do `cal-diy` como trilha principal.

## Referência

[[_INDEX]]
