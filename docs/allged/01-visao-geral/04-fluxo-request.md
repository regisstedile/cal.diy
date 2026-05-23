# Fluxo de Request

## Requisição Web (tRPC)

```
Browser
  │
  ├─ HTTPS → Traefik/nginx
  │            │
  │            └─ http://localhost:3005 (container cal-src)
  │                        │
  │                        ├─ Next.js Middleware (auth check, org redirect)
  │                        │
  │                        ├─ App Router Page (RSC ou Client Component)
  │                        │   └─ trpc.viewer.XXX.useQuery()
  │                        │
  │                        └─ /api/trpc/[trpc] (HTTP handler)
  │                                    │
  │                                    ├─ tRPC Router → Procedure
  │                                    │   ├─ authedProcedure (requer sessão)
  │                                    │   └─ publicProcedure (sem auth)
  │                                    │
  │                                    ├─ Input validation (Zod)
  │                                    │
  │                                    ├─ Handler function
  │                                    │   └─ Service (packages/features)
  │                                    │       └─ Repository → Prisma → PostgreSQL
  │                                    │
  │                                    └─ Response JSON
```

## ENDPOINTS Array — Como tRPC Funciona

O arquivo `packages/trpc/react/shared.ts` define o array `ENDPOINTS`:

```typescript
export const ENDPOINTS = [
  "loggedInViewerRouter",
  "bookings",
  "eventTypes",
  "insights",      // ← essencial para /insights funcionar
  "organizations",
  // ...
] as const;
```

Cada entry mapeia para um arquivo em `apps/web/app/api/trpc/[trpc]/`:
- `insights` → `/api/trpc/insights/[trpc].ts`
- `bookings` → `/api/trpc/bookings/[trpc].ts`

**Se um router não estiver no array ENDPOINTS, todas as chamadas tRPC para ele retornam erro** — o client não consegue montar a URL. Este foi o bug que causava o skeleton infinito na página de insights.

## Requisição API REST v2

```
Browser / Mobile / Externo
  │
  └─ POST /api/v2/bookings
             │
             ├─ Auth Middleware (Bearer token ou OAuth)
             │
             ├─ NestJS Controller (apps/api/v2)
             │   └─ thin: só valida input e chama service
             │
             ├─ Service (packages/features ou platform-libraries)
             │   └─ Business logic
             │
             └─ Response DTO (validado por Zod/class-validator)
```

## Autenticação

| Tipo | Mecanismo | Usado por |
|------|-----------|-----------|
| Session cookie | NextAuth.js JWT | Web app |
| Bearer token | OAuth access_token | Mobile app, API externa |
| API Key | Header `Authorization: Bearer cal_xxx` | Integrações externas |

## Fluxo de Sessão (Web)

```
1. Login via /auth/login (email+senha ou OAuth Google)
2. NextAuth cria sessão JWT no cookie
3. Middleware Next.js valida cookie em cada request
4. Server Components chamam getServerSession()
5. Client Components usam useSession() do next-auth
```

## Middleware de Org Redirect

`apps/web/middleware.ts` intercepta toda request e:

1. Verifica se é Single-Org-Mode (`NEXT_PUBLIC_SINGLE_ORG_SLUG` definido)
2. Se usuário acessa `cal.allged.com.br/tecnico`, resolve para org correta
3. Redireciona subdomínios de org (ex: `allged.cal.allged.com.br`) para rota interna
