# ADR-0010: Protocolo de auditoria A–H é obrigatório

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Transversal (todos os projetos)

---

## Contexto

Auditorias pontuais e dependentes de contexto produzem relatórios superficiais ou
levam a refatorar cedo demais. Numa sessão real emergiu naturalmente um ciclo que
provou valer mais que qualquer prompt isolado: hipótese → experimento → evidência
→ correção → revalidação → documentação.

## Decisão

Todo projeto segue o [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md)
— fases A (Inventário), B (Análise), C (Revisão crítica), D (Prova experimental),
E (Correção mínima), F (Evidência), G (Docs), H (Próxima sprint). Cada fase tem
**critério de saída explícito**; não se avança sem a evidência da anterior.

Gates não-negociáveis:
- **D**: nenhuma conclusão causal sem experimento reproduzível.
- **C**: nenhum doc vira fonte de verdade antes de reclassificar ✅/🟡/❓.
- **E**: correção < 10 arquivos / < 500 linhas / 1 fluxo / 1 commit.

## Consequências

**Positivas:**
- Reduz "engenharia por opinião"
- Método reaproveitável entre Cal.diy, ADMCOPY, FieldOps, MPS OS

**Negativas:**
- Mais lento que "achei problema → corrijo"
- Exige disciplina de fechamento formal por fatia

## Referências

- [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md)
- Memória `reference_audit_protocol`
