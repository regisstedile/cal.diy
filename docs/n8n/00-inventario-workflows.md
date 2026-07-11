# Inventário de Workflows — n8n (srv-core-01, 192.168.0.129:5678)

**Gerado:** 2026-07-11, direto do banco (`postgres` → database `n8n`, tabelas
`workflow_entity`/`execution_entity`). Fecha o buraco **B2** do
[MASTER-INDEX-PLATAFORMA](../MASTER-INDEX-PLATAFORMA.md).

## ⚠️ Achado principal: TUDO INATIVO

**Os 18 workflows estão com `active = false`.** 14 deles foram atualizados em
**2026-06-30** (padrão de desativação em massa ou evento de restore nessa data).
Zero execuções nos últimos 7 dias; últimas execuções registradas: 2026-06-30.

Consequência prática: **nenhuma integração via n8n deste host está operando** —
Cal.diy → n8n (webhooks de booking), ERP → Baserow (espelhos), captura de leads,
CRM, intake de PDFs. Se algo "parece funcionar", não é por este n8n.

Correlação: Baserow também está OFF (destino dos 3 SYNC), o que torna a
reativação dos espelhos inútil até o Baserow voltar.

**NÃO VERIFICADO:** por que foram desativados (decisão deliberada? restore?
crash?). O dono precisa confirmar antes de qualquer reativação.

## Inventário (18 workflows)

| Workflow | Trigger | Ativo | Criado | Últ. update | Últ. execução |
|---|---|---|---|---|---|
| `[CAL] Booking Events` | webhook | ❌ | 2026-06-06 | 2026-06-30 | nunca registrada |
| `AGENDAMENTO caldiy` | executeWorkflowTrigger (sub-workflow) | ❌ | 2026-05-18 | 2026-05-18 | nunca |
| `[ERP→Baserow] SYNC_OS_MIRROR` | schedule | ❌ | 2026-05-20 | 2026-06-30 | 2026-06-30 (97 execs) |
| `[ERP→Baserow] SYNC_CLIENTES_MIRROR` | schedule | ❌ | 2026-05-20 | 2026-06-30 | 2026-06-30 (97 execs) |
| `[ERP→Baserow] SYNC_EQUIPAMENTOS_MIRROR` | schedule | ❌ | 2026-05-20 | 2026-06-30 | 2026-06-30 (24 execs) |
| `Allged — Captura de Leads (Site)` | webhook + respondToWebhook | ❌ | 2026-04-23 | 2026-06-30 | nunca |
| `[CRM] Encerramento Atendimento` | webhook | ❌ | 2026-05-20 | 2026-06-30 | nunca |
| `[INTAKE] pdf-folder-watcher` | localFileTrigger | ❌ | 2026-05-03 | 2026-06-30 | nunca |
| `[INTAKE] pdf-webhook-intake` | webhook + chatTrigger (langchain) | ❌ | 2026-05-03 | 2026-06-30 | nunca |
| `[VAULT] vault-consolidator` | webhook | ❌ | 2026-05-04 | 2026-06-30 | nunca |
| `[PROC] course-processor` | formTrigger + webhook | ❌ | 2026-05-04 | 2026-06-30 | nunca |
| `[PROC] curso-indexer` | webhook | ❌ | 2026-05-07 | 2026-06-30 | nunca |
| `[DOCS] Auto-Doc Workflows` | formTrigger | ❌ | 2026-05-31 | 2026-06-30 | nunca |
| `Knox Manage Enrollment Assistant` | webhook + respondToWebhook | ❌ | 2026-05-15 | 2026-06-30 | nunca |
| `Knox Manage Group Reconciliation` | manual | ❌ | 2026-05-15 | 2026-05-20 | nunca |
| `Knox Manage Audit Export` | manual | ❌ | 2026-05-15 | 2026-05-20 | nunca |
| `Knox Manage Device Lookup` | manual | ❌ | 2026-05-15 | 2026-05-20 | nunca |
| `Music Production KB → Video Generator` | webhook | ❌ | 2026-05-31 | 2026-06-30 | nunca |

Nota: "nunca registrada" = sem linhas em `execution_entity` HOJE — histórico de
execuções pode ter sido podado (retention do n8n); os 3 SYNC provam que o banco
retém pelo menos desde 06-30.

Nota 2: memória de projeto dizia "3 workflows Knox no n8n do host 118" — os
workflows Knox estão AQUI no 129 (verificado no banco). O que existe no n8n do
118 segue não inventariado (buraco B7 do MASTER-INDEX).

Nota 3: o webhook do fluxo Agno/Bia (`zc0CLELn9SqSOkd5`, memória 2026-07-10) NÃO
corresponde a nenhum workflow deste banco — ou foi deletado, ou vive no n8n de
outro host. NÃO VERIFICADO.

## Como re-verificar (comandos exatos)

```bash
# Lista + estado
docker exec postgres psql -U n8n -d n8n -c \
  'select name, active, "updatedAt"::date from workflow_entity order by active desc, name'

# Execuções recentes
docker exec postgres psql -U n8n -d n8n -tAc \
  'select count(*) from execution_entity where "startedAt" > now() - interval '"'"'7 days'"'"''

# Triggers por workflow
docker exec postgres psql -U n8n -d n8n -tAc \
  "select w.name || ' | ' || coalesce((select string_agg(distinct n->>'type', ', ')
   from jsonb_array_elements(w.nodes::jsonb) n
   where n->>'type' ilike '%trigger%' or n->>'type' ilike '%webhook%'), 'sem trigger')
   from workflow_entity w order by w.name"
```

## Pendências geradas

1. **Decisão do dono:** a desativação em massa de 2026-06-30 foi intencional?
2. Se reativar: ordem sugerida — Baserow primeiro (senão SYNC falha), depois
   `[CAL] Booking Events` (integração Cal.diy), depois o resto conforme uso real.
3. Credenciais dos workflows não auditadas aqui (tabela `credentials_entity`
   existe; auditoria de credenciais pertence ao B3/rotação de segredos).
