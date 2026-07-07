# ADR-0005: Separação packages/features vs apps/web/modules

**Status**: Aceito  
**Data**: 2026-06

---

## Contexto

tRPC e React são específicos do app web. Se colocarmos hooks tRPC dentro de `packages/features`, o pacote de lógica de negócio passa a depender de React — impossível usar em `apps/api/v2` (que é NestJS puro, sem React).

## Decisão

**Dois mundos separados com responsabilidades claras:**

```
packages/features/[domínio]/     ← framework-agnostic
  repositories/                   → só TypeScript + Prisma
  services/                       → só TypeScript
  types.ts                        → tipos de domínio
  di/                             → wiring de dependências

apps/web/modules/[domínio]/      ← web-specific
  views/                          → componentes React de página inteira
  components/                     → blocos de UI reutilizáveis
  hooks/                          → useQuery/useMutation (tRPC + React)
  store/                          → estado de UI local (Zustand/useState)
```

**A ponte entre os dois:** `packages/trpc/` — recebe requisição web, chama service, retorna dado.

```
apps/web (React)
  └── trpc.viewer.bookings.cancel.useMutation()
        └── packages/trpc/routers/viewer/bookings/cancel.handler.ts
              └── getBookingCancelService().cancel(id, userId)
                    └── packages/features/bookings/services/BookingCancelService.ts
```

**Regra de ouro:**
```typescript
// ❌ PROIBIDO — features importando tRPC (web-specific)
// packages/features/bookings/hooks/useBookings.ts
import { trpc } from "@calcom/trpc/react"; // CIRCULAR!

// ✅ CORRETO — hook fica no módulo web
// apps/web/modules/bookings/hooks/useBookings.ts
import { trpc } from "@calcom/trpc/react"; // OK
```

## Consequências

**Positivas:**
- `packages/features/bookings` funciona em `apps/web` E em `apps/api/v2` sem mudança
- Lógica de negócio testável sem montar componentes React
- Clara separação: "o que é regra de negócio" vs "o que é detalhe de UI"

**Negativas:**
- Dev novo confunde onde colocar código novo
- Mais navegação: feature completa exige abrir duas pastas (packages + apps)
- Tentação de "atalho": colocar fetch direto no componente ao invés de separar

## Como Decidir Onde Colocar

| Pergunta | Resposta | Vai para |
|---|---|---|
| Usa React/hooks? | Sim | `apps/web/modules/` |
| Usa tRPC client? | Sim | `apps/web/modules/` |
| Só TypeScript puro? | Sim | `packages/features/` |
| Acessa banco de dados? | Sim | `packages/features/repositories/` |
| É regra de negócio? | Sim | `packages/features/services/` |
| É endpoint de API? | Sim | `packages/trpc/routers/` |

## Referências

- [agents/rules/architecture-features-modules.md](../agents/rules/architecture-features-modules.md)
- [agents/rules/architecture-circular-dependencies.md](../agents/rules/architecture-circular-dependencies.md)
