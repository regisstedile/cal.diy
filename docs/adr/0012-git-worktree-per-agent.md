# ADR-0012: Trabalho de múltiplos agentes usa git worktree por agente

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Transversal (todos os projetos)

---

## Contexto

Numa sessão real dois agentes (Fable e Codex/GPT-5.5) rodaram no **mesmo checkout**
do cal.diy ao mesmo tempo. O segundo deixou trabalho não-commitado no working tree
que o primeiro teve de reconciliar. Deu certo só porque o HEAD estava limpo — mas
o padrão é frágil: dois processos editando o mesmo working tree pisam um no outro
sem os locks do git, arriscando perda de trabalho e diffs misturados.

## Decisão

Trabalho paralelo de agentes (ou humano + agente) no mesmo repo usa **um git
worktree por agente** — diretórios isolados compartilhando o mesmo `.git`, cada um
na sua branch. Nunca dois atores editando o mesmo working tree simultaneamente.

```bash
# criar worktree isolado para uma tarefa/agente
git worktree add ../cal-diy-<tarefa> -b agent/<tarefa>
# trabalhar lá, commitar, push; depois:
git worktree remove ../cal-diy-<tarefa>
git worktree prune            # limpa refs órfãs
```

Regras:
- cada agente commita na sua branch e faz push; merge/rebase é ponto de
  sincronização explícito, não colisão de filesystem.
- ADR-0006 continua valendo: `git fetch` antes de afirmar sync (worktrees
  compartilham refs, mas o remoto ainda é a fonte de verdade).
- worktrees órfãos (`prunable`) são limpos ao fim da sessão (`git worktree prune`).

## Consequências

**Positivas:**
- Sem colisão de working tree; diffs não se misturam
- Cada linha de trabalho tem branch própria, rastreável

**Negativas:**
- Mais espaço em disco (cada worktree é um checkout)
- Exige coordenar merges das branches depois

## Referências

- `docs/sprints/SPRINT-11.1B-FECHAMENTO.md` (incidente Codex no mesmo checkout)
- [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md) seção Trabalho paralelo
