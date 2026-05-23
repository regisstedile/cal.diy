# Disponibilidade (Availability)

## Conceitos

### Schedule

Um **Schedule** é um conjunto nomeado de janelas de disponibilidade. Cada usuário pode ter múltiplos schedules mas só um é o "padrão".

```
Schedule: "Horário Comercial"
  ├─ Availability: Segunda-Sexta, 09:00–12:00
  ├─ Availability: Segunda-Sexta, 13:00–18:00
  └─ Availability (override): 25/12/2026 — não disponível
```

### Availability

Cada `Availability` define:
- `days`: array de dias da semana (0=Dom, 1=Seg, ... 6=Sáb)
- `startTime`: hora de início
- `endTime`: hora de fim
- `date`: se preenchido, é um override de data específica

### SelectedCalendar

Calendários externos que o sistema deve verificar para calcular "busy times". Se o Google Calendar do técnico tem uma reunião às 14h, esse slot não aparece disponível.

### DestinationCalendar

Onde novos bookings são salvos. Por padrão é o primeiro calendário conectado.

## Como os Slots São Calculados

```
Slots disponíveis = 
  Janelas do Schedule
  - Busy times (calendários externos + bookings existentes)
  - Buffer antes/depois de eventos
  - Antecedência mínima (minimumBookingNotice)
  - Limite de bookings por dia/semana
```

### Busy Times

Fontes de ocupação:
1. **Bookings existentes** no sistema (status ACCEPTED/PENDING)
2. **Eventos do calendário externo** (Google, Outlook, etc.) — via `CalendarCache`
3. **Out-of-Office** entries

### CalendarCache

Para evitar chamar a API do Google a cada request de slots, os eventos externos são cacheados na tabela `CalendarCache`. Expiram após um período configurável.

## Timezone

**Todos os dados no DB são em UTC.** Conversão para o timezone do usuário/cliente acontece na camada de apresentação.

- Host: timezone configurado no perfil
- Cliente: timezone detectado automaticamente no booker
- Slots são calculados no timezone do host e convertidos para o cliente

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.availability.list` | Lista schedules do usuário |
| `viewer.availability.schedule.get` | Busca schedule por ID |
| `viewer.availability.schedule.create` | Cria schedule |
| `viewer.availability.schedule.update` | Atualiza schedule |
| `viewer.slots.getSchedule` | Calcula slots disponíveis (público) |

## Configuração via UI

Settings → Disponibilidade → Editar schedule

- Configurar dias e horários
- Adicionar overrides de datas específicas (feriados, férias)
- Definir timezone do schedule

## Código Relevante

- Cálculo de slots: `packages/features/slots/`
- Schedule service: `packages/features/schedules/`
- Calendário cache: `packages/features/calendar-cache-sql/`
- tRPC availability: `packages/trpc/server/routers/viewer/availability/`
