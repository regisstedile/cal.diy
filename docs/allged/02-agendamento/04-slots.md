# Slots — Cálculo de Disponibilidade

## O que é um Slot

Um slot é uma janela de tempo onde um booking pode ser criado. Exemplo: 14:00–15:00 no dia 23/05/2026.

## API de Slots

```
GET /api/trpc/slots/getSchedule?input={
  "eventTypeId": 123,
  "startTime": "2026-05-23T00:00:00Z",
  "endTime": "2026-05-30T00:00:00Z",
  "timeZone": "America/Sao_Paulo"
}

Response: {
  "slots": {
    "2026-05-23": [
      { "time": "2026-05-23T14:00:00Z" },
      { "time": "2026-05-23T15:00:00Z" }
    ],
    "2026-05-24": [...]
  }
}
```

## Algoritmo de Cálculo

```
1. Para cada dia no range pedido:
   a. Pega janelas do Schedule (dias da semana + overrides)
   b. Converte para UTC usando timezone do host
   c. Gera todos os slots possíveis (intervalos de `slotInterval` ou `length`)
   d. Remove slots que colidem com:
      - Busy times do calendário externo (CalendarCache)
      - Bookings existentes (status ACCEPTED/PENDING)
      - Buffer antes/depois de outros eventos
   e. Remove slots antes do minimumBookingNotice
   f. Verifica limites diários/semanais
   g. Retorna slots livres
```

## SelectedSlots — Reserva Temporária

Quando o cliente seleciona um slot no booker mas ainda não submeteu o formulário, o sistema reserva temporariamente via `SelectedSlots`:

```sql
INSERT INTO "SelectedSlots" (uid, "slotUtcStartDate", "slotUtcEndDate", "eventTypeId", "userId", "releaseAt")
VALUES (..., NOW() + INTERVAL '5 minutes')
```

Slots reservados são excluídos do cálculo para outros clientes. Após 5 min sem confirmação, o `releaseAt` expira e o slot fica disponível novamente.

## Intervalo de Slots

Controlado por `EventType.slotInterval` (minutos):
- `null` → intervalo = duração do evento (`length`)
- `15` → slots a cada 15 min (ex: 09:00, 09:15, 09:30...)

## ROUND_ROBIN — Múltiplos Hosts

Para event types de equipe com `schedulingType = ROUND_ROBIN`:

```
1. Busca todos os hosts do event type
2. Para cada slot, verifica quais hosts estão disponíveis
3. Slot aparece disponível se pelo menos 1 host está livre
4. Na criação do booking, usa algoritmo "lucky user" para escolher o host
```

### Algoritmo Lucky User (Round-Robin)

Escolhe o host que:
1. Está disponível no slot
2. Tem menos bookings recentes (equilíbrio de carga)
3. Em caso de empate, usa prioridade configurada

Código: `packages/features/bookings/lib/getLuckyUser.ts`

## Código Relevante

- Cálculo principal: `packages/features/slots/`
- SelectedSlots handler: `packages/trpc/server/routers/viewer/slots/`
- Lucky user: `packages/features/bookings/lib/getLuckyUser.ts`
