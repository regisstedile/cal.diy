---
title: "Matriz de fontes de estudo"
tags: [typescript, react, matriz, estudo]
created: 2026-05-23
---

# Matriz de fontes de estudo

## Ranking prático

| Prioridade | Fonte | Papel na trilha | Uso recomendado |
|---|---|---|---|
| 1 | `pocock-m-total-typescript-2026` / `typescript/livro-total-typescript-essentials` | Base forte de TypeScript moderno | Trilha principal para tipos, narrowing, deriving types, config e utilities |
| 2 | `rippon-carl-learn-react-with-typescript...` / `typescript/livro-react-typescript-rippon` | React + TypeScript + Next.js | Usar para `apps/web`, Server/Client Components, forms, TanStack Query e testes |
| 3 | Frontend Masters TypeScript 5+ Fundamentals | Reforço de fundamentos | Usar para consolidar mental model: tipos estruturais, unions, generics, narrowing |
| 4 | Frontend Masters React and TypeScript v2 | React prático com TS | Usar para props, children, state, reducers, context, polymorphic components |
| 5 | `typescript-2025` / Practical TypeScript 2025 | Checklist de robustez | Usar como revisão: evitar `any`, assertions, wrappers, confusão type/value |
| 6 | `typescript-20251` | Fundamentos introdutórios | Usar só para lacunas básicas: interfaces, classes, ambiente |
| 7 | `evocomm-typescript---2025` | Complementar curto | Baixa prioridade; índice pequeno e conteúdo sobrepõe outras fontes |

## O que é melhor para agora

A melhor sequência para estudar o código enterprise do `cal-diy` é:

1. Total TypeScript Essentials: construir base de tipos e configuração.
2. React with TypeScript: aplicar em `apps/web` e App Router.
3. Frontend Masters React+TS: praticar padrões de componentes, reducers e context.
4. Practical TypeScript: revisar riscos, `any`, assertions e tipos estruturais.
5. Cursos introdutórios: usar apenas quando algum conceito básico travar.

## Redundâncias detectadas

- `typescript-2025` e `typescript/livro-practical-typescript-2025` parecem duplicar o mesmo material em locais diferentes.
- `pocock-m-total-typescript-2026` e `typescript/livro-total-typescript-essentials` parecem conter a mesma organização, sendo `typescript/...` a versão limpa.
- `rippon-carl...` e `typescript/livro-react-typescript-rippon` também aparecem como bruto + normalizado.
- `Frontend MastersFrontendmasters - React and TypeScript...` ainda está como transcrição bruta; deve virar notas curtas apenas dos capítulos que mapeiam para componentes reais.

## Regra de aproveitamento

Não transformar tudo em resumo longo. Para cada fonte, extrair apenas:

- conceito;
- exemplo mínimo;
- arquivo real no `cal-diy`;
- risco que esse conceito evita;
- teste ou comando de validação.

Isso evita criar documentação bonita, mas sem utilidade operacional.
