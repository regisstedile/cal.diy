---
title: "cal-diy Enterprise — documentação de código"
tags: [cal-diy, enterprise, documentacao]
created: 2026-05-23
---

# cal-diy Enterprise — documentação de código

Esta área complementa `docs/allged/`. A documentação ALLGED explica a instância; esta documentação explica o código com rastreabilidade operacional.

## Entrada rápida

- [`00-mapa-geral.md`](00-mapa-geral.md)
- [`03-features/organizations.md`](03-features/organizations.md)
- [`03-features/bookings.md`](03-features/bookings.md)

## Regra

Cada documento deve conectar:

```text
UI -> tRPC/API -> handler -> Prisma/banco -> teste -> operação
```

Sem essa cadeia, a documentação ainda é apenas descrição parcial.

- [Event Types](03-features/event-types.md)
- [Availability e Slots](03-features/availability-and-slots.md)
- [Public Booking Page](03-features/public-booking-page.md)
- [Teams & Routing](03-features/teams-routing.md)
- [Webhooks & Integrações](03-features/webhooks-integrations.md)
- [Payments](03-features/payments.md)
- [Auth & SSO](03-features/auth-sso.md)
