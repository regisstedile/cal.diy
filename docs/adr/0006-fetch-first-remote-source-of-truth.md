# ADR-0006: Git remoto é a fonte de verdade — fetch antes de afirmar sync

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Transversal (todos os projetos)

---

## Contexto

Vários projetos rodam em múltiplas máquinas contra o mesmo repositório (ex.: ADM
Copy ERP editado no Windows e auditado no 129). A ref de tracking local
(`origin/main` no `.git` local) é um **cache**, não estado ao vivo. Numa sessão
real o local aparentava sincronizado enquanto o remoto tinha **63 commits**
adiante — a análise inteira nasceu obsoleta.

## Decisão

Antes de qualquer afirmação sobre estado do repo (sincronizado, atrás, à frente),
rodar `git fetch` e comparar com a ref remota atualizada. O **remoto é a fonte de
verdade**; o local é conveniência.

```bash
git fetch <remote> <branch>
git rev-list --count <remote>/<branch>..<branch>   # à frente
git rev-list --count <branch>..<remote>/<branch>   # atrás
```

## Consequências

**Positivas:**
- Análises não nascem obsoletas por cache de tracking
- Detecta trabalho de outra máquina/agente antes de sobrescrever

**Negativas:**
- Um passo de rede a mais no início de cada auditoria
- Exige credencial de fetch disponível na sessão

## Referências

- Memória `feedback_git_fetch_first`
- [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md) Fase A
