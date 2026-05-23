# Banco de Dados

## Dois Bancos PostgreSQL

| Banco | Usuário | Propósito |
|-------|---------|-----------|
| `cal_src` | `cal_src` | **Principal** — todos os dados da aplicação |
| `cal` | `cal` | PlatformOAuthClient (integração Platform API) |

A maioria das operações usa `cal_src`. O banco `cal` existe apenas para o modelo `PlatformOAuthClient` (OAuth clients para integração externa via API Platform).

## Conexão

```
DATABASE_URL=postgresql://cal_src:<senha>@postgres:5432/cal_src
DATABASE_DIRECT_URL=postgresql://cal_src:<senha>@postgres:5432/cal_src
```

## Modelos Principais (102 no total)

### Core de Agendamento

| Modelo | Descrição |
|--------|-----------|
| `EventType` | Tipo de evento: duração, slug, título, disponibilidade |
| `Booking` | Agendamento: quem, quando, status, tipo |
| `Attendee` | Participante de um booking |
| `BookingReference` | Referência externa (Google Calendar event ID, etc.) |
| `BookingSeat` | Para eventos com vagas (seated events) |
| `Schedule` | Conjunto de disponibilidades nomeado |
| `Availability` | Janelas de disponibilidade dentro de um Schedule |
| `SelectedCalendar` | Calendários que o usuário quer verificar como ocupados |
| `DestinationCalendar` | Onde salvar novos bookings |

### Usuários e Organizações

| Modelo | Descrição |
|--------|-----------|
| `User` | Usuário principal: email, username, role, organizationId |
| `Profile` | Perfil dentro de uma org (username diferente por org) |
| `Team` | Times E organizações (distinguidos por `isOrganization`) |
| `Membership` | Vínculo User ↔ Team com role (OWNER/ADMIN/MEMBER) |
| `OrganizationSettings` | Configurações específicas de org |

### Autenticação

| Modelo | Descrição |
|--------|-----------|
| `Account` | Contas OAuth vinculadas (Google, Microsoft) |
| `Session` | Sessões NextAuth |
| `VerificationToken` | Tokens de verificação de email |
| `UserPassword` | Hash da senha |

### Integrações

| Modelo | Descrição |
|--------|-----------|
| `Credential` | Credenciais de apps (Google Calendar, Zoom, etc.) |
| `App` | Apps instalados na instância |
| `Webhook` | Webhooks configurados por usuário/equipe |
| `ApiKey` | Chaves de API |
| `OAuthClient` | Clientes OAuth da plataforma |
| `AccessToken` / `RefreshToken` | Tokens OAuth Platform |

### Analytics

| Modelo | Descrição |
|--------|-----------|
| `BookingDenormalized` | Tabela desnormalizada para queries de insights rápidas |

### Feature Flags

| Modelo | Descrição |
|--------|-----------|
| `Feature` | Flags globais (slug, enabled, type) |
| `UserFeatures` | Override de flag por usuário |
| `TeamFeatures` | Override de flag por time |

## View Especial: BookingTimeStatusDenormalized

Não é uma tabela — é uma **view** construída sobre `BookingDenormalized`:

```sql
-- timeStatus calculado em tempo real:
CASE
  WHEN status = 'cancelled' THEN 'cancelled'
  WHEN status = 'rescheduled' THEN 'rescheduled'
  WHEN "endTime" < NOW() AND status = 'accepted' THEN 'completed'
  ELSE 'uncompleted'
END as "timeStatus"
```

Usada pelo dashboard de insights para categorizar bookings sem necessidade de field extra no DB.

## Migrations

```bash
# Criar nova migration
cd cal-diy && yarn prisma migrate dev --name nome_da_migration

# Aplicar em produção (dentro do container)
yarn workspace @calcom/prisma db-deploy

# Gerar tipos TypeScript após schema change
yarn prisma generate
```

Arquivos em: `packages/prisma/migrations/`

## Dados Atuais (cal_src)

```sql
-- Usuários
SELECT COUNT(*) FROM users;  -- 3

-- Bookings
SELECT COUNT(*) FROM "Booking";  -- 10

-- Organização
SELECT id, name, slug FROM "Team" WHERE "isOrganization" = true;
-- id=2, name=allged, slug=allged

-- Feature flags ativos
SELECT slug, enabled FROM "Feature" WHERE enabled = true;
```
