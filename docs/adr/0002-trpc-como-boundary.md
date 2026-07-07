# ADR-0002: tRPC como Boundary entre Backend e Frontend

**Status**: Aceito  
**Data**: 2026-06

---

## Contexto

Com `packages/features` separado de `apps/web`, precisamos de um contrato claro entre os dois. Opções avaliadas:

- REST API manual com OpenAPI
- GraphQL com Apollo/Pothos
- **tRPC** — end-to-end typesafe, sem geração de código

## Decisão

Usamos **tRPC** como a única ponte entre `packages/features` (backend) e `apps/web` (frontend).

```
packages/trpc/server/routers/viewer/bookings/_router.tsx
  → define o contrato (schema Zod + return type)

apps/web/modules/bookings/hooks/useBookings.ts
  → consome via trpc.viewer.bookings.list.useQuery()
  → TypeScript infere o tipo do retorno automaticamente
```

Nenhuma chamada HTTP manual. Nenhum `fetch('/api/bookings')`. Nenhum tipo duplicado.

## Consequências

**Positivas:**
- Renomear um campo no handler = erro imediato em todos os consumers (TypeScript)
- Sem swagger para manter, sem geração de código, sem client libraries
- Input validado automaticamente via Zod antes de chegar no handler
- `useQuery`/`useMutation` do React Query embutidos

**Negativas:**
- Acoplamento a tRPC — difícil expor os mesmos endpoints como REST puro
- `apps/api/v2` usa REST (NestJS), não tRPC — dois sistemas em paralelo
- Curva de aprendizado para devs acostumados com REST/GraphQL

## Referências

- [agents/rules/architecture-features-modules.md](../agents/rules/architecture-features-modules.md)
- [packages/trpc/server/routers/](../../packages/trpc/server/routers/)
