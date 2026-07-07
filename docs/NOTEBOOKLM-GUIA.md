# Guia NotebookLM — Cal-diy Architecture & Claude Code

## Documentos para Importar (em ordem)

Importe estes arquivos no NotebookLM como fontes:

| Prioridade | Arquivo | O que explica |
|---|---|---|
| 1 | `docs/ARQUITETURA-FSD.md` | Mapa completo da arquitetura |
| 2 | `docs/CLAUDE-CODE-CAL-DIY.md` | Como Claude Code é usado no projeto |
| 3 | `docs/adr/0001-vertical-slice-architecture.md` | Por que a estrutura é assim |
| 4 | `docs/adr/0002-trpc-como-boundary.md` | Por que tRPC separa tudo |
| 5 | `docs/adr/0003-di-container-ioctopus.md` | Por que DI container |
| 6 | `docs/adr/0004-repository-pattern.md` | Por que Repository pattern |
| 7 | `docs/adr/0005-separacao-features-modules.md` | A separação packages/apps |
| 8 | `AGENTS.md` | Configuração atual do projeto |

## Perguntas para o NotebookLM (Studio)

Gere o Audio Overview com estas perguntas como base de discussão:

**Sobre Arquitetura:**
- "Explique a diferença entre packages/features e apps/web/modules"
- "O que é tRPC e por que o projeto o usa como boundary?"
- "Como funciona o sistema de DI com ioctopus?"
- "O que é um Repository e por que existe uma interface separada da implementação?"

**Sobre Claude Code:**
- "Como o Claude Code está configurado neste projeto?"
- "O que são hooks do Claude Code e quais o projeto poderia usar?"
- "O que são skills e como elas ajudam o workflow?"
- "Quais MCP servers estão conectados e o que cada um faz?"

**Sobre Oportunidades:**
- "Quais features estão como stubs e precisam ser implementadas?"
- "O que melhoraria no workflow de desenvolvimento com novos hooks?"
- "Como o sistema de ADRs ajuda a entender decisões passadas?"

## Outputs Recomendados do NotebookLM

1. **Audio Overview** — gera um episódio de podcast de 2 pessoas discutindo o projeto
   - Ideal para: entender o panorama geral enquanto faz outra coisa

2. **Study Guide** — perguntas e respostas sobre a arquitetura
   - Ideal para: revisar os conceitos e testar o entendimento

3. **Briefing Document** — resumo executivo de todos os documentos
   - Ideal para: onboarding de pessoa nova no projeto

4. **Mind Map** (se disponível) — mapa visual das conexões
   - Ideal para: visualizar como cada camada se conecta

## Como Exportar os Arquivos

```bash
# No terminal, criar um zip com todos os docs
cd /home/regis/stack/cal-diy
zip -r /tmp/cal-diy-docs-notebooklm.zip \
  docs/ARQUITETURA-FSD.md \
  docs/CLAUDE-CODE-CAL-DIY.md \
  docs/adr/ \
  AGENTS.md
```

Ou copiar individualmente para Google Drive e importar via link.

## Dica de Uso

NotebookLM é melhor quando os documentos têm:
- Títulos claros (H1, H2, H3) ✅ todos os docs têm
- Exemplos concretos de código ✅ todos têm
- Listas e tabelas ✅ todos têm
- Linguagem consistente (português) ✅ todos estão em PT

O Audio Overview do NotebookLM vai criar uma conversa natural
entre dois "especialistas" explicando tudo que está nos documentos.
