# MASTER INDEX — Plataforma ALLGED/Astoria

**Mapa operacional único da plataforma.** Não é lista de arquivos — é o "mapa do metrô":
cada sistema, onde roda, o que consome, do que depende, e o que falta saber.

- **Gerado:** 2026-07-11, host `srv-core-01` (192.168.0.129), a partir de `docker ps` ao vivo,
  probes HTTP/TCP e memória persistente cruzada.
- **Classificação de cada fato:** ✅ confirmado (comando rodado nesta sessão) · 🟡 provável
  (memória/doc recente, não re-verificado hoje) · ❓ não verificado.
- **Regra:** nada inventado. Sem verificação → entra como ❓ ou vira buraco de documentação.

> Convenção de rastreabilidade (herdada do guia cal.diy: UI → API → handler → Prisma → teste):
> aqui aplicada **entre sistemas** — cada linha "Integrações"/"Depende de" liga um sistema
> ao próximo elo da cadeia.

---

## Servidores (infra física/VM)

| Host | IP | Tipo | Papel | Estado |
|---|---|---|---|---|
| srv-core-01 | 192.168.0.129 | VM Linux | **Host principal** — quase toda a stack Docker; Claude Code roda aqui | ✅ ativo |
| ubuntu (118) | 192.168.0.118 | VM Linux | Docker Astoria + `mcp_linux` (MCP do Manus, 17 tools) | ✅ SSH:22 aberto; 🟡 conteúdo não auditado |
| SRV-DB (252) | 192.168.0.252 | VM Windows | **SQL Server** `SQLEXPRESS22` — ERP ADM Copy + fonte MSSQL do allged-web | ✅ :1433 aberto |
| srv-docker-01 (125) | 192.168.0.125 | Físico | Chatwoot omnichannel | ❌ 125:22 e :3010 não alcançáveis desta sessão; público 502 |
| CHRONOS (253) | 192.168.0.253 | VM Windows | Domínio + arquivos (`\\192.168.0.129\regis` na verdade é share deste conjunto) | ❓ não verificado hoje |
| T340 (15), SRVHOST02 (151), SRV-R530-1 (207), dellt110 (10) | — | Físico | Hyper-V host / BKP / virt.Astoria / ALLGED-a-migrar | 🟡 ver [[reference-servers]] |

Detalhe/credenciais: [[reference-servers]]. Migração dellt110→SRVHOST02: [[project-migration-allged]].

---

## Sistemas (containers/serviços em 129, salvo indicado)

Legenda portas: todas em 129 salvo nota. "loopback" = publicado só em 127.0.0.1.

### 1. Cal.diy — agendamento (fork enterprise cal.com)
- **Finalidade:** agendamento/booking, org `allged`. **Repo:** github.com/regisstedile/cal.diy (`deploy`), local `/home/regis/cal.com/cal-diy`
- **Container:** `cal-src` (img `stack-cal-src:latest`=`63948347767f`, tag rollback `stack-cal-src:sprint-10`) · **porta:** 3005 · **domínio:** cal.allged.com.br
- **Banco:** PostgreSQL `cal_src` (container `postgres`, IP drifta — hoje .9) · **Redis** compartilhado
- **API v2:** `cal-api-v2` porta 5555 (health OK) · **Integrações:** webhooks → n8n → WhatsApp/Evolution
- **Estado:** ✅ healthy, Sprint 10 encerrada c/ ressalvas ([[project-cal-diy]], `docs/sprints/SPRINT-10-FECHAMENTO.md`)
- **Pendências:** convite por token real, `publish` real, páginas `org/[orgSlug]` (404), ~79% do fork enterprise portado (`docs/cal-fork/GAP-2026-07-11.md`)
- **Referência pura:** `calcom-official` (`calcom/cal.com:v4.4.2`, porta 3006) — só p/ diff, não é produção

### 2. ADM Copy ERP — ERP próprio (Go)
- **Finalidade:** ERP núcleo. **Repo:** github.com/regisstedile/admcopy-erp, local `/home/regis/admcopy-erp`
- **Container:** ❌ **NÃO implantado** neste host (sem systemd, sem container) · porta default 8080 (colidiria com evolution)
- **Banco:** SQL Server `192.168.0.252\SQLEXPRESS22` ✅ (:1433 aberto) · **Fonte de verdade do código:** máquina Windows (dev ativo, +63 commits já sincronizados 2026-07-09)
- **Estado:** 🟡 dev ativo noutra máquina, não roda em 129 · [[project-admcopy-erp]]

### 3. FieldOps (timesheet-astoria) — monitor de equipe de campo
- **Finalidade:** monitorar equipe em campo, timesheet. **Local:** `/home/regis/stack/timesheet-astoria` (repo github.com/regisstedile/solides)
- **Container:** `fieldops-api` porta 8095 ✅ healthy · **ETL:** cron `*/15min` (`etl/run_sync.sh`, última sync ✅ 05:17Z: `official_daily_summary` 3607 dias)
- **Banco:** PostgreSQL `fieldops` (no container `postgres`) · **Fonte:** Sólides/Tangerino (punch events) via ETL
- **Estado:** ✅ ativo, Sprint 3 · [[project-fieldops-astoria]]. **Doc dedicada:** ❌ inexistente (buraco B1)

