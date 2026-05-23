# Teams & Routing

## Tipos de agendamento (`SchedulingType`)

```typescript
// packages/prisma/schema.prisma
enum SchedulingType {
  ROUND_ROBIN @map("roundRobin")
  COLLECTIVE  @map("collective")
  MANAGED     @map("managed")
}
```

| Tipo | Comportamento |
|------|---------------|
| `COLLECTIVE` | Todos os hosts obrigatórios — slot só aparece se TODOS disponíveis |
| `ROUND_ROBIN` | Sistema seleciona um host entre os elegíveis via algoritmo de rotação |
| `MANAGED` | Event type pai distribui cópias para membros do time (managed events) |

`EventType.schedulingType` é `null` para eventos pessoais (um único host).

---

## Modelo `Host` (Prisma)

```typescript
// packages/prisma/schema.prisma — tabela Host
model Host {
  userId           Int
  eventTypeId      Int
  isFixed          Boolean  @default(false)  // obrigatório em toda reunião
  priority         Int?                      // 0-4 (baixo→urgente), RR
  weight           Int?                      // 100 = padrão; proporcional
  weightAdjustment Int?                      // deprecated
  scheduleId       Int?                      // override de agenda do host
  groupId          String?                   // segmentação de RR
}
```

- **`isFixed=true`**: host fixo — aparece em todas as reuniões (ex: moderador)
- **`isFixed=false`**: host rotativo — concorre na seleção RR
- **`priority`**: desempate entre hosts de mesmo peso
- **`weight`**: distribuição proporcional de bookings (ex: 200 = 2× mais bookings que 100)

---

## Flags do EventType relevantes para teams

```typescript
// packages/prisma/schema.prisma — EventType
assignAllTeamMembers            Boolean   // adiciona todos os membros como hosts RR
assignRRMembersUsingSegment     Boolean   // filtra membros por rrSegmentQueryValue
rrSegmentQueryValue             Json?     // query de segmento (mesma sintaxe routing forms)
isRRWeightsEnabled              Boolean   // ativa pesos no RR
rescheduleWithSameRoundRobinHost Boolean  // reagendamento vai para o mesmo host
includeNoShowInRRCalculation    Boolean   // no-shows contam na distribuição RR
rrHostSubsetEnabled             Boolean   // habilita subset de hosts por booking
```

---

## Pipeline de seleção de hosts (Round Robin)

Arquivo principal: `packages/features/bookings/lib/handleNewBooking/loadAndValidateUsers.ts`

```
1. loadUsers()
   └─ carrega todos os hosts do EventType

2. filterBlockedUsers()
   └─ remove usuários bloqueados pelo watchlist da org

3. map isFixed
   └─ COLLECTIVE e MANAGED: todos isFixed=true
   └─ ROUND_ROBIN: respeita campo Host.isFixed

4. QualifiedHostsService.findQualifiedHostsWithDelegationCredentials()
   └─ lógica enterprise de pesos, segmentos, contactOwner, rrSubset
   └─ retorna: qualifiedRRHosts | allFallbackRRHosts | fixedHosts

5. Resultado final:
   └─ qualifiedRRUsers   → host(s) selecionados para o booking
   └─ additionalFallbackRRUsers → fallback se qualificados indisponíveis
   └─ fixedUsers         → hosts obrigatórios (sempre presentes)
```

### `QualifiedHostsService` — DI pattern

```typescript
// packages/features/di/containers/QualifiedHosts.ts
// Versão OSS: noOp — retorna arrays vazios, fixedUsers fallback via loadAndValidateUsers
const noOpService: QualifiedHostsService = {
  findQualifiedHostsWithDelegationCredentials: async () => ({
    qualifiedRRHosts: [],
    allFallbackRRHosts: [],
    fixedHosts: [],
  }),
};
```

> **Por que noOp?** A lógica de pesos, segmentos e contact-owner é enterprise.
> No OSS, quando `qualifiedRRHosts` é vazio, `loadAndValidateUsers` faz fallback:
> trata todos os users como `fixedUsers` e `ensureAvailableUsers` escolhe o primeiro disponível.

---

## `ensureAvailableUsers` — verificação de disponibilidade

Arquivo: `packages/features/bookings/lib/handleNewBooking/ensureAvailableUsers.ts`

