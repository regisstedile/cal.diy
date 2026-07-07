# Arquitetura do Cal-diy — Mapa Completo com Lentes FSD

> Documento de referência arquitetural. Baseado no curso FSD de Паромов (2023) + análise do codebase real.
> Atualizado: junho 2026

---

## O Que É Esta Arquitetura

Cal-diy usa **Vertical Slice Architecture** — uma evolução do Feature-Sliced Design adaptada para monorepo multi-app com tRPC. A diferença central do FSD clássico:

| FSD Clássico | Cal-diy (VSA) |
|---|---|
| Tudo em `src/` de um app | Dividido em `packages/` + `apps/` |
| Camadas contêm UI e lógica | Backend em `packages/features`, UI em `apps/web/modules` |
| Comunicação via import direto | Backend ↔ Frontend via tRPC como contrato |
| Sem DI formal | DI container completo com `@evyweb/ioctopus` |

---

## A Hierarquia de Dependências

Regra fundamental: **camadas de baixo nunca importam de camadas de cima**.

```
apps/web                        ← tudo pode importar (mais alto nível)
    ↑
packages/trpc                   ← handlers + routers
    ↑
packages/features               ← lógica de domínio (coração do sistema)
    ↑
packages/app-store              ← integrações externas (Google, Outlook...)
    ↑
packages/lib                    ← utilitários sem lógica de domínio
packages/prisma                 ← schema + tipos DB (sem lógica)
packages/ui                     ← design system puro
```

Violações desta hierarquia = erro de CI. ESLint enforça.

---

## Mapeamento FSD → Cal-diy

### SHARED (Compartilhado sem domínio)

| FSD shared | Cal-diy | Localização |
|---|---|---|
| Utilitários | helpers, formatters | `packages/lib/` |
| Design System | Button, Input, Dialog... | `packages/ui/` |
| API Client | Prisma client | `packages/prisma/` |
| Configuração | env vars, constants | `packages/config/` |
| Types globais | tipos primitivos | `packages/types/` |

```
packages/lib/
  ├── constants.ts        # APP_NAME, WEBAPP_URL, etc.
  ├── slugify.ts          # utilitário puro
  ├── logger.ts           # logging
  └── hooks/             # hooks React sem lógica de domínio

packages/ui/
  ├── components/button/
  ├── components/dialog/
  └── components/form/
```

**Regra**: nada em `packages/lib` ou `packages/ui` importa de `packages/features`.

---

### ENTITIES (Dados de domínio + acesso)

No FSD: entidades de negócio com CRUD básico.  
No Cal-diy: **Repositories** (só acesso a dados, zero lógica).

```
packages/features/bookings/
  ├── repositories/
  │   ├── BookingRepository.ts           # interface (contrato)
  │   ├── PrismaBookingRepository.ts     # implementação com Prisma
  │   ├── BookingAttendeeRepository.ts
  │   └── PrismaBookingPaymentRepository.ts
  │
  ├── di/                                # Dependency Injection
  │   ├── tokens.ts                      # símbolos únicos para cada dep
  │   ├── BookingRepository.module.ts    # como instanciar + deps
  │   ├── BookingCancelService.container.ts
  │   └── BookingCancelService.module.ts
```

**Padrão Repository**:
```typescript
// interface — o "contrato" da entidade
interface IBookingRepository {
  findById(id: string): Promise<BookingDto | null>;
  findByUserId(userId: number): Promise<BookingDto[]>;
}

// implementação — único lugar que conhece Prisma
class PrismaBookingRepository implements IBookingRepository {
  constructor(private prisma: PrismaClient) {}
  findById(id: string) {
    return this.prisma.booking.findUnique({ where: { id }, select: {...} });
  }
}
```

---

### FEATURES (Lógica de negócio)

No FSD: ações do usuário com lógica.  
No Cal-diy: **Services** — orquestram repositories, regras de negócio, validações.

```
packages/features/bookings/
  ├── services/
  │   ├── BookingCancelService.ts        # orquestra: valida, cancela, notifica
  │   ├── BookingAttendeesService.ts
  │   ├── BookingAccessService.ts        # quem pode ver/editar este booking
  │   └── WrongAssignmentReportService.ts
  │
  ├── lib/
  │   ├── getLuckyUser.ts               # round-robin algorithm
  │   └── handleNewBooking/             # fluxo de criação de booking
```

**Padrão Service**:
```typescript
class BookingCancelService {
  constructor(private deps: {
    bookingRepo: IBookingRepository;
    emailService: IEmailService;
    calendarService: ICalendarService;
  }) {}

  async cancel(bookingId: string, userId: number) {
    const booking = await this.deps.bookingRepo.findById(bookingId);
    if (!booking) throw new ErrorWithCode(ErrorCode.BookingNotFound);
    // regra de negócio: só quem criou pode cancelar
    if (booking.userId !== userId) throw new ErrorWithCode(ErrorCode.Forbidden);
    await this.deps.bookingRepo.updateStatus(bookingId, "CANCELLED");
    await this.deps.emailService.sendCancellation(booking);
  }
}
```

