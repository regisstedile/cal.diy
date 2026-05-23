# Feature Flags

## O que são

Feature flags controlam funcionalidades do sistema. Podem ser ativadas/desativadas globalmente ou por usuário/time.

## Acesso

`/settings/admin/flags` (requer role=ADMIN)

## Flags Disponíveis (25)

| Flag | Status | Descrição |
|------|--------|-----------|
| `emails` | OFF | **ATENÇÃO**: lógica invertida — ativar BLOQUEIA emails |
| `disable-signup` | ON | Bloqueia novos cadastros (instância privada) |
| `managed-event-types` | OFF | Tipos de evento gerenciados por org |
| `organization-self-serve` | OFF | Usuários criam própria org |
| `teams` | OFF | Habilita funcionalidade de times |
| `google-workspace-directory` | OFF | Integração Google Workspace |
| `booking-limits` | OFF | Limites de bookings por período |
| `cal-video-logging` | OFF | Log de sessões de vídeo |
| `instance-timezone` | OFF | Timezone global da instância |
| `webhooks` | OFF | Webhooks (habilitar para usar) |
| `zapier` | OFF | Integração Zapier |
| `google-calendar` | OFF | Integração Google Calendar |
| `intercom` | OFF | Suporte Intercom |
| `workflows` | OFF | Automações/workflows |
| `v2-booking-page` | OFF | Versão 2 da página de booking |
| `insights` | OFF | Dashboard de insights |
| `pbac` | OFF | Permission-Based Access Control |
| `teams-oo` | OFF | Out-of-office para times |
| `delegation-credential` | OFF | Credenciais delegadas |
| `credits` | OFF | Sistema de créditos |
| `salesforce-crm` | OFF | Integração Salesforce |
| `routing-forms` | OFF | Formulários de roteamento |
| `stripe` | OFF | Integração Stripe |
| `twilio` | OFF | SMS via Twilio |
| `feature-opt-in` | OFF | Usuários optam em features |

## Flag `emails` — Lógica Invertida

```typescript
// packages/features/flags/config.ts
// "emails" flag: enabled=true BLOQUEIA emails
// enabled=false (ou ausente do DB) = emails funcionam normalmente
```

**Não ativar** a flag `emails` se quiser que emails funcionem.

## Flag `disable-signup` — Estado Atual

```sql
SELECT slug, enabled FROM "Feature" WHERE slug = 'disable-signup';
-- disable-signup | true
```

Ativado para impedir cadastros não autorizados. Para permitir cadastro temporário:
```sql
UPDATE "Feature" SET enabled = false WHERE slug = 'disable-signup';
-- Depois de criar o usuário:
UPDATE "Feature" SET enabled = true WHERE slug = 'disable-signup';
```

## Tipos de Flag

| Tipo | Uso |
|------|-----|
| `OPERATIONAL` | Flags operacionais (habilitar features) |
| `KILL_SWITCH` | Desabilitar funcionalidades problemáticas |
| `EXPERIMENT` | A/B testing |

## Código Relevante

- Tipos: `packages/features/flags/config.ts` (interface `AppFlags`)
- Hook: `apps/web/modules/feature-flags/hooks/useFlags.ts`
- tRPC: `packages/trpc/server/routers/viewer/features/`
- DB: modelo `Feature`, `UserFeatures`, `TeamFeatures`