### 4. n8n — motor de workflows (lógica de negócio real)
- **Container:** `n8n` (`n8n-local:latest`) porta 5678 ✅ healthy · **Banco:** PostgreSQL `n8n` · **volume:** `/home/regis/stack/volumes/n8n`
- **Integrações:** hub central — Cal webhooks, Evolution/WhatsApp, Agno/Bia, MSSQL, Baserow. **MCP:** n8n-mcp (localhost:5678)
- **Estado:** ✅ ativo · aux: `n8n-template-search` porta 8000 ✅ · [[project-agno-n8n]] [[reference-mcp]]

### 5. Evolution API — gateway WhatsApp
- **Container:** `evolution` (`evoapicloud/evolution-api:v2.3.7`) porta 8080 ✅ (200) · domínio evo.allged.com.br
- **Banco:** PostgreSQL `evolution` · **Consumido por:** n8n, Knox Campo · [[project-knox-campo]]

### 6. Baserow — banco no-code
- **Finalidade:** tabelas ERP ADMCOPY migradas do Supabase (tables 624-629). Porta 3008
- **Estado:** ❌ **NÃO está rodando** (sem container, :3008 morto — confirmado ✅). Tools MCP prontas, sem uso · [[project-allged-web]]

### 7. Chatwoot — omnichannel
- **Host:** srv-docker-01 (125), porta 3010, público chatwoot.allged.com.br
- **Estado:** ❌ inacessível desta sessão (125:22 e :3010 sem resposta; público **502**). **Investigar** (buraco B4) · [[project-chatwoot]]

### 8. MCP ALLGED — servidor MCP p/ Manus
- **Container:** `mcp-allged` porta 8055 (loopback) · **domínio:** mcp.allged.com.br/mcp (túnel)
- **Escopo:** docker.sock+restart+compose, sistema, n8n, Baserow, read_file · **Estado:** ✅ produção, 18 tools
- **Risco:** `/home/regis` montado ro no container → exports vazados legíveis; `MCP_API_KEY` exposta em transcrição **pendente rotação** · [[project-mcp-allged]] [[feedback-export-leak-pattern]]

### 9. allged-web — portal Next.js
- **Container:** `allged-web` (`stack-allged-web`) porta 3001 ✅ · **Bancos:** Supabase + **MSSQL direto** (252) · [[project-allged-web]]

### 10-13. Bancos e cache
- **PostgreSQL** `postgres:16` porta 5432 (não publicada fora) ✅ healthy — hospeda: n8n, agno, baserow, cal_src, calcom_official, chatwoot, evolution, fieldops
- **Redis** `redis:7` porta 6379 (interna) ✅ healthy — cache cal-src
- **SQL Server** 252 ✅ — ERP + allged-web
- **Qdrant** — memória vetorial da Bia/Agno · ❓ não verificado como container hoje · [[project-allged-web]]

### 14. Cloudflare Tunnel — ingress público
- **Container:** `cloudflared-tunnel` ✅ (túnel "n8neditor1", ID `a570ac1b...`, conta Suporte@astoriait.com.br)
- **9 rotas:** cal, mcp, n8neditor, evo, n8nwebhook, www, allged, chamados, chatwoot → allged.com.br
- **Sem Traefik:** ingress é Cloudflare Tunnel direto (não há Traefik neste host — corrige suposição antiga) ✅

### 15. Gitea — git self-hosted
- **Local:** `/home/regis/gitea` (git/gitea/ssh) · **Estado:** ❓ container não apareceu no `docker ps` (compose separado, não checado)

### 16. Monitoramento (Grafana stack)
- **Containers:** `grafana` porta 3002 ✅, `prometheus` ✅, `cadvisor` :8081 loopback ✅, `node-exporter` ✅ · **Local:** `/home/regis/monitoramento/grafana-stack`
- **Langfuse (LLM observability):** ❌ **não existe** neste host (nenhum dir/container encontrado) — item da lista era hipótese

