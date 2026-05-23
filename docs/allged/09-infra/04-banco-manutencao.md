# Manutenção do Banco de Dados

## Acesso

```bash
# Banco principal (cal_src)
docker exec -it postgres psql -U cal_src -d cal_src

# Banco platform (cal)
docker exec -it postgres psql -U cal -d cal
```

## Queries Úteis

```sql
-- Usuários e organização
SELECT id, email, username, role, "organizationId" FROM users ORDER BY id;

-- Bookings recentes
SELECT id, uid, title, status, "startTime", "userId" 
FROM "Booking" 
ORDER BY "startTime" DESC 
LIMIT 10;

-- Feature flags
SELECT slug, enabled, type FROM "Feature" ORDER BY slug;

-- Organização
SELECT id, name, slug, "isOrganization" FROM "Team" WHERE "isOrganization" = true;

-- Memberships da org
SELECT u.email, m.role, m.accepted 
FROM "Membership" m 
JOIN users u ON m."userId" = u.id 
WHERE m."teamId" = 2;

-- Credenciais (sem expor key)
SELECT id, "userId", type, "appId" FROM "Credential";
```

## Migrations Prisma

```bash
# Dentro do container cal-src
docker exec cal-src yarn workspace @calcom/prisma db-deploy

# Criar nova migration (no host, em cal-diy/)
cd /home/regis/stack/cal-diy
yarn prisma migrate dev --name nome_descritivo

# Gerar tipos TypeScript (após schema change)
yarn prisma generate

# Ver status das migrations
docker exec postgres psql -U cal_src -d cal_src \
  -c 'SELECT id, "checksum", "started_at", "applied_steps_count" FROM "_prisma_migrations" ORDER BY "started_at" DESC LIMIT 10;'
```

## Backup

```bash
# Backup completo do cal_src
docker exec postgres pg_dump -U cal_src cal_src > /home/regis/backups/cal_src_$(date +%Y%m%d).sql

# Backup só de tabelas específicas
docker exec postgres pg_dump -U cal_src cal_src \
  -t "Booking" -t "User" -t "EventType" \
  > /home/regis/backups/cal_src_core_$(date +%Y%m%d).sql
```

## Restore

```bash
# Restore completo (CUIDADO: sobrescreve tudo)
docker exec -i postgres psql -U cal_src -d cal_src < backup.sql
```

## Inspecionar Dados de Insights

```sql
-- Bookings desnormalizados (usados pelos insights)
SELECT id, title, status, "timeStatus", "startTime", "userId", "teamId"
FROM "BookingTimeStatusDenormalized"
WHERE "startTime" > NOW() - INTERVAL '30 days'
ORDER BY "startTime" DESC;

-- KPIs manuais do período
SELECT 
  "timeStatus",
  COUNT(*) as total
FROM "BookingTimeStatusDenormalized"
WHERE "startTime" BETWEEN '2026-05-01' AND '2026-05-31'
GROUP BY "timeStatus";
```

## Adicionar Usuário Manualmente

```sql
-- Criar usuário (senha deve ser hash bcrypt)
-- Usar interface admin (/settings/admin/users) se possível
-- Ou via API: POST /api/v2/users (admin)
```