**Services NÃO importam de tRPC**. Isso garante que a lógica pode ser usada em `apps/api/v2` sem depender do React.

---

### WIDGETS + PAGES (UI que consome os dados via tRPC)

No FSD: composições de UI. No Cal-diy: `apps/web/modules/`.

```
apps/web/modules/
  ├── bookings/
  │   ├── views/              # Pages: composição de tudo
  │   │   └── bookings-view.tsx
  │   ├── components/         # Widgets: blocos de UI reutilizáveis
  │   │   └── BookingCard.tsx
  │   ├── hooks/              # lógica de UI com tRPC
  │   │   └── useBookings.ts
  │   └── store/              # estado de UI local (não server state)
  │
  ├── ee/                     # Enterprise Edition (mesma estrutura)
  │   ├── organizations/
  │   ├── teams/
  │   └── sso/
```

A **separação crítica** entre `packages/features` e `apps/web/modules`:

```
❌ Errado — tRPC hook em packages/features
packages/features/bookings/hooks/useBookings.ts
import { trpc } from "@calcom/trpc/react"; // VIOLA hierarquia!

✅ Correto — tRPC hook em apps/web/modules
apps/web/modules/bookings/hooks/useBookings.ts
import { trpc } from "@calcom/trpc/react"; // OK, web pode importar tudo
```

---

### APP (Entry point, providers, rotas)

```
apps/web/app/
  ├── layout.tsx              # providers globais (tRPC, i18n, theme)
  ├── providers.tsx           # ReactQueryProvider, SessionProvider
  ├── (use-page-wrapper)/    # grupo de rotas com layout compartilhado
  │   ├── settings/           # /settings/*
  │   │   ├── organizations/  # /settings/organizations/*
  │   │   └── teams/          # /settings/teams/*
  │   └── event-types/        # /settings/event-types/*
  └── (booking-page-wrapper)/ # páginas públicas de booking
```

**Autenticação sempre no page.tsx, nunca no layout.tsx**:
```typescript
// apps/web/app/(use-page-wrapper)/settings/organizations/page.tsx
export default async function OrgSettingsPage() {
  const session = await getServerSession(); // ← aqui, não no layout
  if (!session) redirect("/auth/login");
  return <OrgSettingsView />;
}
```

---

## A Camada tRPC — A Ponte

tRPC é o **boundary** entre backend (`packages/features`) e frontend (`apps/web`).

```
packages/trpc/server/routers/viewer/
  ├── organizations/
  │   ├── _router.tsx          # define os endpoints + schemas Zod
  │   ├── schema.ts            # ZUpdateOrganizationInputSchema, etc.
  │   ├── getCurrent.handler.ts  # handler delega para Service
  │   └── update.handler.ts
  │
  ├── teams/_router.tsx
  ├── bookings/_router.tsx
  └── _router.tsx              # viewer router raiz
```

**Handlers são thin controllers** — recebem input, chamam Service, retornam:
```typescript
// update.handler.ts
export const updateHandler = async ({ ctx, input }) => {
  const membership = await assertCanManageOrganization({ userId: ctx.user.id });
  // delega para service (que vive em packages/features)
  return orgService.update(membership.team.id, input);
};
```

---

## DI Container — Como as Dependências São Fiadas

Cal-diy usa `@evyweb/ioctopus` para injeção de dependência type-safe.

```
packages/features/di/
  ├── di.ts                   # createContainer, createModule, bindModuleToClassOnToken
  ├── tokens.ts               # todos os símbolos de DI do sistema
  └── modules/               # modules de infra (Prisma, etc.)

packages/features/bookings/di/
  ├── tokens.ts               # BookingRepository, BookingCancelService...
  ├── BookingRepository.module.ts    # como criar BookingRepository
  ├── BookingCancelService.module.ts # BookingCancelService + suas deps
  └── BookingCancelService.container.ts  # expose: getBookingCancelService()
```

**Usar um service** — uma linha de código:
```typescript
import { getBookingCancelService } from "@calcom/features/bookings/di/BookingCancelService.container";

// no tRPC handler:
const service = getBookingCancelService();
await service.cancel(input.bookingId, ctx.user.id);
```

---

## Enterprise Edition (ee/)

Features enterprise seguem a **mesma arquitetura** mas ficam em `ee/`:

```
packages/features/ee/
  ├── organizations/          # multi-tenant org management
  │   ├── repositories/       # OrgRepository
  │   └── services/           # OrgService, MembershipService
  ├── teams/
  ├── billing/                # Stripe, planos
  ├── sso/                    # SAML, OIDC
  └── workflows/              # automações de booking

apps/web/modules/ee/
  ├── organizations/          # UI para org settings
  ├── teams/                  # UI para team management
  └── sso/                    # UI para configurar SSO
```

---

## Padrão de DTOs — Segurança e Desacoplamento

Prisma types nunca chegam ao frontend. Tudo passa por DTOs:

```
1. Banco → Repository → DTO
2. DTO → Service → DTO (transformado)
3. DTO → tRPC Handler → JSON (via Zod parse)
4. JSON → Frontend TypeScript (inferido do tRPC router)
```

