# Stack Técnico

## Frontend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 15 (App Router) | Framework web principal |
| React | 18 | UI |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 3 | Estilização |
| tRPC | 11 | API type-safe client/server |
| React Query (TanStack) | 5 | Cache e estado servidor |

## Backend

| Tecnologia | Uso |
|-----------|-----|
| Next.js API Routes | Endpoints HTTP |
| tRPC | RPC type-safe (maioria das chamadas) |
| Prisma ORM | Acesso ao banco |
| NextAuth.js | Autenticação (sessions, OAuth) |

## Banco de Dados

| Serviço | Banco | Propósito |
|---------|-------|-----------|
| PostgreSQL 14 | `cal_src` | Dados da aplicação (usuários, bookings, orgs) |
| PostgreSQL 14 | `cal` | PlatformOAuthClient (integração API platform) |
| Redis | - | Cache de slots, sessões, filas |

## Infraestrutura

| Serviço | Porta | Propósito |
|---------|-------|-----------|
| cal-src (Next.js) | 3005 | App web principal |
| postgres | 5432 | Banco de dados |
| redis | 6379 | Cache / pub-sub |
| Traefik / nginx | 80/443 | Proxy reverso + HTTPS |

## Monorepo

Gerenciado com **Turborepo + Yarn Workspaces**.

```
cal-diy/
├── apps/
│   ├── web/          # Next.js app principal
│   └── api/          # API REST v2 (NestJS)
├── packages/
│   ├── prisma/       # Schema + migrations
│   ├── trpc/         # Routers tRPC server/client
│   ├── features/     # Lógica de negócio por domínio
│   ├── lib/          # Utilitários compartilhados
│   ├── ui/           # Componentes UI (@calcom/ui)
│   └── i18n/         # Traduções (pt-BR, en, etc.)
└── companion/        # App mobile (Expo)
```

## App Mobile

| Tecnologia | Uso |
|-----------|-----|
| Expo SDK 52 | Framework mobile |
| React Native | UI mobile |
| Expo Router | Navegação por arquivo |
| EAS Build | Build CI/CD APK/IPA |
