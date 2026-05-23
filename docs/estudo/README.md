---
title: "Estudos aplicados ao cal-diy"
tags: [estudo, typescript, react, cal-diy, documentacao]
created: 2026-05-23
---

# Estudos aplicados ao cal-diy

Este diretório é o ponto de entrada para estudar TypeScript, React, Next.js e arquitetura usando o `cal-diy` como projeto real. A regra aqui é simples: material externo só vale se virar capacidade de ler, alterar, testar ou documentar o código da instância.

## Arquivos principais

- [`01-matriz-fontes.md`](01-matriz-fontes.md) — compara cursos/livros e define o que usar, o que ignorar e em que ordem.
- [`02-linha-estudo-cal-diy.md`](02-linha-estudo-cal-diy.md) — trilha prática, conectando cada fonte a partes reais do repo.
- [`03-plano-documentacao-cal-diy.md`](03-plano-documentacao-cal-diy.md) — plano para deixar o `cal-diy` totalmente documentado por módulo, fluxo e operação.
- [`typescript/README.md`](typescript/README.md) — área normalizada com notas próprias já organizadas.

## Decisão de organização

As pastas brutas continuam preservadas porque ajudam a rastrear a origem dos materiais. A pasta `typescript/` é a versão limpa para estudo contínuo. Quando um curso novo entra, ele deve ser avaliado na matriz antes de virar nota estruturada.

## Critério para dizer que um material é útil

Um material entra na trilha principal quando ajuda diretamente em pelo menos um destes pontos:

1. Entender tipos que aparecem no `cal-diy`.
2. Ler componentes React/Next sem depender de tentativa e erro.
3. Entender fronteiras runtime: API, tRPC, Zod, Prisma, webhooks.
4. Escrever teste que proteja regra de negócio real.
5. Melhorar documentação operacional ou arquitetural.

Material introdutório demais vira apoio pontual, não trilha principal.