```typescript
// ❌ Errado — Prisma type vazando para o frontend
return prisma.booking.findFirst(); // retorna todos os campos!

// ✅ Correto — select explícito → DTO
return prisma.booking.findFirst({
  select: { id: true, title: true, startTime: true }
}); // TypeScript infere o shape exato
```

---

## Onde Cada Tipo de Código Vive

| O que escrever | Onde vai |
|---|---|
| Nova tabela / campo | `packages/prisma/schema.prisma` + migration |
| Acesso a dados | `packages/features/[domain]/repositories/` |
| Regra de negócio | `packages/features/[domain]/services/` |
| Endpoint API | `packages/trpc/server/routers/viewer/[domain]/_router.tsx` |
| Validação de input | Schema Zod em `_router.tsx` ou `schema.ts` |
| Hook React com dados | `apps/web/modules/[domain]/hooks/` |
| Componente de UI complexo | `apps/web/modules/[domain]/components/` |
| Página completa (view) | `apps/web/modules/[domain]/views/` |
| Rota Next.js | `apps/web/app/(wrapper)/[path]/page.tsx` |
| Permissão de acesso | No `page.tsx` da rota |
| String traduzível | `packages/i18n/locales/en/common.json` |
| Componente UI puro | `packages/ui/components/` |
| Utilitário sem domínio | `packages/lib/` |

---

## O Que Não Existe Ainda (Oportunidades)

### 1. Organizations completamente implementadas
Hoje: stubs em `organizations/_router.tsx` (listWatchlistEntries, listBookingReports, getWatchlistEntryDetails, etc.)  
Oportunidade: implementar o fluxo completo de blocklist/watchlist com:
- `packages/features/blocklist/repositories/WatchlistRepository.ts`
- `packages/features/blocklist/services/WatchlistService.ts`
- `packages/trpc/server/routers/viewer/organizations/` → handlers reais

### 2. PBAC (Permission-Based Access Control) expandido
Hoje: `packages/features/pbac/` existe mas a feature flag `pbac` está desabilitada por padrão.  
Oportunidade: ativar e expandir permissões granulares por recurso (event types, bookings, reports).

### 3. Trigger.dev tasks para operações pesadas
Hoje: operações síncronas em handlers tRPC.  
Oportunidade: mover operações lentas (envio de emails em bulk, sync de calendários, processamento de relatórios) para tasks async com retry automático.

### 4. Cal-diy como produto próprio (fork completo)
Hoje: fork do cal.com com customizações.  
Oportunidade: definir o que é único do cal-diy vs upstream e documentar a divergência clara.

### 5. UI para as features de blocklist/watchlist
Hoje: `BlocklistTable` e `PendingReportsTable` existem como UI, mas sem backend real.  
Oportunidade: conectar UI ao backend real uma vez que os services forem implementados.

---

## Checklist de Conformidade Arquitetural

Para cada feature nova, verificar:

- [ ] Repository tem interface (`IXxxRepository`) separada da implementação
- [ ] Service recebe deps via constructor (não instancia direto)
- [ ] Module e container criados em `di/`
- [ ] Handler tRPC é thin: valida input → chama service → retorna
- [ ] select explícito em todas queries Prisma (nunca `include`)
- [ ] Sem importações de `@calcom/trpc` em `packages/features`
- [ ] Sem importações de `@calcom/features` em `packages/lib`
- [ ] Hook tRPC em `apps/web/modules`, não em `packages/features`
- [ ] Strings de UI em `packages/i18n/locales/en/common.json`
- [ ] Permissão verificada no `page.tsx`, não no `layout.tsx`
- [ ] DTO: Prisma type não vaza para o response final

---

## Fluxo Completo — Exemplo Real

**Usuário clica "Cancelar Booking" → O que acontece:**

```
1. apps/web/app/.../page.tsx
   └── BookingView (módulo web)

2. apps/web/modules/bookings/views/bookings-view.tsx
   └── cancelMutation = trpc.viewer.bookings.cancel.useMutation()
   └── cancelMutation.mutate({ bookingId })

3. packages/trpc/server/routers/viewer/bookings/_router.tsx
   └── cancel: authedProcedure.input(z.object({bookingId: z.string()}))
   └── .mutation(async ({ ctx, input }) => cancelHandler({ ctx, input }))

4. packages/trpc/server/routers/viewer/bookings/cancel.handler.ts
   └── const service = getBookingCancelService()
   └── return service.cancel(input.bookingId, ctx.user.id)

5. packages/features/bookings/services/BookingCancelService.ts
   └── const booking = await this.deps.bookingRepo.findById(bookingId)
   └── // valida permissão, regras de cancelamento
   └── await this.deps.bookingRepo.updateStatus(bookingId, "CANCELLED")
   └── await this.deps.emailService.sendCancellationEmails(booking)

6. packages/features/bookings/repositories/PrismaBookingRepository.ts
   └── prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } })
```

**Cada camada tem UMA responsabilidade. Trocar Prisma por outro ORM = só mudar step 6.**

---

*Documento gerado com base no curso FSD de Евгений Паромов (2023) + análise direta do codebase cal-diy.*
