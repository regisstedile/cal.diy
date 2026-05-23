# Booking Flow — Fluxo de Agendamento

## Visão Geral

```
Cliente acessa URL pública
    │
    ├─ Booker carrega EventType
    │   └─ Busca slots disponíveis
    │
    ├─ Cliente seleciona slot
    │
    ├─ Cliente preenche formulário (nome, email, campos customizados)
    │
    ├─ POST /api/book/event
    │   ├─ Valida slot ainda disponível
    │   ├─ Cria Booking no DB
    │   ├─ Cria evento no calendário (Google, Outlook, etc.)
    │   ├─ Envia email de confirmação
    │   └─ Dispara webhooks configurados
    │
    └─ Página de confirmação
```

## Status de Booking

| Status | Descrição |
|--------|-----------|
| `PENDING` | Aguardando confirmação do host |
| `ACCEPTED` | Confirmado |
| `REJECTED` | Rejeitado pelo host |
| `CANCELLED` | Cancelado (pelo cliente ou host) |
| `AWAITING_HOST` | Aguarda pagamento ou ação do host |

## timeStatus (View calculada)

Calculado em tempo real na view `BookingTimeStatusDenormalized`:

| timeStatus | Condição |
|-----------|----------|
| `completed` | status=ACCEPTED e endTime < agora |
| `uncompleted` | status=ACCEPTED e endTime >= agora |
| `cancelled` | status=CANCELLED |
| `rescheduled` | status=CANCELLED com rescheduledTo preenchido |

## Fluxo Detalhado

### 1. Carregamento do Booker

```
GET /api/trpc/public/event?input={"username":"weliton","eventSlug":"visita-tecnica"}
  → Retorna EventType com todos os campos públicos

GET /api/trpc/slots/getSchedule
  → Calcula slots disponíveis para os próximos N dias
  → Considera: Schedule do usuário, busy times do calendário, bookings existentes
```

### 2. Seleção de Slot

O cliente vê calendário com slots livres. Ao selecionar:
- Slot é reservado temporariamente em `SelectedSlots` (evita double-booking)
- Formulário de dados é exibido

### 3. Submissão

```
POST /api/book/event
Body: {
  start: "2026-05-21T14:00:00Z",
  end: "2026-05-21T15:00:00Z",
  eventTypeId: 123,
  responses: {
    name: "João Silva",
    email: "joao@email.com",
    location: { optionValue: "", value: "inPerson" },
    notes: "..."
  },
  timeZone: "America/Sao_Paulo",
  language: "pt-BR"
}
```

### 4. Processamento

Dentro do handler de booking:

1. **Validação**: slot ainda livre? event type existe? usuário ativo?
2. **Seleção de host**: para ROUND_ROBIN, escolhe o host disponível (algoritmo lucky user)
3. **Criação do Booking**: `prisma.booking.create()`
4. **Calendar Event**: cria evento no calendário do host via Credential
5. **BookingReference**: salva ID externo (Google Event ID, etc.)
6. **Email**: envia para attendee + host (templates i18n)
7. **Webhooks**: dispara para todos os webhooks `BOOKING_CREATED`
8. **BookingDenormalized**: atualiza tabela desnormalizada para insights

### 5. Cancelamento / Reagendamento

- Cliente acessa `/booking/[uid]/cancel` com o UID do booking
- Booking status muda para CANCELLED
- Evento removido do calendário externo
- Email de cancelamento enviado
- Webhooks `BOOKING_CANCELLED` disparados
- Reagendamento cria novo booking e referencia o anterior via `fromReschedule`

## Campos do Modelo Booking

| Campo | Descrição |
|-------|-----------|
| `uid` | UUID público (usado em URLs de confirmação/cancelamento) |
| `title` | Título do booking |
| `startTime` | Início (UTC) |
| `endTime` | Fim (UTC) |
| `status` | PENDING/ACCEPTED/REJECTED/CANCELLED |
| `userId` | Host |
| `eventTypeId` | Tipo do evento |
| `fromReschedule` | UID do booking original (se reagendamento) |
| `location` | Local/link escolhido |
| `description` | Notas do cliente |
| `customInputs` | Respostas de campos customizados (legado) |
| `responses` | Respostas dos campos (novo formato JSON) |

## Código Relevante

- Handler de criação: `packages/features/bookings/lib/handleNewBooking/`
- Handler de cancelamento: `packages/features/bookings/lib/handleCancelBooking.ts`
- tRPC router: `packages/trpc/server/routers/viewer/bookings/`
- Página de bookings: `apps/web/app/(use-page-wrapper)/(main-nav)/bookings/`
