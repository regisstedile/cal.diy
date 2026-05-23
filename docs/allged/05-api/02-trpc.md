# tRPC — API Interna

## O que é

tRPC é o sistema de comunicação entre a interface web e o servidor. É type-safe — TypeScript valida tipos em ambos os lados em tempo de compilação.

Usado exclusivamente pela interface web (não pelo app mobile, que usa REST v2).

## Estrutura

```
packages/trpc/
├── react/
│   └── shared.ts    # ENDPOINTS array — define todos os routers disponíveis
└── server/
    └── routers/
        ├── viewer/          # Router principal (autenticado)
        │   ├── insights/    # Analytics
        │   ├── bookings/    # Bookings
        │   ├── eventTypes/  # Event types
        │   ├── organizations/ # Orgs
        │   ├── me/          # Perfil do usuário logado
        │   └── ...
        └── publicViewer/    # Router público (sem auth)
```

## ENDPOINTS Array (CRÍTICO)

`packages/trpc/react/shared.ts`:

```typescript
export const ENDPOINTS = [
  "loggedInViewerRouter",
  "admin",
  "bookings",
  "eventTypes",
  "insights",      // ← deve estar aqui para /insights funcionar
  "organizations",
  "me",
  // ...todos os outros routers
] as const;
```

**Se um router não está aqui**, `links[routerName]` é `undefined` e todas as chamadas tRPC para ele falham silenciosamente com `isError=true`.

Este foi o bug que causava skeleton infinito em `/insights`.

## Como Chamar tRPC (Client)

```typescript
// Query (GET)
const { data, isLoading, isError } = trpc.viewer.me.get.useQuery();

// Mutation (POST/PUT/DELETE)
const mutation = trpc.viewer.bookings.cancel.useMutation({
  onSuccess: () => console.log("cancelado"),
});
mutation.mutate({ id: bookingId });
```

## HTTP Handler

Cada entry no ENDPOINTS array tem um arquivo em:
```
apps/web/app/api/trpc/[endpoint]/[trpc]/route.ts
```

Exemplo:
```
apps/web/app/api/trpc/insights/[trpc]/route.ts
  → packages/trpc/server/routers/viewer/insights/
```

## Procedures

| Tipo | Uso |
|------|-----|
| `publicProcedure` | Sem autenticação |
| `authedProcedure` | Requer sessão válida |
| `adminProcedure` | Requer role=ADMIN |
| `orgAdminProcedure` | Requer ser admin da org |

## Validação de Input

Todos os inputs são validados com **Zod** antes de chegar no handler:

```typescript
export const ZGetBookingsInputSchema = z.object({
  filters: z.object({
    status: z.array(z.enum(["upcoming", "recurring", "past", "cancelled"])),
  }),
  cursor: z.number().optional(),
  limit: z.number().min(1).max(100).default(10),
});
```

## Handlers — Padrão

```typescript
// booking/get.handler.ts
export const getHandler = async ({ ctx, input }: GetHandlerOptions) => {
  // ctx.user = usuário autenticado
  // input = dados validados pelo schema
  
  const booking = await prisma.booking.findFirst({
    where: { id: input.id, userId: ctx.user.id },
    select: { id: true, title: true, startTime: true }
  });
  
  if (!booking) throw new TRPCError({ code: "NOT_FOUND" });
  
  return booking;
};
```
