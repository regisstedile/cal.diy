# Docker Compose — Infraestrutura

## Arquivo

`/home/regis/stack/docker-compose.yml`

## Serviços Relevantes

### postgres

```yaml
image: postgres:14
ports: 5432:5432
volumes: ./volumes/postgres:/var/lib/postgresql/data
```

Bancos criados automaticamente:
- `cal_src` — app principal
- `cal` — platform oauth
- `n8n`, `chatwoot`, `baserow` — outros serviços

### redis

```yaml
image: redis:7
ports: 6379:6379
volumes: ./volumes/redis:/data
```

### cal-src (App Web)

```yaml
build:
  context: ./cal-diy
  dockerfile: Dockerfile
  args:
    NEXT_PUBLIC_WEBAPP_URL: ${CAL_SRC_WEBAPP_URL}
    DATABASE_URL: postgresql://${CAL_SRC_DB_USER}:${CAL_SRC_DB_PASSWORD}@postgres:5432/${CAL_SRC_DB_NAME}
    ORGANIZATIONS_ENABLED: "1"
    NEXT_PUBLIC_SINGLE_ORG_SLUG: ${CAL_SRC_ORG_SLUG}
    SKIP_ADMIN_2FA_REQUIREMENT: "true"
ports: 3005:3000
```

**Rebuild necessário** após mudanças no código (`~/stack $ docker compose build cal-src`). Duração: ~16 minutos.

### n8n

```yaml
ports: 5678:5678
volumes: ./volumes/n8n:/home/node/.n8n
```

Automações e integração com cal-src via webhooks.

### chatwoot

```yaml
ports: 3010:3000
```

CRM/chat. Proxy nginx na porta 7777.

## Comandos

```bash
# Status de todos os serviços
docker compose ps

# Logs do cal-src
docker compose logs -f cal-src

# Rebuild e restart do cal-src
docker compose build cal-src && docker compose up -d cal-src

# Restart sem rebuild
docker compose restart cal-src

# Acessar banco cal_src
docker exec postgres psql -U cal_src -d cal_src
```

## Volumes Persistentes

| Volume | Conteúdo |
|--------|---------|
| `./volumes/postgres` | Todos os dados do PostgreSQL |
| `./volumes/redis` | Cache Redis |
| `./volumes/n8n` | Workflows e config n8n |
| `./volumes/chatwoot/storage` | Anexos do Chatwoot |

## Rede

Todos os serviços compartilham a rede Docker padrão. Se comunicam via nome do serviço:
- `postgres:5432`
- `redis:6379`
- `n8n:5678`

## Traefik / nginx

Proxy reverso na frente de todos os serviços, gerencia:
- HTTPS (Let's Encrypt)
- Roteamento por domínio/subdomínio
- `cal.allged.com.br` → `localhost:3005`
