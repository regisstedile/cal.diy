# Rebuild do Container cal-src

## Quando Reconstruir

| Situação | Rebuild necessário? |
|---------|-------------------|
| Mudança no código fonte | ✅ Sim |
| Mudança em build args (env compiladas) | ✅ Sim |
| Mudança em runtime env | ❌ Não (só restart) |
| Mudança no schema Prisma | ✅ Sim |
| Mudança em traduções (i18n) | ✅ Sim |
| Restart simples | ❌ Não |

## Tempo de Build

~16 minutos (960 segundos). O Next.js compila todo o app e gera o bundle estático.

## Comandos

```bash
cd /home/regis/stack

# Build + restart
docker compose build cal-src && docker compose up -d cal-src

# Acompanhar logs durante startup
docker compose logs -f cal-src

# Verificar se ficou healthy
docker compose ps cal-src
# STATUS: Up X minutes (healthy)
```

## Build em Background

Para não bloquear o terminal:
```bash
docker compose build cal-src > /tmp/build-cal-src.log 2>&1 &
# Acompanhar:
tail -f /tmp/build-cal-src.log
```

## O que Acontece Durante o Build

```
1. Docker copia ./cal-diy para o context de build
2. yarn install (dependências)
3. yarn prisma generate (tipos TypeScript do DB)
4. cd packages/trpc && yarn build (compila tRPC)
5. yarn workspace @calcom/app-store-cli build (gera arquivos .generated.ts)
6. yarn build (Next.js build completo)
7. Imagem Docker criada
```

## Migração do Banco no Deploy

Migrations Prisma rodam automaticamente no startup do container (via healthcheck ou entrypoint). Verificar com:

```bash
docker exec cal-src yarn workspace @calcom/prisma db-deploy
```

## Se o Build Falhar

```bash
# Ver logs completos do build
docker compose build cal-src --no-cache 2>&1 | tee /tmp/build-full.log

# Erros comuns:
# - Falta de espaço em disco
# - Erro de TypeScript (type-check)
# - Dependência não instalada
```

## Estratégia para Minimizar Rebuilds

Agrupar mudanças e fazer um único rebuild:
- Tradução + feature flags + nova página = 1 rebuild
- Evitar rebuild para cada pequena mudança
