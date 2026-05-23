# Documentação ALLGED — Cal.diy

Documentação técnica completa do sistema de agendamento ALLGED, baseado no fork cal.diy.

## Módulos

| # | Módulo | Descrição |
|---|--------|-----------|
| 01 | [Visão Geral e Arquitetura](01-visao-geral/) | Stack, monorepo, fluxo de request, banco de dados |
| 02 | [Core de Agendamento](02-agendamento/) | EventType, booking flow, disponibilidade, slots |
| 03 | [Usuários e Organizações](03-usuarios-orgs/) | User model, org allged, teams, convites |
| 04 | [Integrações](04-integracoes/) | Calendários, videoconferência, webhooks, OAuth |
| 05 | [API](05-api/) | REST v2, tRPC, OAuth flow, API keys |
| 06 | [Insights / Analytics](06-insights/) | Dashboard, KPIs, gráficos, routing |
| 07 | [Admin](07-admin/) | Feature flags, usuários, apps, OAuth clients |
| 08 | [App Mobile](08-mobile/) | Expo/React Native, autenticação, telas, build |
| 09 | [Infraestrutura](09-infra/) | Docker Compose, env vars, Traefik, banco |
| 10 | [Customizações ALLGED](10-customizacoes/) | Diff do upstream, decisões de arquitetura |

## Instância

- **URL**: https://cal.allged.com.br
- **Versão base**: cal.diy (fork calcom/cal.diy)
- **Branch de deploy**: `deploy`
- **Repositório**: https://github.com/regisstedile/cal.diy
- **Organização DB**: `allged` (slug: `allged`, id: 2)

## Docs de referência

- Scrapes oficiais cal.com: [`docs/cal.com/`](../cal.com/)
- API Reference v2: [`docs/api-reference/`](../api-reference/)
