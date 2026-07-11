# STATUS EXECUTIVO — Cal.diy (fork ALLGED)

**Atualizado:** 2026-07-11. Formato conforme
[ENGINEERING-AUDIT-PROTOCOL](ENGINEERING-AUDIT-PROTOCOL.md): duas métricas
independentes por área (cobertura auditada × prontidão operacional), cada número
com base verificável. Nunca um % único.

## Painel

| Área | Cobertura auditada | Prontidão operacional | Base do número |
|---|---|---|---|
| Agendamento (booking/availability/slots) | 100% | 100% | paridade de arquivos 100% (`PARITY.md`); rotas 200 em probe |
| Routing Forms | 100% | 100% | @ts-nocheck zerado; 13 testes; paridade 100% |
| Workflows / Insights / Event Types | 100% | ~92% | paridade 90–100%; sem gap funcional conhecido |
| Teams | 100% | ~58% | procedures 26/45 (`PARITY-PROCEDURES.md`); 11.1A+B entregues, membership/RR pendentes |
| Organizations | 100% | ~35% | procedures 26/41; CRUD custom ok, wizard/onboarding ausentes |
| Auth/SSO/DSync/PBAC | 100% | ~85% | paridade 78–92%; núcleo restaurado |
| Deploy/Produção | 100% | 70% | container healthy, público==local; rollback só via rebuild+git |
| Billing/AI Phone/SCIM/Platform | 100% | N/A | fora de escopo por decisão (ignorados) |
| **Fork inteiro (escopo ALLGED)** | 100% | **74.4%** | 1027/1380 arquivos em escopo (`scripts/parity_report.py`) |

## Estado por fase (protocolo)

- A–B (inventário/análise): ✅ `docs/allged/`, `GAP-2026-07-11.md`
- C (revisão crítica): ✅ `SPRINT-11-TEAMS-TRIAGEM.md` reclassificou 35→19 gaps reais
- D (prova experimental): ✅ probes reais de rota; testes unit com prismaMock
- E–F (correção+evidência): ✅ Sprints 10, 11.1A, 11.1B fechadas com evidência
- G (docs): ✅ paridade regenerável por script
- H (próxima sprint): 11.1C (resend + UI feedback), depois 11.2 (membership)

## Riscos abertos

- Rollback de imagem só via rebuild+git (imagem `stack-cal-src:sprint-10` tagueada como rede)
- 140 type errors pré-existentes no apps/web (baseline, não regressão)
- PAT GitHub / token ClickUp a revogar (manual, dono)

## Decisão de escopo (registrada)

Billing SaaS, AI Phone, SCIM, Platform, admin playground = **excluídos por decisão
arquitetural** (não é produto ALLGED). "74.4% de arquivos" ≠ "26% faltando de
trabalho útil": o gap real de prontidão está concentrado em Teams e Organizations.
