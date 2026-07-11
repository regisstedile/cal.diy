# ADR-0008: Escopo ALLGED exclui billing, AI Phone, SCIM e Platform

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Cal.diy (fork ALLGED)

---

## Contexto

O fork cal.diy restaura features do cal.com enterprise. Nem tudo faz sentido para
o ALLGED, que é uso interno — não um SaaS revendido. Contar "arquivos faltando"
sem escopo inflava o gap e sugeria portar código inútil.

## Decisão

Os seguintes módulos são **excluídos por decisão arquitetural** e NÃO entram na
métrica de prontidão nem no backlog de porte:

- **Billing SaaS / seats / trials / invoices** — cobrança por assento; ALLGED não vende assento.
- **AI Phone (Cal AI, aiVoiceAgent, phoneNumber)** — depende de Retell/telefonia paga.
- **SCIM / integration-attribute-sync** — só faz sentido com IdP corporativo.
- **Platform / OAuth clients** — é o produto "Platform" da Cal.com.
- **Admin playground / workspace-platforms** — demos internas da Cal.com.

Procedures/handlers desses módulos podem ser preservados como **stub** quando
outra coisa depende do nome (ex.: `hasActiveTeamPlan`), mas nunca com dependência
real de billing.

## Consequências

**Positivas:**
- Métrica de paridade reflete trabalho útil, não volume bruto
- Não se importa Stripe/entitlement só para satisfazer tipos

**Negativas:**
- Reativar qualquer um exige reverter este ADR explicitamente
- Divergência permanente do upstream nesses módulos

## Referências

- `docs/cal-fork/GAP-2026-07-11.md`, `PARITY.md`, `SPRINT-11-TEAMS-TRIAGEM.md`
