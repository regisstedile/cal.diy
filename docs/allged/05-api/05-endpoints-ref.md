# API — Referência de Endpoints

## Base URLs

| API | Base URL |
|-----|----------|
| REST v2 | `https://cal.allged.com.br/api/v2` |
| tRPC | `https://cal.allged.com.br/api/trpc` |
| v1 legacy | `https://cal.allged.com.br/api/v1` |

## Autenticação

### API Key (v1 + v2)
```
Authorization: Bearer cal_xxxxxxx
```

### OAuth Bearer (v2 + mobile)
```
Authorization: Bearer eyJhbGc...
```

---

## REST v2 — Bookings

### Listar bookings
```
GET /api/v2/bookings
Query: status, limit, cursor, attendeeEmail, eventTypeId
```

### Criar booking
```
POST /api/v2/bookings
Body: { eventTypeId, start, attendee: { name, email, timeZone } }
```

### Obter booking
```
GET /api/v2/bookings/:bookingId
```

### Cancelar booking
```
DELETE /api/v2/bookings/:bookingId
Body: { reason? }
```

### Reagendar booking
```
PATCH /api/v2/bookings/:bookingId/reschedule
Body: { rescheduledTo }
```

---

## REST v2 — Event Types

### Listar event types do usuário
```
GET /api/v2/event-types
```

### Criar event type
```
POST /api/v2/event-types
Body: { title, slug, length, description? }
```

### Obter event type
```
GET /api/v2/event-types/:eventTypeId
```

---

## REST v2 — Disponibilidade

### Buscar slots disponíveis
```
GET /api/v2/slots/available
Query: eventTypeId, startTime, endTime, timeZone
```

---

## REST v2 — Perfil

### Obter perfil do usuário logado
```
GET /api/v2/me
```

---

## REST v1 — Legado

```
GET  /api/v1/bookings          # Lista bookings
GET  /api/v1/booking/:id       # Booking específico  
DELETE /api/v1/booking/:id     # Cancelar
GET  /api/v1/event-types       # Listar event types
GET  /api/v1/availability      # Verificar disponibilidade
GET  /api/v1/schedules         # Listar horários
```

---

## tRPC — Principais Routers

```
viewer.me                      # Dados do usuário logado
viewer.eventTypes.list         # Event types do usuário
viewer.bookings.get            # Buscar bookings com filtros
viewer.availability.list       # Disponibilidade
viewer.teams.list              # Times do usuário

viewer.insights.bookingKPIStats          # KPIs dos insights
viewer.insights.bookingOverTime          # Bookings ao longo do tempo
viewer.insights.membersWithMostBookings  # Ranking de membros
viewer.insights.popularEventTypes        # Event types populares

viewer.organizations.create    # Criar organização
viewer.organizations.update    # Atualizar organização
viewer.organizations.listMembers # Listar membros
viewer.organizations.inviteMember # Convidar membro
```

---

## Webhooks de Saída

Configurados em `/settings/developer/webhooks`.

### Eventos disponíveis

| Evento | Quando |
|--------|--------|
| `BOOKING_CREATED` | Novo booking confirmado |
| `BOOKING_RESCHEDULED` | Booking reagendado |
| `BOOKING_CANCELLED` | Booking cancelado |
| `BOOKING_REQUESTED` | Booking pendente de aprovação |
| `BOOKING_REJECTED` | Booking rejeitado |
| `MEETING_ENDED` | Reunião encerrada |
| `FORM_SUBMITTED` | Formulário de roteamento submetido |

### Payload exemplo (`BOOKING_CREATED`)

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "payload": {
    "uid": "abc123",
    "type": "Manutenção",
    "startTime": "2026-05-25T14:00:00Z",
    "endTime": "2026-05-25T15:00:00Z",
    "organizer": { "name": "Weliton", "email": "tecnicoastoria@gmail.com" },
    "attendees": [{ "name": "João Silva", "email": "cliente@example.com" }]
  }
}
```

---

## API Keys na ALLGED

```sql
-- Ver API keys cadastradas
SELECT "userId", "note", "expiresAt", "lastUsedAt"
FROM "ApiKey"
ORDER BY "createdAt" DESC;
```

Criar via `/settings/developer/api-keys`.
