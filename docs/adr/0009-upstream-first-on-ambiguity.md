# ADR-0009: Em ambiguidade, seguir o upstream cal.com

**Status**: Aceito
**Data**: 2026-07
**Escopo**: Cal.diy (fork ALLGED)

---

## Contexto

Ao portar/reimplementar comportamento do fork, surgem escolhas ambíguas onde
"parece melhor" divergir do upstream. Divergir sem ganho claro cria dívida de
manutenção (todo merge futuro do upstream conflita) e reintroduz bugs que o
upstream já resolveu.

Caso concreto: `/teams?token=` consome o convite no **server render** (uma mutação
num GET). Levantou-se o risco de disparo por prefetch. Verificado o REF: o
upstream faz exatamente isso (`server-page.tsx` → `TeamService.inviteMemberByToken`).
Divergir para uma mutation client-side não tinha ganho proporcional (link vem de
email, não é `<Link>` prefetchável; membership é pendente/reversível).

## Decisão

Diante de escolha ambígua sem ganho de segurança/correção **comprovado**, seguir o
comportamento do upstream cal.com. Divergir exige justificativa registrada (idealmente
um ADR próprio) com o ganho concreto que compensa a dívida de manutenção.

## Consequências

**Positivas:**
- Merges futuros do upstream conflitam menos
- Não se reintroduz bug já resolvido lá

**Negativas:**
- Herda-se decisões discutíveis do upstream (ex.: efeito colateral em GET)
- Exige ter o código de referência do upstream à mão para comparar

## Referências

- `docs/sprints/SPRINT-11.1B-FECHAMENTO.md` (seção segurança/design)
