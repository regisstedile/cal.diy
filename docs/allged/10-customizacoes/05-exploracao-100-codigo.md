# Exploracao 100% do Codigo Cal.diy ALLGED

Data: 2026-06-07
Status: inventario tecnico, sem ativacao automatica

## Objetivo

Mapear o que existe no codigo do fork ALLGED, mas ainda esta desligado, subutilizado ou parcialmente exposto. A ideia e explorar 100% do codigo com controle: primeiro inventario, depois seed seguro de flags, depois ativacao uma feature por vez.

## Fontes analisadas

- Mirror historico: `/home/regis/mirrors/caldiy-upstream.git`
- Mirror Docker: `/home/regis/mirrors/calcom-docker.git`
- Fork em producao: `/home/regis/stack/cal-diy`
- Banco usado pelo `cal-src`: `cal_src`

## Banco correto

Existem tres bancos Cal no Postgres:

| Banco | Users | Teams | EventTypes | Bookings | Workflows | Features | Uso provavel |
|---|---:|---:|---:|---:|---:|---:|---|
| `cal` | 1 | 1 | 5 | 0 | 0 | 36 | ambiente auxiliar/API/teste |
| `cal_src` | 3 | 3 | 8 | 16 | 15 | 11 | producao customizada `cal-src` |
| `calcom8xhb9xh` | 1 | 1 | 4 | 0 | 0 | 11 | ambiente oficial/legado |

Para a exploracao do `cal.allged.com.br`, usar `cal_src`.

## Flags globais ativas em `cal_src`

```text
booking-audit
bookings-v3
calendar-cache
calendar-cache-serve
disable-signup
insights
onboarding-v3
organizer-request-email-v2
restriction-schedule
sidebar-tips
team-booking-page-cache
```

Observacao: `team-booking-page-cache` existe no banco, mas nao aparece no `AppFlags` atual. Tratar como flag legada.

## Seed aplicado em 2026-06-07

O seed seguro `06-seed-feature-flags-cal-src.sql` foi validado com `ROLLBACK` e depois aplicado em `cal_src`.

Resultado:

- antes: 11 flags
- depois: 26 flags
- novas flags: 15
- todas as novas flags entraram com `enabled=false`

Flags novas cadastradas desligadas:

```text
booker-botid
booking-calendar-view
booking-email-sms-tasker
cal-ai-voice-agents
calendar-subscription-cache
calendar-subscription-sync
cal-video-log-in-overlay
delegation-credential
email-verification
emails
hwm-seating
salesforce-crm-tasker
signup-watchlist-review
sink-shortener
webhooks
```

## Flags conhecidas pelo codigo mas ausentes em `cal_src`

Estas flags aparecem em `packages/features/flags/config.ts`, mas nao existem no banco `cal_src`:

```text
emails
webhooks
email-verification
delegation-credential
salesforce-crm-tasker
cal-video-log-in-overlay
calendar-subscription-cache
calendar-subscription-sync
booker-botid
booking-calendar-view
booking-email-sms-tasker
hwm-seating
signup-watchlist-review
sink-shortener
cal-ai-voice-agents
```

Acao segura: cadastrar todas como `enabled=false`, sem ativar. O SQL esta em `06-seed-feature-flags-cal-src.sql`.

## Recursos vivos no tRPC

O `viewerRouter` monta estes recursos relevantes:

- `admin`
- `apiKeys`
- `appRoutingForms`
- `credits`
- `insights`
- `organizations`
- `phoneNumber`
- `teams`
- `workflows`
- `aiVoiceAgent`

Conclusao: a exploracao deve comecar pela UI/tRPC do `cal-src`. A API v2 Nest tem partes presentes, mas nem tudo esta registrado em `EndpointsModule`.

## Recursos claramente desligados ou incompletos

### Routing Forms

Rotas antigas:

- `apps/web/pages/routing-forms/index.tsx`
- `apps/web/pages/routing-forms/[...pages].tsx`

Ambas retornam `null` e redirecionam para `/apps/routing-forms/...`.

Interpretacao: o fluxo antigo foi desligado, mas o app-store/tRPC de routing forms ainda existe. Proxima exploracao: validar `/apps/routing-forms/forms` logado como admin e mapear erros de UI/API.

### SAML SSO

Tela existe em:

- `apps/web/app/(use-page-wrapper)/settings/(settings-layout)/organizations/sso/page.tsx`

Bloqueio atual:

- se `SAML_DATABASE_URL` nao estiver configurado, a UI mostra que SAML nao esta habilitado.

Proxima exploracao: subir banco/URL Jackson separado, configurar `SAML_DATABASE_URL` e testar em ambiente controlado.

### AI Voice Agent

Router existe:

- `packages/trpc/server/routers/viewer/aiVoiceAgent/_router.ts`

Mas a flag `cal-ai-voice-agents` nao existe no banco `cal_src` e nao esta ativa. Tambem faltam providers/envs de voz no compose.

Proxima exploracao: cadastrar flag desligada, mapear provider usado no codigo e so depois ativar em usuario/time de teste.

### Workflows SMS/WhatsApp

Workflows existem no banco e ha rotas cron:

- `scheduleEmailReminders`
- `scheduleSMSReminders`
- `scheduleWhatsappReminders`

Mas o compose atual nao mostra Twilio/SendGrid/WhatsApp configurados para `cal-src`.

Proxima exploracao: primeiro validar email workflow, depois SMS/WhatsApp com credenciais e limites de custo.

### API v2 Organizations/Workflows

Ha codigo de organizations/workflows em `apps/api/v2/src/modules`, mas `EndpointsModule` nao importa `OrganizationsModule`.

