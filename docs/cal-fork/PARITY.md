# Dashboard de Paridade — fork cal.diy vs REF enterprise

**Gerado:** 2026-07-11 por `scripts/parity_report.py` (re-rode para atualizar; não edite os números na mão).

Método: presença de arquivo .ts/.tsx (sem testes) do REF no fork, por módulo.
É PROXY — reimplementação custom do fork em outro path conta como ausente;
esses casos estão anotados. Módulos IGNORADOS = decisão do dono (escopo ALLGED),
fora da média geral.

```
Enterprise → Fork (escopo ALLGED)
─────────────────────────────────────────────
Availability/Slots           ████████████████████ 100.0%  (57/57)
Routing Forms                ████████████████████ 100.0%  (88/88)
Workflows                    ████████████████████ 100.0%  (125/125)
Payments (Stripe checkout)   ████████████████████ 100.0%  (10/10)
Bookings                     ███████████████████░  94.6%  (333/352)
PBAC/Attributes              ██████████████████░░  92.2%  (59/64)
Insights                     ██████████████████░░  90.4%  (75/83)
Event Types                  ██████████████████░░  89.5%  (128/143)
Auth/SSO/DSync               ████████████████░░░░  78.0%  (39/50)
Admin (core)                 ███████████████░░░░░  77.0%  (57/74)
Organizations                ████░░░░░░░░░░░░░░░░  17.6%  (31/176)
Teams                        ███░░░░░░░░░░░░░░░░░  15.8%  (25/158)
SCIM/attr-sync               IGNORADO (decisão)
Admin playground/wksp-platforms IGNORADO (decisão)
Billing SaaS/seats           IGNORADO (decisão)
AI Phone (Cal AI)            IGNORADO (decisão)
Platform/OAuth clients       IGNORADO (decisão)
─────────────────────────────────────────────
PARIDADE GERAL (escopo ALLGED) ███████████████░░░░░  74.4%  (1027/1380)
```

## Gap Matrix

| Módulo | Escopo | Arquivos | Paridade | Nota |
|---|---|---|---|---|
| Availability/Slots | ✅ core | 57/57 | 100.0% |  |
| Routing Forms | ✅ core | 88/88 | 100.0% | @ts-nocheck zerado 2026-07-11; débito REF quitado 07-08 |
| Workflows | ✅ core | 125/125 | 100.0% |  |
| Payments (Stripe checkout) | ✅ core | 10/10 | 100.0% |  |
| Bookings | ⚠️ core | 333/352 | 94.6% |  |
| PBAC/Attributes | ⚠️ core | 59/64 | 92.2% |  |
| Insights | ⚠️ core | 75/83 | 90.4% |  |
| Event Types | ⚠️ core | 128/143 | 89.5% |  |
| Auth/SSO/DSync | ⚠️ core | 39/50 | 78.0% |  |
| Admin (core) | ⚠️ core | 57/74 | 77.0% | sem playground/workspace-platforms (reclassificados ignorados 2026-07-11) |
| Organizations | 🔴 core | 31/176 | 17.6% | idem Teams: CRUD custom no fork; wizard/onboarding ausentes de verdade |
| Teams | 🔴 core | 25/158 | 15.8% | fork tem router custom (1 arquivo cobre CRUD; arquivos REF contam como ausentes) — paridade FUNCIONAL maior que a numérica |
| SCIM/attr-sync | ❌ IGNORADO | — (31 no REF) | — | só com IdP corporativo |
| Admin playground/wksp-platforms | ❌ IGNORADO | — (14 no REF) | — | demos internas da Cal.com — decisão 2026-07-11 |
| Billing SaaS/seats | ❌ IGNORADO | — (135 no REF) | — | cobrança por assento p/ vender SaaS — não se aplica |
| AI Phone (Cal AI) | ❌ IGNORADO | — (70 no REF) | — | depende de Retell/telefonia paga |
| Platform/OAuth clients | ❌ IGNORADO | — (11 no REF) | — | produto Platform da Cal.com |

## Leitura

- **✅ ≥99%** paridade de arquivos praticamente total.
- **⚠️ 60–99%** parcial — ver nota; parte pode ser reimplementação custom funcional.
- **🔴 <60%** gap real; priorizar OU reclassificar como ignorado.
- Decisões de escopo e plano de sprints: `GAP-2026-07-11.md`.