Para cada host (fixo ou RR selecionado):
1. Busca busy times via `BusyTimesService` (calendários externos + bookings existentes)
2. Calcula date ranges via `buildDateRanges()` (schedule + overrides)
3. Verifica conflito via `checkForConflicts()`
4. Para COLLECTIVE: todos devem estar disponíveis
5. Para RR: basta um qualificado disponível

---

## Routing Forms

App: `packages/app-store/routing-forms/`

**Propósito:** formulário pré-booking com lógica condicional → roteia para event type ou usuário correto.

### Fluxo

```
Booker preenche form
    └─ processRoute() avalia regras em ordem
         └─ usa react-awesome-query-builder + jsonLogic
              └─ primeira regra que bate → action (eventType | customPage | externalRedirect)
              └─ fallback route sempre no fim
```

### Arquivo chave

```typescript
// packages/app-store/routing-forms/lib/processRoute.tsx
export function processRoute({ form, response }) {
  // ordena rotas: não-fallback primeiro, fallback por último
  // para cada rota: aplica jsonLogic com respostas do form
  // retorna decidedAction: { type, value } ou null
}
```

### Tipos de action

| type | value |
|------|-------|
| `eventTypeRedirectUrl` | slug do event type |
| `customPageMessage` | mensagem custom (sem booking) |
| `externalRedirectUrl` | URL externa |

### Integração com RR

Quando routing form roteia para um event type de time, pode passar `routedTeamMemberIds` — lista de membros pré-selecionados pelo form. `loadAndValidateUsers` usa esse parâmetro para filtrar os hosts qualificados antes de aplicar RR.

---

## Managed Event Types

**Conceito:** owner (admin do time) cria um event type pai (`schedulingType=MANAGED`). O sistema distribui cópias (filhos) para cada membro do time.

**Campos relevantes:**
```typescript
EventType.parentId      // ID do managed event pai
EventType.parent        // relação com o pai
```

**Comportamento:**
- Membro pode customizar campos permitidos pelo pai (ex: localização, descrição)
- Campos bloqueados pelo pai não podem ser editados
- Quando pai muda, filhos são sincronizados via `ManagedEventReassignment`

---

## Collective — como funciona na prática

```
EventType.schedulingType = COLLECTIVE
Hosts: Alice (isFixed=true), Bob (isFixed=true), Carol (isFixed=true)

Slot 10h aparece na página pública SOMENTE se:
  Alice.available(10h) AND Bob.available(10h) AND Carol.available(10h)

Booking cria reunião com Alice + Bob + Carol todos como participantes
```

---

## Round Robin com pesos — exemplo

```
EventType.isRRWeightsEnabled = true
Hosts:
  Alice: weight=200  (recebe 2× mais bookings)
  Bob:   weight=100

Distribuição esperada ao longo do tempo:
  Alice: 66% dos bookings
  Bob:   33% dos bookings

QualifiedHostsService recalcula quem está "abaixo da cota" e prioriza
```

---

## Arquivos de referência

| Arquivo | Responsabilidade |
|---------|-----------------|
| `packages/features/bookings/lib/handleNewBooking/loadAndValidateUsers.ts` | Pipeline completo de seleção de hosts |
| `packages/features/bookings/lib/handleNewBooking/ensureAvailableUsers.ts` | Verificação de disponibilidade por host |
| `packages/features/host/services/EventTypeHostService.ts` | CRUD de hosts, paginação, pesos |
| `packages/features/host/repositories/HostRepository.ts` | Queries Prisma de hosts |
| `packages/features/di/containers/QualifiedHosts.ts` | DI container — noOp no OSS |
| `packages/app-store/routing-forms/lib/processRoute.tsx` | Avaliação de regras do routing form |
| `packages/app-store/routing-forms/lib/getQueryBuilderConfig.ts` | Config do query builder (campos disponíveis) |
| `packages/prisma/schema.prisma` (linhas 42-46, 230-280) | Enums e campos do EventType |

---

## Lacunas e próximos testes E2E

- [ ] Criar event type COLLECTIVE com 2 hosts e verificar que slot desaparece quando um fica indisponível
- [ ] Criar event type RR com pesos e verificar distribuição ao longo de N bookings
- [ ] Criar routing form → validar redirecionamento para event type correto por resposta
- [ ] Managed event: alterar campo no pai → verificar propagação para filhos
- [ ] `rescheduleWithSameRoundRobinHost=true`: verificar que reagendamento mantém mesmo host
