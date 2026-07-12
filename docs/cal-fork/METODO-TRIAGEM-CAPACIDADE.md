# Método de triagem por capacidade — sprints do fork

**Origem:** convergência das sprints 10–12 (2026-07-11/12), formalizada a pedido do
dono após revisão das sessões. Substitui a contagem de arquivos REF-vs-fork como
medida de trabalho.

**Princípio:** progresso se mede por *capacidades do produto que faltam*, não por
*arquivos do upstream que faltam*. O fork tem arquitetura própria (API custom, sem
PBAC enterprise, sem billing); portar por matriz nominal importa complexidade que
ninguém pediu.

## Checklist por candidato (procedure, componente, feature)

| Etapa | Pergunta | Ferramenta |
|---|---|---|
| 1. Consumer Discovery | Quem realmente usa/usaria esse código? | grep por importadores (estáticos **e** dinâmicos), fora do próprio diretório |
| 2. Runtime Reachability | Alguma rota/página viva chega nele? | seguir do `page.tsx` até o componente; probe HTTP se preciso |
| 3. API Mapping | O gap é endpoint faltando ou arquitetura divergente? | comparar contrato fork vs REF antes de copiar qualquer coisa |
| 4. ROI | Implementar, adaptar ou remover? | ver casos de referência abaixo |
| 5. Validation | typecheck, testes, parity gate, doc atualizado | `tsc --noEmit`, vitest, `scripts/parity_own_surface.py` |

## Casos de referência (calibração da etapa 4)

- **ReassignDialog** (implementar): componente ativo, alcançável por rota viva,
  mutations em stub esperando endpoint, serviços de backend já restaurados.
  Só faltava o fio → wiring em `14301649e3`. ROI máximo.
- **UserTable** (remover): 6 arquivos com stubs idênticos aos do ReassignDialog,
  mas **zero importadores** — a rota `/members` renderiza outro componente que já
  funciona. Sobra de porte abandonado → deletado em `01182a9ebe` (~2700 linhas).
  Implementar os endpoints teria sido trabalho para código que ninguém executa.
- **12.4/12.5 organizations** (não portar): handlers cujo único consumer no REF
  era exatamente a árvore morta acima. API sem chamador → ignorado (`2ce8660a95`).

A lição transversal: **stub de mutation não significa "gap real"**. Significa
"alguém interrompeu um porte aqui" — pode ter sido substituído por outro caminho.
A etapa 1 distingue os dois casos em minutos.

## Pre-flight de remoção (antes de deletar código "morto")

1. Imports estáticos: grep por caminho e por símbolo exportado, repo inteiro.
2. Imports dinâmicos/lazy: `import(`, `next/dynamic`, strings de caminho.
3. Testes, Storybook, docs internas: nenhuma referência restante (excluir o
   snapshot REF congelado em `docs/cal-fork/cal-diy-opensource/` da busca — e
   lembrar que ele está fora do glob de testes desde `01182a9ebe`).
4. Rotas futuras: se algum plano registrado (triagem, GAP report) depende do
   código, documentar a decisão antes de remover — git history preserva, mas a
   intenção precisa ficar escrita.

Se um arquivo da árvore morta tem consumidores legítimos (caso `DisplayInfo.tsx`),
mover para fora **no mesmo commit** da remoção, com o import do consumidor
atualizado — nunca deixar em dois lugares.

## Armadilhas de verificação já pagas (não repetir)

- `tsc` limpo ≠ build de produção limpo: fronteira client/server do Next só
  aparece no `next build` (caso `"use client"` do widgets, `0ba7ebc2dd`).
- Lazy import não tira módulo do grafo do Turbopack — o boundary corta onde há
  diretiva `"use client"`, não onde há `await import()`.
- `docker compose build ... | tail` engole o exit code do build (pipe retorna o
  exit do tail). Capturar `$?` do build direto.
- Testes que passam podem estar rodando 2x (ou contra a cópia errada) — conferir
  os caminhos dos arquivos no output do runner.
