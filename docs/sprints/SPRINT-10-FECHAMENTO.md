# Sprint 10 — Fechamento (2026-07-11)

**Escopo entregue:** rotas `/teams` (main-nav + item na sidebar), `/members` (main-nav),
`/settings/teams/new` (criação standalone com `?returnTo=` validado contra open redirect),
`/settings/teams/[id]/event-type` (redirect ao event-types com dialog de criação),
extração de `members-view` compartilhada, remoção dos 6 `@ts-nocheck` de routing-forms +
restauração de `salesforce/lib/routingFormBookingFormHandler.ts` do histórico git.

Decisão de arquitetura: swap dos 116 handlers REF de `viewer/teams` adiado (11 arquivos de
UI consomem o router custom; `TeamsListing` REF depende de billing ausente). Porte gradual.

## 1. Imagem

| Item | Valor | Status |
|---|---|---|
| Nome:tag | `stack-cal-src:latest` | ✅ |
| Image ID | `sha256:63948347767f64a909b67da5c11c0c9caf35b5c9b2dfc1735399b4b531ab5e78` | ✅ |
| Digest | mesmo do ID (imagem local, sem registry) | ✅ |
| Tamanho | 2.402.649.374 bytes (~2,24 GiB) | ✅ |
| Build concluído | 2026-07-11T04:51:58Z (`next build` ✓ Compiled 97s; stage #20 345s total) | ✅ |

## 2. Deploy

| Item | Valor | Status |
|---|---|---|
| Container substituído | `cal-src` (imagem anterior `a9ccc1979db0`, up 35h) | ✅ |
| Imagem em uso | `63948347767f...` (== imagem buildada) | ✅ |
| Subida | 2026-07-11T05:10:13Z | ✅ |
| Restart policy | `unless-stopped` | ✅ |
| Healthcheck | `healthy` (após período `starting` normal); RestartCount=0 | ✅ |

## 3. Probes (sem sessão; esperado = redirect a login ou página pública)

| Rota | Onde | HTTP | Tempo | Esperado | Encontrado | Status |
|---|---|---|---|---|---|---|
| `/` | local | 307 | 0.108s | redirect login | idem | ✅ |
| `/` | público | 307 | 0.338s | idem | idem | ✅ |
| `/auth/login` | local | 200 | 0.294s | página login | idem | ✅ |
| `/auth/login` | público | 200 | 0.489s | idem | idem | ✅ |
| `/teams` **(S10)** | local+público | 307 | 0.43s | redirect login (**era 404**) | idem | ✅ |
| `/members` **(S10)** | local+público | 200 | 0.24s | guard de sessão | shell + `meta refresh → /auth/login?callbackUrl=/members`; zero dados no HTML; tRPC authed. 200 em vez de 307 porque `loading.tsx` pré-existente força streaming (redirect após primeiro byte) | ✅ |
| `/settings/teams/new` **(S10)** | local | 307 | 0.226s | redirect login (**era 404**) | idem | ✅ |
| `/event-types` | local | 200 | 0.346s | shell (mesmo padrão streaming) | idem | ✅ |
| `/availability` | local | 200 | 0.182s | idem | idem | ✅ |
| `/registedile-gmail.com` (booking público) | local | 200 | 0.524s | página de booking | idem | ✅ |
| `/registedile-gmail.com` | público | 200 | 0.368s | idem | idem | ✅ |
| API v2 `/health` (:5555) | local | 200 "OK" | 2.1s | OK | idem | ✅ |
| `/allged` (booking de org) | local | 404 | — | página org | 404 — páginas `org/[orgSlug]` nunca portadas (gap conhecido, FORA do escopo S10) | ⚠️ pré-existente |

## 4. Logs (desde a subida 05:10Z)

| Verificação | Resultado | Status |
|---|---|---|
| Erros de inicialização / Next.js / 500 | nenhum | ✅ |
| Erros Prisma / Redis / migrations | nenhum | ✅ |
| Loop de restart | RestartCount=0 | ✅ |
| Warnings benignos | `react-i18next` init (pré-existente), `EMAIL_FROM` não setado (mailing desativado, conhecido) | ⚠️ conhecidos |

## 5. Banco e dependências

| Item | Resultado | Status |
|---|---|---|
| PostgreSQL | `select 1` ok via 172.19.0.9 (IP atualizado no `.env` nesta sessão; drifta a cada restart — comando de checagem comentado no `.env`) | ✅ |
| Redis | `nc -z redis 6379` de dentro do container: ok | ✅ |
| Migrations | 1 registro `finished_at IS NULL`: `20260607010000_restore_impersonations`, com `rolled_back_at` de 2026-06-07 — lixo histórico da era Sprint 3, anterior a esta sprint; app sobe sem erro | ⚠️ pré-existente |
| API v2 | :5555/health → 200 OK | ✅ |
| Proxy público | cadeia Cloudflare Tunnel (`cal.allged.com.br → 129:3005`) respondendo idêntico ao local | ✅ |

## 6. Rollback

| Item | Valor | Status |
|---|---|---|
| Imagem anterior | `a9ccc1979db0` — **não existe mais no host** (untagged e coletada no rebuild) | ❌ |
| Rollback disponível | via git: `git checkout 245c6b4c4b && docker compose -f /home/regis/stack/docker-compose.yml build cal-src && ... up -d cal-src` (~35 min) | ⚠️ |
| Não remover | volumes do postgres (`cal_src` DB) e Redis; nenhum volume é tocado por rollback de imagem | ✅ |
| Gatilho de rollback | healthcheck `unhealthy`, loop de restart, ou 500 em `/auth/login`, `/event-types`, booking público | definido |
| Mitigação futura | taguear imagem antes de rebuild: `docker tag stack-cal-src:latest stack-cal-src:pre-<data>` | pendência |

## 7. Git

| Item | Valor | Status |
|---|---|---|
| Commit final | `c6c38e8a33` (branch `deploy`) | ✅ |
| Commits da sprint | `5cddde0c57` (@ts-nocheck), `743d5ae36d` (gap report), `1765bd7923` (teams pages), `e16528931f` (members), `5fbb2c40fd` (fix open redirect), `c6c38e8a33` (docs cleanup do owner) | ✅ |
| `git status` | limpo (0 pendências) | ✅ |
| Push | `fork/deploy` == `deploy` (verificado com fetch, não cache) | ✅ |

## Resumo

- **Resultado geral:** todas as rotas do escopo saíram de 404 para comportamento correto,
  build limpo, container healthy, público == local, zero erros novos de tipo (baseline 140
  pré-existentes inalterado).
- **Riscos restantes:** sem imagem de rollback local (só via git+rebuild ~35 min);
  140 type errors pré-existentes; migration fantasma histórica na `_prisma_migrations`.
- **Pendências transferidas:** convite por token (`createInvite` real) e `publish` real →
  próxima leva; páginas `org/[orgSlug]`; taguear imagem pre-rebuild como prática.
- **Evidências:** este documento; log de build em scratchpad da sessão; commits acima.

## Decisão: **ENCERRADA COM RESSALVAS**

Ressalvas: (a) rollback apenas via rebuild git, sem imagem anterior; (b) dois itens
⚠️ pré-existentes documentados (migration fantasma, `/allged` 404) que não pertencem ao
escopo desta sprint.
