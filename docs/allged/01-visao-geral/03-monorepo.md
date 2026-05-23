# Estrutura do Monorepo

## Raiz

```
cal-diy/
├── apps/               # Aplicações deployáveis
├── packages/           # Pacotes compartilhados
├── companion/          # App mobile (repositório separado dentro do stack)
├── turbo.json          # Config Turborepo (tasks e cache)
├── package.json        # Workspaces root
└── yarn.lock
```

## apps/web — Aplicação Principal

```
apps/web/
├── app/                # Next.js App Router
│   ├── (use-page-wrapper)/
│   │   ├── (main-nav)/         # Páginas com nav principal (event-types, bookings, etc.)
│   │   ├── settings/           # Todas as configurações
│   │   │   ├── (settings-layout)/  # Layout com sidebar de settings
│   │   │   └── (admin-layout)/     # Layout admin
│   │   └── insights/           # Dashboard de analytics
│   └── api/            # API Routes Next.js
│       └── trpc/       # Handlers HTTP do tRPC
├── modules/            # Código web-específico (hooks tRPC, etc.)
│   ├── insights/       # Componentes e hooks de insights
│   ├── bookings/       # Views de bookings
│   ├── event-types/    # Views de event types
│   └── data-table/     # Componentes DataTable
├── lib/                # Utilitários web
└── public/             # Assets estáticos
```

## apps/api — API REST v2

```
apps/api/v2/
└── src/
    └── modules/        # Módulos NestJS por domínio
        ├── auth/
        ├── bookings/
        ├── event-types/
        ├── users/
        └── ...
```

## packages/features — Lógica de Negócio

**Regra crítica**: código em `packages/features` deve ser framework-agnostic (sem tRPC, sem React). Hooks tRPC ficam em `apps/web/modules`.

```
packages/features/
├── bookings/           # Serviços e repositórios de booking
├── eventtypes/         # Lógica de tipos de evento
├── insights/           # Analytics e relatórios
├── organizations/      # Lógica de orgs
├── schedules/          # Disponibilidade e schedules
├── slots/              # Cálculo de slots disponíveis
├── calendars/          # Sincronização de calendário
├── webhooks/           # Envio de webhooks
├── data-table/         # Componentes de tabela reutilizáveis
├── flags/              # Feature flags
├── ee/                 # Features enterprise (billing, SSO, PBAC)
└── di/                 # Container de Dependency Injection
```

## packages/trpc — Camada tRPC

```
packages/trpc/
├── react/
│   └── shared.ts       # ENDPOINTS array — define quais routers existem
└── server/
    └── routers/
        └── viewer/     # Router principal (autenticado)
            ├── insights/
            ├── bookings/
            ├── eventTypes/
            ├── organizations/
            └── ...
```

## packages/prisma — Banco de Dados

```
packages/prisma/
├── schema.prisma       # 102 modelos, enums, relações
├── migrations/         # Histórico de migrations SQL
└── seed.ts             # Dados iniciais
```

## companion/ — App Mobile

```
companion/apps/mobile/
├── app/                # Expo Router (file-based routing)
│   ├── (tabs)/         # Tabs principais
│   │   ├── (bookings)/ # Lista de agendamentos
│   │   ├── (event-types)/ # Tipos de evento
│   │   ├── (availability)/ # Disponibilidade
│   │   └── (more)/     # Configurações
│   └── oauth/          # Fluxo de login OAuth
└── services/           # API calls, OAuth, storage
```

## Regras de Dependência (Camadas)

```
packages/lib            ← sem dependências externas
    ↓
packages/app-store      ← depende de lib
    ↓
packages/features       ← depende de lib, app-store, prisma
    ↓
packages/trpc           ← depende de features, lib, prisma
    ↓
apps/web                ← depende de tudo
```

Violações de ciclo são bloqueadas por ESLint.
