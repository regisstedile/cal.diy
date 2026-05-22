# Cal.diy — Fork ALLGED

Fork customizado do [Cal.diy](https://github.com/calcom/cal.diy) para agendamento interno da ALLGED, rodando em [cal.allged.com.br](https://cal.allged.com.br).

---

## O que é isso?

Cal.diy é um fork open-source do Cal.com (100% MIT, sem código Enterprise). Este repositório é a versão customizada da ALLGED, com funcionalidades adicionadas sobre o upstream.

---

## Funcionalidades customizadas

| Feature | Status | Descrição |
|---------|--------|-----------|
| **CancellationReason** | ✅ completo | Campo obrigatório de motivo de cancelamento por evento. Enum `CancellationReasonRequirement` (`MANDATORY_HOST_ONLY`, `MANDATORY_ALL`, `OPTIONAL`, `DISABLED`). Campo `requiresCancellationReason` em `EventType`. |
| **Organizations** | ✅ ativo | Org `tecnicos-allged` habilitada. Páginas de settings, membros, convite e SSO. |
| **Teams** | ✅ ativo | Páginas de booking de time, gerenciamento de membros, aba no settings. |
| **Routing Forms** | ✅ ativo | Port do Cal.com v4.4.2. |
| **Insights** | ✅ ativo | Dashboard de bookings. Admin vê todos os dados via scope `org`. |
| **API v2 (NestJS)** | ✅ ativo | Rodando em container `cal-api-v2:5555`. Proxy via `/v2/[...slug]` em Next.js. |
| **Companion App** | 🚧 em build | App mobile Expo para agendamento. OAuth via OAuthClient. |

---

## Arquitetura de deploy

```
Internet
  └─ Cloudflare (proxy)
       └─ Traefik (reverse proxy, TLS)
            ├─ cal.allged.com.br  → container cal-src:3000   (Next.js)
            │                          └─ /v2/*  → cal-api-v2:5555 (NestJS proxy)
            └─ (outros serviços)

cal-src → postgres:5432 (banco cal_src)
cal-src → redis:6379
cal-api-v2 → postgres:5432
cal-api-v2 → redis:6379
```

---

## Setup local (Docker Compose)

### Pré-requisitos

- Docker + Docker Compose v2
- Arquivo `/home/regis/stack/.env` com as variáveis abaixo

### Variáveis de ambiente necessárias

```env
# Banco de dados
CAL_SRC_DB_USER=cal_src
CAL_SRC_DB_PASSWORD=<senha>
CAL_SRC_DB_NAME=cal_src

# Auth
CAL_SRC_NEXTAUTH_SECRET=<openssl rand -base64 32>
CAL_SRC_ENCRYPTION_KEY=<openssl rand -base64 24>   # exatamente 32 chars

# URLs
CAL_SRC_WEBAPP_URL=https://cal.allged.com.br

# Organização
CAL_SRC_ORG_SLUG=tecnicos-allged

# Timezone
TZ=America/Sao_Paulo
```

### Subir os serviços

```bash
cd /home/regis/stack

# Primeira vez: build das imagens
docker compose build cal-src cal-api-v2

# Subir tudo
docker compose up -d

# Verificar saúde
docker compose ps
```

### Rebuild após mudanças

```bash
# Reconstruir só o web (Next.js)
docker compose build cal-src
docker compose up -d --force-recreate cal-src

# Reconstruir só a API v2 (NestJS)
docker compose build cal-api-v2
docker compose up -d --force-recreate cal-api-v2
```

---

## Desenvolvimento local

```bash
cd /home/regis/stack/cal-diy

# Instalar dependências
node .yarn/releases/yarn-4.12.0.cjs install

# Variáveis de desenvolvimento (copiar e ajustar)
cp .env.example .env

# Banco local (necessário postgres rodando)
node .yarn/releases/yarn-4.12.0.cjs workspace @calcom/prisma db-migrate

# Dev server (Next.js)
node .yarn/releases/yarn-4.12.0.cjs dev
```

---

## API v2 (NestJS)

A API v2 roda como container separado. O Next.js faz proxy de `/v2/*` para ela via route handler em `apps/web/app/v2/[...slug]/route.ts`.

### Proxy flow

```
Cliente → GET https://cal.allged.com.br/v2/me
       → Next.js app/v2/[...slug]/route.ts  (runtime proxy)
       → http://cal-api-v2:5555/v2/me       (NestJS interno)
       → 401 (precisa de Bearer token OAuth)
```

### Autenticação OAuth

O Companion App usa OAuth. O OAuthClient foi criado no banco com:

- `clientId`: `94539bd8dd1e0e2d2d9bff78bece6d708176d10acb736de009b9677f5968bbc5`
- `type`: `public`
- `redirectUri`: `expo-wxt-app://oauth/callback`

Para criar um novo client: acesse `/settings/developer/oauth` no painel.

---

## Companion App (mobile)

App Expo em `/home/regis/stack/companion/apps/mobile`.

### Build APK (preview)

```bash
cd /home/regis/stack/companion/apps/mobile

# Login Expo (uma vez)
eas login

# Vincular projeto (uma vez)
eas init

# Build APK para testar no celular
eas build --platform android --profile preview --non-interactive
```

### Configuração

Arquivo `.env` em `apps/mobile/`:

```env
EXPO_PUBLIC_CALCOM_APP_URL=https://cal.allged.com.br
EXPO_PUBLIC_CALCOM_API_URL=https://cal.allged.com.br
EXPO_PUBLIC_CALCOM_WEB_URL=https://cal.allged.com.br
EXPO_PUBLIC_CALCOM_OAUTH_CLIENT_ID=94539bd8dd1e0e2d2d9bff78bece6d708176d10acb736de009b9677f5968bbc5
EXPO_PUBLIC_CALCOM_OAUTH_REDIRECT_URI=expo-wxt-app://oauth/callback
```

---

## Notas importantes

### Turbo e variáveis de ambiente

Turbo v2 filtra variáveis de ambiente. Qualquer nova variável runtime do Next.js precisa estar declarada em `globalEnv` no `turbo.json`. Exemplo: `API_V2_URL` foi adicionada para o proxy da API v2.

### Prisma migrations

Após mudanças no schema:

```bash
# Gerar migration
node .yarn/releases/yarn-4.12.0.cjs workspace @calcom/prisma migrate dev --name descricao

# Deploy em produção (roda automaticamente no start.sh do container)
node .yarn/releases/yarn-4.12.0.cjs workspace @calcom/prisma db-deploy
```

### Branch principal

Branch `deploy` — é o que roda em produção. `main` é o upstream original.

---

## Upstream

Fork do [calcom/cal.diy](https://github.com/calcom/cal.diy) — licença MIT.
