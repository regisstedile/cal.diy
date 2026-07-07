# ADR-0003: Dependency Injection com @evyweb/ioctopus

**Status**: Aceito  
**Data**: 2026-06

---

## Contexto

Services dependem de Repositories. Repositories dependem do Prisma client. Sem DI, cada service instancia suas próprias dependências — impossível de testar unitariamente e difícil de trocar implementações.

```typescript
// ❌ Sem DI — acoplamento duro, impossível de testar
class BookingCancelService {
  private repo = new PrismaBookingRepository(prisma); // hard-coded!
}
```

Opções avaliadas:
- **Inversify** — popular mas usa decorators experimentais
- **tsyringe** — Microsoft, mas reflection-based
- **@evyweb/ioctopus** — type-safe, sem decorators, sem reflect-metadata
- DI manual (passar deps via construtor sem container)

## Decisão

Adotamos **@evyweb/ioctopus** com o padrão `moduleLoader`.

```typescript
// 1. Token único por dependência
export const TOKENS = { BookingRepo: Symbol("BookingRepository") };

// 2. Module: declara como criar + quais deps precisam
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  token: TOKENS.BookingRepo,
  classs: PrismaBookingRepository,
  dep: prismaModuleLoader,  // deps declaradas aqui → TypeScript valida
});

// 3. Container: expõe getter type-safe
export function getBookingCancelService(): BookingCancelService {
  moduleLoader.loadModule(container);
  return container.get<BookingCancelService>(token);
}

// 4. Uso — uma linha
const service = getBookingCancelService();
```

Se uma dep for adicionada ao constructor e não declarada no module, **TypeScript falha no build** — não em runtime.

## Consequências

**Positivas:**
- Type-safe em tempo de compilação (não runtime como outros containers)
- Sem decorators experimentais (`@Injectable`, `@Inject`)
- Trocar `PrismaBookingRepository` por mock em testes = uma linha
- Dependências explícitas e documentadas nos arquivos `.module.ts`

**Negativas:**
- Verboso: cada service precisa de `.module.ts` + `.container.ts`
- Padrão pouco conhecido — devs novos precisam aprender
- `packages/features/di/` cresce junto com o número de domínios

## Referências

- [agents/rules/patterns-dependency-injection.md](../agents/rules/patterns-dependency-injection.md)
- [packages/features/di/](../../packages/features/di/)
- [packages/features/bookings/di/](../../packages/features/bookings/di/)