### 17. Backups
- **Cron:** `0 2 * * *` → `/home/regis/scripts/backup-stack.sh` ✅ · **Destino:** `/home/regis/backups/auto/AAAA-MM-DD`
- **Retenção:** 9 dias presentes (07-03 a 07-11) ✅ · **Hoje (07-11):** 2,2G, `postgres_full.sql` + volumes stack ✅
- **OPS/** (`/home/regis/OPS`, 2026-07-05): inventário verificado de secrets/DBs/backups · **Backup Supabase remoto:** 🟡 existe (98MB) origem incerta

### 18. Sólides / Tangerino — ponto/RH (SaaS externo)
- **Finalidade:** fonte de punch events do FieldOps · **Estado:** ❓ **não verificado** — SaaS externo, sem endpoint checado nesta sessão; só sei que o ETL consome dados originados dele
- **ADMSmart:** ❓ **não verificado** — nenhum dir/container/doc local; não sei o que é nem onde roda (buraco B5)

---

## Diagrama de fluxos (verificado onde ✅)

```
Ponto/RH (Sólides/Tangerino, SaaS externo ❓)
   │ punch events
   ▼
FieldOps ETL (cron 15min ✅) ──► PostgreSQL `fieldops` ✅ ──► fieldops-api :8095 ✅ ──► dashboards/monitor campo

ERP ADM Copy (Go, roda no Windows 🟡)
   │
   ├─► SQL Server 252 ✅ ──► allged-web :3001 ✅ (MSSQL direto)
   └─► (migração p/ Baserow: tables 624-629, Baserow OFF ❌)

Cal.diy :3005 ✅ ──► PostgreSQL `cal_src` ✅ + Redis ✅
   └─► cal-api-v2 :5555 ✅ ──► webhooks ──► n8n :5678 ✅ ──► Evolution :8080 ✅ ──► WhatsApp

n8n (hub) ✅ ◄──► Agno/Bia (Qdrant ❓) ◄──► Baserow ❌ / MSSQL ✅

Ingress: internet ──► Cloudflare Tunnel `n8neditor1` ✅ ──► {cal, mcp, evo, chatwoot(502 ❌), ...}
Manus ──► mcp.allged.com.br ──► mcp-allged :8055 ✅ ──► docker.sock/n8n/arquivos de 129
```

---

## Buracos de documentação

| # | O que falta | Evidência de que falta | Risco | Documento a criar | Prioridade | Critério de pronto |
|---|---|---|---|---|---|---|
| B1 | Doc do **FieldOps** (arquitetura ETL, schema `fieldops`, telas, geofence) | Sistema ✅ ativo (:8095 healthy, ETL 15min) mas nenhum doc dedicado; só memória `project_fieldops_astoria` | Novo agente/pessoa mexe no ETL sem entender cursor de punch events → duplica/perde dados | `docs/fieldops/00-arquitetura.md` + fluxo ETL | **ALTA** | ETL, schema, geofence e fonte Sólides documentados com evidência do disco |
| B2 | Doc dos **workflows n8n** (quais existem, o que cada um faz, credenciais) | n8n ✅ é "lógica de negócio real" mas nº de workflows nunca inventariado neste host (só 5 de 118 no 118, doc de 02/05) | n8n é ponto único de falha de integrações; sem mapa, quebra silenciosa | `docs/n8n/00-inventario-workflows.md` | **ALTA** | Lista completa de workflows ativos em 129 c/ trigger, destino e credencial |
| B3 | Rotação de segredos pendente | `OPS/Secrets/01-ROTATION.md` lista pendências; `MCP_API_KEY` exposta (esta sessão) | Credencial viva em texto puro / exports vazados legíveis via MCP | atualizar `OPS/Secrets/01-ROTATION.md` + rotacionar | **ALTA** | MCP_API_KEY, n8n key, Supabase keys, Baserow tokens rotacionados e registrados |
| B4 | Estado real do **Chatwoot** | 125:22, :3010 e público (502) todos sem resposta hoje | Serviço omnichannel possivelmente **caído** sem ninguém saber | `docs/chatwoot/status.md` após diagnóstico | **ALTA** | Causa do 502 identificada; up/down decidido |
| B5 | **ADMSmart** — o que é | Citado na lista do dono; zero vestígio em disco/containers/memória | Sistema "fantasma" no inventário; não sei se existe, onde, ou se importa | entrada no próprio MASTER-INDEX | MÉDIA | Confirmado o que é ADMSmart e onde roda (ou marcado como inexistente) |
| B6 | **Qdrant / Gitea** como container | Citados/esperados, mas não apareceram no `docker ps`; Gitea tem dir local | Doc de allged-web/Bia assume Qdrant vivo; pode estar off | verificação + nota no índice | MÉDIA | Confirmado se rodam, em que porta/host |
| B7 | **Host 118** (Astoria) não auditado | SSH aberto ✅, mas conteúdo (mcp_linux, n8n 118, workflows) nunca inventariado nesta sessão | Metade da plataforma (lado Astoria) é caixa-preta | `docs/host-118/inventario.md` | MÉDIA | `docker ps` do 118 + papel de cada container |
| B8 | **MASTER-INDEX espelhado pra fora do cal.diy** | Este doc vive dentro do repo cal.diy; cobre a plataforma toda, mas fica "escondido" | Índice da plataforma acoplado a um projeto só | mover/symlink p/ `/home/regis/OPS/` | BAIXA | Índice acessível fora do repo cal.diy |

---

**Não verificado nesta sessão (resumo honesto):** Sólides/Tangerino (SaaS externo), ADMSmart
(sem vestígio), Qdrant e Gitea como containers vivos, todo o host 118, host 125/Chatwoot
(inacessível), CHRONOS/253 e demais hosts físicos. Estes são descoberta pendente, não
inventário conhecido.
