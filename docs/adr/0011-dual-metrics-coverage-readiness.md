# ADR-0011: Métricas = cobertura auditada × prontidão operacional

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Transversal (todos os projetos)

---

## Contexto

Um número único de progresso (`Arquitetura = 90%`) é ambíguo: "90%" significa
coisas diferentes em contextos diferentes — 90% auditado? 90% pronto? 90% dos
arquivos? Leva a leituras erradas de "quanto falta".

## Decisão

Todo status usa **duas métricas independentes** por área, cada uma com critério
objetivo declarado:

- **Cobertura auditada** = quanto foi efetivamente verificado (lido/testado ao vivo).
- **Prontidão operacional** = quanto está pronto para o objetivo real do projeto.

Formato obrigatório inclui uma coluna "base do número" (de onde o valor deriva).
Número sem base verificável é inválido.

```
| Área | Cobertura auditada | Prontidão operacional | Base |
|------|--------------------|-----------------------|------|
| Produção | 80% | 45% | probes ok; rollback só via rebuild |
```

## Consequências

**Positivas:**
- Impossível confundir "auditado" com "pronto"
- Cada número rastreável ao critério que o gerou

**Negativas:**
- Dois números para manter em vez de um
- Exige definir o critério objetivo por área

## Referências

- `docs/STATUS-EXECUTIVO.md` (dogfooding no cal.diy)
- [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md) seção Métricas
