# ADR-0004: Repository Pattern com Interfaces Explícitas

**Status**: Aceito  
**Data**: 2026-06

---

## Contexto

Prisma é o ORM atual. Sem abstração, referências ao Prisma ficam espalhadas em centenas de arquivos. Trocar de Prisma (ou adicionar cache, ou fazer mock em teste) exigiria modificar cada arquivo que faz query.

O cal.com upstream tem Prisma direto em services, handlers, até em componentes React (via Server Components). Isso criou acoplamento massivo.

## Decisão

**Todo acesso a dados passa por uma interface de Repository.**

```typescript
// 1. Interface — o contrato (sem Prisma)
interface IBookingRepository {
  findById(id: string): Promise<BookingDto | null>;
  findByUserId(userId: number): Promise<BookingDto[]>;
  updateStatus(id: string, status: BookingStatus): Promise<void>;
}

// 2. Implementação Prisma — único arquivo que importa Prisma
class PrismaBookingRepository implements IBookingRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      select: { id: true, title: true, userId: true, startTime: true }
      // select explícito — nunca include
    });
  }
}

// 3. Services dependem da interface, não da implementação
class BookingCancelService {
  constructor(private repo: IBookingRepository) {} // ← interface, não classe concreta
}
```

**Regras de Prisma:**
- `select` sempre — nunca `include` (performance + segurança)
- `credential.key` nunca exposto em selects de API
- Queries só em arquivos `*Repository.ts` — nunca em services, handlers, componentes

## Consequências

**Positivas:**
- Trocar Prisma por Drizzle/Kysely = reescrever só os `Prisma*Repository.ts`
- Mock em testes = implementar a interface com dados fake
- `select` explícito previne vazamento de campos sensíveis
- Queries centralizadas — fácil auditar o que o sistema lê do banco

**Negativas:**
- Mais arquivos (interface + implementação + module DI)
- Devs tendem a colocar lógica no repository — requer code review disciplinado

## Referências

- [agents/rules/data-repository-pattern.md](../agents/rules/data-repository-pattern.md)
- [agents/rules/data-prefer-select-over-include.md](../agents/rules/data-prefer-select-over-include.md)
- [agents/rules/data-dto-boundaries.md](../agents/rules/data-dto-boundaries.md)
