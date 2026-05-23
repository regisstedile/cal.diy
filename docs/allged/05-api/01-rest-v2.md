# API REST v2

## Base URL

```
https://cal.allged.com.br/api/v2
```

## Autenticação

### API Key

```http
GET /api/v2/me
Authorization: Bearer cal_xxxxxxxxxxxxxxxx
```

Criar em: `/settings/developer/api-keys`

### OAuth Bearer Token

```http
GET /api/v2/me
Authorization: Bearer {access_token_oauth}
```

## Headers Padrão

```http
Content-Type: application/json
Authorization: Bearer {token}
cal-api-version: 2024-08-13
```

## Endpoints Principais

### Usuário

```
GET    /api/v2/me                    Dados do usuário atual
PATCH  /api/v2/me                    Atualizar perfil
```

### Bookings

```
GET    /api/v2/bookings              Listar bookings
POST   /api/v2/bookings              Criar booking
GET    /api/v2/bookings/{uid}        Buscar booking
PATCH  /api/v2/bookings/{uid}        Atualizar booking
DELETE /api/v2/bookings/{uid}/cancel Cancelar booking
POST   /api/v2/bookings/{uid}/reschedule Reagendar
POST   /api/v2/bookings/{uid}/confirm    Confirmar
POST   /api/v2/bookings/{uid}/decline    Rejeitar
```

### Event Types

```
GET    /api/v2/event-types           Listar event types
POST   /api/v2/event-types           Criar event type
GET    /api/v2/event-types/{id}      Buscar event type
PATCH  /api/v2/event-types/{id}      Atualizar
DELETE /api/v2/event-types/{id}      Deletar
```

### Schedules / Disponibilidade

```
GET    /api/v2/schedules             Listar schedules
POST   /api/v2/schedules             Criar schedule
GET    /api/v2/schedules/{id}        Buscar schedule
PATCH  /api/v2/schedules/{id}        Atualizar
DELETE /api/v2/schedules/{id}        Deletar
```

### Calendários

```
GET    /api/v2/calendars             Listar calendários
GET    /api/v2/calendars/busy-times  Busy times
```

### Slots

```
GET    /api/v2/slots/available       Slots disponíveis
```

## Criar Booking via API

```bash
curl -X POST https://cal.allged.com.br/api/v2/bookings \
  -H "Authorization: Bearer cal_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "start": "2026-05-25T14:00:00Z",
    "eventTypeId": 1,
    "attendee": {
      "name": "João Silva",
      "email": "joao@email.com",
      "timeZone": "America/Sao_Paulo"
    }
  }'
```

## Paginação

```
GET /api/v2/bookings?cursor=50&limit=50&status=upcoming
```

## Referência Completa

Os scrapes dos 350+ endpoints estão em:
`docs/cal.com/docs-api-reference-v2-*.md`

Ou acesse a OpenAPI spec em:
`docs/api-reference/v2/openapi.json`
