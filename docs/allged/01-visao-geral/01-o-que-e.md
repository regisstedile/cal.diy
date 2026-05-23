# O que é o sistema ALLGED

## Origem

O ALLGED usa o **cal.diy** como base — fork open-source do cal.com mantido pela comunidade. O cal.com original é um sistema de agendamento SaaS enterprise; o cal.diy é a edição self-hosted sem garantias de suporte oficial.

Nosso repositório: https://github.com/regisstedile/cal.diy (branch `deploy`)

## Propósito

Sistema de agendamento para técnicos da ALLGED. Funcionalidades centrais:
- Técnicos expõem horários disponíveis via tipos de evento
- Clientes agendam diretamente pelo link público (`cal.allged.com.br/username`)
- Admin controla usuários, organizações, integrações e métricas

## Diferenças do cal.diy upstream

O cal.diy strip features que existem no cal.com enterprise. Nosso fork **mantém todas as features** incluindo:

| Feature | Cal.diy upstream | Nossa instância |
|---------|-----------------|-----------------|
| Organizations | ❌ | ✅ (org `allged`) |
| Teams | ❌ | ✅ |
| Insights Dashboard | ❌ | ✅ |
| Routing Forms | ❌ | ✅ (configurável) |
| Admin Panel | ❌ | ✅ |
| Workflows | ❌ | ✅ |
| SAML SSO | ❌ | ✅ (infra pronta) |

## URLs principais

| Serviço | URL |
|---------|-----|
| Web App | https://cal.allged.com.br |
| API v2 | https://cal.allged.com.br/api/v2 |
| Admin | https://cal.allged.com.br/settings/admin/flags |
| Porta direta | http://servidor:3005 |

## Usuários atuais

| Email | Username | Role |
|-------|----------|------|
| registedile@gmail.com | registedile-gmail.com | ADMIN |
| tecnicoastoria@gmail.com | weliton | USER |
| tecnicoallged@gmail.com | weslley | USER |
