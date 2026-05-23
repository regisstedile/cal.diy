---
title: "Plano para documentar o cal-diy por completo"
tags: [cal-diy, documentacao, arquitetura, operacao]
created: 2026-05-23
---

# Plano para documentar o cal-diy por completo

## Estado atual

Já existe uma documentação funcional em `docs/allged/` com 10 módulos:

- visão geral;
- agendamento;
- usuários e organizações;
- integrações;
- API;
- insights;
- admin;
- mobile;
- infraestrutura;
- customizações ALLGED.

Isso cobre a visão operacional da instância. O próximo nível é documentar o código com rastreabilidade: tela -> função -> contrato -> banco -> teste -> operação.

## O que falta para dizer "totalmente documentado"

| Área | Status atual | Próximo documento necessário |
|---|---|---|
| Monorepo | Coberto em alto nível | Mapa de ownership por pacote e feature |
| Web app | Parcial | Catálogo `apps/web/app`, `modules`, `components` |
| API v2 | Referência existe | Mapa endpoint -> controller/service -> model |
| tRPC | Parcial | Router por domínio com input/output e consumers |
| Prisma | Parcial | Modelo por domínio + selects/repositories usados |
| Bookings | Bom início | Fluxo completo com cancellation/reschedule/no-show |
| Organizations | Bom após E2E | Fluxo completo com convites, roles, SSO/SAML |
| Insights | Bom para ALLGED | Mapa UI -> handler -> SQL/view |
| App Store | Parcial | Como apps, credentials e webhooks se conectam |
| Mobile | Parcial | Fluxo OAuth real quando houver URL pública |
| Testes | Parcial | Matriz de testes por feature |
| Operação | Bom | Runbooks: rebuild, rollback, backup, migração, health checks |

## Estrutura recomendada

Criar dentro de `docs/cal-diy-enterprise/`:

```text
docs/cal-diy-enterprise/
├── 00-mapa-geral.md
├── 01-web-app/
│   ├── app-router.md
│   ├── modules.md
│   ├── components.md
│   └── i18n.md
├── 02-backend/
│   ├── trpc.md
│   ├── api-v2.md
│   ├── prisma.md
│   └── repositories.md
├── 03-features/
│   ├── organizations.md
│   ├── bookings.md
│   ├── event-types.md
│   ├── insights.md
│   └── api-keys.md
├── 04-operacao/
│   ├── docker.md
│   ├── env-vars.md
│   ├── rebuild-rollback.md
│   ├── banco.md
│   └── health-checks.md
└── 05-testes/
    ├── playwright.md
    ├── unit-tests.md
    └── matriz-cobertura.md
```

## Ordem pragmática de execução

1. `organizations.md`: porque já há E2E 7/7 e o fluxo está fresco.
2. `bookings.md`: domínio central do produto.
3. `api-v2.md`: necessário para MCP, integrações e mobile.
4. `prisma.md`: base para entender dados e migrações.
5. `insights.md`: conecta customização ALLGED e banco denormalizado.
6. `rebuild-rollback.md`: reduz risco operacional.

## Template para documentar uma feature

```md
# Feature — Nome

## Para que serve

## Fluxo de usuário

## Arquivos principais

| Camada | Arquivos |
|---|---|
| UI | |
| Server/tRPC/API | |
| Domínio | |
| Prisma/Banco | |
| Testes | |

## Contratos

## Regras de negócio

## Estados inválidos que o tipo deve impedir

## Validações runtime

## Como testar

## Como operar em produção

## Lacunas / riscos
```

## Critério de pronto

Uma área está documentada quando alguém consegue:

- encontrar o arquivo certo sem grep aleatório;
- explicar o fluxo com os nomes reais de arquivos/funções;
- rodar o teste correto;
- saber qual env/container/serviço precisa estar ativo;
- identificar um risco antes de editar.