Proxima exploracao: nao expor API v2 antes de revisar guards e escopos. Preferir tRPC/UI para primeira fase.

## Teste inicial de rotas sem login

Executado contra `http://127.0.0.1:3005`:

| Rota | HTTP | Resultado |
|---|---:|---|
| `/workflows` | 200 | rota responde |
| `/insights` | 200 | rota responde |
| `/apps/routing-forms/forms` | 307 | redireciona para `/auth/login` |
| `/settings/organizations/sso` | 307 | redireciona para `/auth/login` |
| `/settings/admin/flags` | 307 | redireciona para `/settings/my-account/profile` sem sessao |

Conclusao: nao ha 404 inicial nas rotas principais. O proximo teste precisa ser autenticado como admin.

## Recursos removidos no corte Cal.diy de 15/04/2026

Maiores blocos removidos no commit base Cal.diy:

| Area | Arquivos removidos | Observacao |
|---|---:|---|
| `packages/trpc/server` | 415 | muitos routers enterprise |
| `apps/web/modules` | 360 | UI enterprise |
| `apps/api/v1` | 241 | API v1 removida |
| `apps/api/v2/src/modules/organizations` | 206 | API org enterprise |
| `packages/features/ee/billing` | 136 | billing/plans |
| `packages/app-store/routing-forms` | 92 | routing forms |
| `packages/features/ee/workflows` | 76 | workflows EE |
| `packages/features/ee/organizations` | 65 | orgs |
| `packages/features/pbac` | 44 | permissoes |
| `packages/features/insights` | 29 | analytics |
| `packages/features/ee/round-robin` | 14 | atribuicao avancada |
| `packages/features/ee/sso` | 3 | SAML |
| `packages/features/ee/impersonation` | 2 | impersonacao |

Parte disso ja foi restaurada no fork ALLGED. Nao copiar tudo automaticamente: usar o mirror como referencia tecnica, respeitando licenca e reimplementando quando houver duvida.


## Matriz de exploracao autenticada

| Recurso | Estado do codigo | Estado do banco/env | Proxima acao segura |
|---|---|---|---|
| Routing Forms | App-store, paginas, API e tRPC presentes | `routing-forms` ativo em `App`; 0 forms; 0 responses | entrar como admin e criar primeiro form pela UI |
| Workflows | UI, tRPC, cron routes e handlers presentes | 15 workflows no banco; email/SMS dependem de providers | validar workflow de email antes de SMS/WhatsApp |
| Insights | rota responde 200; router presente | flag `insights=true` | validar telas com bookings existentes |
| Admin flags | UI e tRPC admin presentes | admin existe, flags cadastradas | usar `/settings/admin/flags` logado como admin |
| SAML SSO | UI e handlers presentes | falta `SAML_DATABASE_URL` | configurar banco Jackson separado antes de testar |
| AI Voice Agent | router presente, mas stub | flag cadastrada `false`; sem provider real | nao ativar ainda; restaurar provider antes |
| API v2 Organizations | codigo parcial presente | `OrganizationsModule` nao esta em `EndpointsModule` | nao expor antes de revisar guards/imports |
| Round-robin/Teams | colunas e parte da UI existem | 0 event types de time; 0 hosts | criar event type de time teste em ADM/TECNICOS |

## Dados atuais para exploracao

Organizacao/times no `cal_src`:

```text
2 allged
3 ADM      parentId=2
4 TECNICOS parentId=2
```

Usuarios:

```text
1 registedile@gmail.com    ADMIN, organizationId=2
2 tecnicoastoria@gmail.com USER
3 tecnicoallged@gmail.com  USER
```

Memberships relevantes:

```text
regis: OWNER em allged, ADM e TECNICOS
tecnicoastoria: MEMBER em allged, ADMIN em ADM e TECNICOS
tecnicoallged: MEMBER em allged e TECNICOS
```

Routing Forms:

```text
App routing-forms ativo: sim
Forms existentes: 0
Responses existentes: 0
WorkflowsOnRoutingForms: 0
```

Event types de time/round-robin:

```text
Event types com teamId: 0
Hosts: 0
```

## Checklist da proxima sessao de exploracao

1. Login como admin `registedile@gmail.com`.
2. Abrir `/settings/admin/flags` e confirmar as 26 flags.
3. Abrir `/apps/routing-forms/forms` e criar form simples `Triagem ALLGED`.
4. Form minimo: Nome, Email, Telefone, Tipo de atendimento.
5. Criar duas rotas: Comercial/ADM e Tecnico/TECNICOS, ou fallback para reuniao teste.
6. Submeter uma resposta publica pelo link gerado.
7. Validar linha em `App_RoutingForms_FormResponse`.
8. So depois vincular workflow ao routing form.
9. Criar event type de time separado para testar round-robin.
10. Nao ativar `cal-ai-voice-agents` ate substituir o router stub por provider real.

## Ordem de exploracao recomendada

1. Seed seguro das flags ausentes como desligadas.
2. Validar rotas e UI existentes: Workflows, Insights, Admin flags, API keys, Organizations.
3. Explorar Routing Forms via `/apps/routing-forms/forms`.
4. Ativar `emails` e `webhooks` se os fluxos ja estiverem estaveis.
5. Explorar `cal-ai-voice-agents` apenas em usuario/time de teste.
6. Explorar SAML com `SAML_DATABASE_URL` separado.
7. Revisar API v2 Organizations antes de expor endpoints.
8. Round-robin avancado depois de criar times com membros reais.

## Criterio de seguranca

Toda ativacao deve seguir este ciclo:

1. flag cadastrada como `false`;
2. teste local/logado como admin;
3. ativacao por user/team quando possivel;
4. ativacao global so depois de validar logs;
5. rollback documentado.

