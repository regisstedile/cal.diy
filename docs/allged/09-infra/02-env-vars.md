# Variáveis de Ambiente

## Arquivo Principal

`/home/regis/stack/.env`

## Cal-src (App Web)

### Build Args (compiladas no build)

| Variável | Exemplo | Descrição |
|---------|---------|-----------|
| `NEXT_PUBLIC_WEBAPP_URL` | `https://cal.allged.com.br` | URL pública do app |
| `NEXT_PUBLIC_API_V2_URL` | `https://cal.allged.com.br/api/v2` | URL da API |
| `DATABASE_URL` | `postgresql://cal_src:xxx@postgres:5432/cal_src` | Banco de dados |
| `NEXTAUTH_SECRET` | string aleatória 32 chars | Segredo de sessão |
| `CALENDSO_ENCRYPTION_KEY` | string 32 chars | Chave de criptografia |
| `ORGANIZATIONS_ENABLED` | `1` | Habilita orgs |
| `NEXT_PUBLIC_SINGLE_ORG_SLUG` | (vazio) | Slug da org (Single-Org-Mode) |
| `SKIP_ADMIN_2FA_REQUIREMENT` | `true` | Pula 2FA para admin |

### Runtime (passadas ao container)

| Variável | Descrição |
|---------|-----------|
| `DATABASE_URL` | Conexão com banco |
| `DATABASE_DIRECT_URL` | Conexão direta (sem proxy) |
| `NEXTAUTH_URL` | URL do NextAuth (= WEBAPP_URL) |
| `NEXTAUTH_SECRET` | Mesmo do build |
| `CALENDSO_ENCRYPTION_KEY` | Mesmo do build |
| `CALCOM_TELEMETRY_DISABLED` | `1` = desabilita telemetria |

### Opcionais

| Variável | Descrição |
|---------|-----------|
| `EMAIL_FROM` | Remetente dos emails |
| `EMAIL_SERVER_HOST` | SMTP host |
| `EMAIL_SERVER_PORT` | SMTP porta |
| `EMAIL_SERVER_USER` | SMTP usuário |
| `EMAIL_SERVER_PASSWORD` | SMTP senha |
| `GOOGLE_API_CREDENTIALS` | JSON das credenciais Google |
| `DAILY_API_KEY` | API Key do Daily.co (Cal Video) |

## Banco de Dados

| Variável | Valor |
|---------|-------|
| `CAL_SRC_DB_USER` | `cal_src` |
| `CAL_SRC_DB_PASSWORD` | (ver .env) |
| `CAL_SRC_DB_NAME` | `cal_src` |
| `CAL_DB_USER` | `cal` |
| `CAL_DB_NAME` | `cal` |

## App Mobile (companion)

| Variável | Descrição |
|---------|-----------|
| `EXPO_PUBLIC_CAL_URL` | `https://cal.allged.com.br` |
| `EXPO_PUBLIC_CALCOM_CLIENT_ID` | ID do OAuth client |
| `EXPO_PUBLIC_CALCOM_CLIENT_SECRET` | Secret do OAuth client |

**ATENÇÃO**: Variáveis `EXPO_PUBLIC_*` ficam visíveis no APK compilado.

## Como Atualizar

1. Editar `/home/regis/stack/.env`
2. Se for build arg: `docker compose build cal-src`
3. Se for runtime env: `docker compose up -d cal-src`

## NEXTAUTH_SECRET e ENCRYPTION_KEY

Geração:
```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# CALENDSO_ENCRYPTION_KEY (exatamente 32 chars)
openssl rand -base64 24
```

Se mudar o NEXTAUTH_SECRET: todas as sessões ativas são invalidadas (usuários precisam logar novamente).

Se mudar o ENCRYPTION_KEY: credenciais salvas (Google Calendar, etc.) ficam ilegíveis.
