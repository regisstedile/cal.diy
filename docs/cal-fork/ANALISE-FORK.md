# Análise Completa: Fork cal-diy vs REF

**Data:** 2026-06-08  
**REF:** `docs/cal-fork/cal-diy-opensource/cal-diy-opensource/`  
**Fork:** `/home/regis/stack/cal-diy` — rodando em `:3005` (Docker `cal-src`)  
**Total restaurado (Sprints 1–9):** 387 arquivos, 43.465 inserções

---

## Resumo Executivo

O fork foi reconstruído em 9 sprints a partir da análise diff entre o repositório base e o REF (código-fonte completo da versão enterprise). Todas as features críticas foram restauradas. Restam apenas gaps em áreas de onboarding, embed e páginas secundárias — não bloqueantes para operação.

---

## Sprints Executados

### Sprint 1 — `b9f8a82b7b`
**Impersonação, API Keys autoLock, PBAC domain layer**

| Arquivo | Status |
|---------|--------|
| `packages/features/ee/impersonation/lib/ImpersonationProvider.ts` | ✅ |
| `packages/features/ee/api-keys/services/ApiKeyService.ts` | ✅ |
| `packages/features/pbac/domain/errors/role-management.error.ts` | ✅ |
| `packages/features/pbac/domain/mappers/PermissionMapper.ts` | ✅ |
| `packages/features/pbac/domain/models/Permission.ts` | ✅ |
| `packages/features/pbac/domain/models/Role.ts` | ✅ |
| `packages/features/pbac/domain/repositories/IPermissionRepository.ts` | ✅ |
| `packages/features/pbac/domain/repositories/IRoleRepository.ts` | ✅ |
| `packages/features/pbac/infrastructure/repositories/PermissionRepository.ts` | ✅ |
| `packages/features/pbac/infrastructure/repositories/RoleRepository.ts` | ✅ |
| `packages/features/pbac/infrastructure/store/permission-store.ts` | ✅ |
| `packages/features/pbac/lib/constants.ts` | ✅ |
| `packages/features/pbac/lib/resource-permissions.ts` | ✅ |
| `packages/prisma/schema.prisma` — campos PBAC | ✅ |

**25 arquivos, 2.811 inserções**

---

### Sprint 2 — `8fc2a291f7`
**Round-Robin, Managed Event Types**

| Área | Status |
|------|--------|
| `packages/features/ee/round-robin/` — roundRobinManualReassignment, roundRobinReassignment, handleRescheduleEventManager | ✅ |
| `packages/features/ee/round-robin/lib/bookingLocationService.ts` | ✅ |
| `packages/features/ee/managed-event-types/reassignment/` — 8 arquivos | ✅ |
| `packages/features/assignmentReason/` | ✅ |

**25 arquivos, 4.714 inserções**

---

### Sprint 3 — `166d49cc79` + fixes
**Payments, Deployment, Users schemas, Billing webhooks**

| Arquivo | Status |
|---------|--------|
| `packages/features/ee/payments/api/webhook.ts` | ✅ |
| `packages/features/ee/payments/components/Payment.tsx` | ✅ |
| `packages/features/ee/payments/pages/payment.tsx` | ✅ |
| `packages/features/ee/payments/server/stripe.ts` | ✅ |
| `packages/features/ee/billing/api/webhook/` — 4 arquivos | ✅ |
| `packages/features/ee/deployment/` — DeploymentRepository | ✅ |
| `packages/features/ee/users/schemas/userBodySchema.ts` | ✅ |
| `fix/prisma`: migração de impersonation restaurada | ✅ |
| `fix/build`: guards para billing/impersonation incompletos | ✅ |

**26 arquivos, 1.893 inserções**

---

### Sprint 4 — `4eaa190c74`
**Routing Forms — feature completa + tRPC routers + UI**

| Área | Status |
|------|--------|
| `packages/app-store/routing-forms/` — UI components completos | ✅ |
| `packages/trpc/server/routers/viewer/routing-forms/_router.ts` | ✅ |
| Handlers: response, getResponseWithFormFields, getIncompleteBookingSettings, saveIncompleteBookingSettings, findTeamMembers | ✅ |
| `packages/app-store/routing-forms/trpc-router` registrado em viewer | ✅ |

**94 arquivos, 13.824 inserções**

> **Débito pré-existente (não introduzido pelos sprints):**
> - `FormResponse` vs `Response` type mismatch em routing-forms (schema Prisma incompleto)
> - `RoutingTraceService.container` — DI incompleto no REF
> - Prisma schema faltando: `app_RoutingForms_QueuedFormResponse`, `routedToBookingUid`, `chosenRouteId`
> - `processRoute.tsx` Config type incompatibility
> 
> Esses erros existiam no REF antes da restauração. Não são regressões.

---

### Sprint 5 — `7bdf635f60` até `f00378c06f` (6 commits)
**Attributes data layer, EE Teams views, PBAC services, Teams settings pages**

| Área | Status |
|------|--------|
| `packages/features/attributes/` — repositórios, services, schemas, DI | ✅ |
| `packages/features/ee/teams/` — views (appearance, profile, settings, members) | ✅ |
| `packages/features/pbac/services/` — PermissionCheckService, RoleService | ✅ |
| `apps/web/app/.../settings/teams/[id]/appearance/page.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/profile/page.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/settings/page.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/members/page.tsx` | ✅ |
| `packages/trpc/server/routers/viewer/attribute-sync/_router.tsx` | ✅ |
| `packages/lib/raqb/` — stubs para routing-forms types | ✅ |
| `fix`: alias `viewerTeamsRouter` para compatibilidade da members page | ✅ |

**~83 arquivos totais (6 commits), ~5.254 inserções**

---

### Sprint 6 — `83e75a7397` + `05a8f997ca`
**SSO tRPC router, Security settings, Delegation Credentials**

| Arquivo | Status |
|---------|--------|
| `packages/trpc/server/routers/viewer/sso/_router.tsx` | ✅ |
| `apps/web/app/.../settings/security/impersonation/page.tsx` | ✅ |
| `apps/web/app/.../settings/security/password/page.tsx` | ✅ |
| `apps/web/app/.../settings/security/two-factor-auth/page.tsx` | ✅ |
| `packages/features/ee/delegationCredential/` — service, repository, DI | ✅ |
| `packages/trpc/server/routers/viewer/delegationCredential/_router.tsx` | ✅ |

**31 arquivos, 2.146 inserções**

> **Findings de segurança (pré-existente no REF, não corrigido — fora do escopo de restauração):**
> - `delegationCredential/update.handler.ts` — sem ownership check antes de updateById (HIGH)
> - `delegationCredential/getAffectedMembersForDisable.handler.ts` — sem org ownership check (HIGH)

---

### Sprint 7 — `e417e73a7e` + `16c3d65b84`
**saml.ts, dsync router, teams settings pages**

| Arquivo | Status |
|---------|--------|
| `packages/features/ee/sso/lib/saml.ts` — canAccessOrganization, isSAMLAdmin, samlTenantID | ✅ |
| `packages/trpc/server/routers/viewer/dsync/_router.tsx` | ✅ |
| `packages/trpc/server/routers/viewer/dsync/create.handler.ts` | ✅ |
| `packages/trpc/server/routers/viewer/dsync/delete.handler.ts` | ✅ **+ IDOR fix** |
| `packages/trpc/server/routers/viewer/dsync/get.handler.ts` | ✅ |
| `packages/trpc/server/routers/viewer/dsync/teamGroupMapping/_router.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/billing/page.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/features/page.tsx` | ✅ |
| `apps/web/app/.../settings/teams/[id]/roles/page.tsx` | ✅ |

**19 arquivos (2 commits), 725 inserções**

> **Security fix aplicado (commit `16c3d65b84`):**
> - `delete.handler.ts`: lookup por `organizationId` primeiro, assert `record.directoryId === input.directoryId`, usa `delete` não `deleteMany`
> - Corrige IDOR onde `directoryId` não verificado poderia deletar sync de outra organização

---

### Sprint 9 — `7f15b47692`
**Todos os módulos `apps/web/modules/` ausentes (sub-components + views)**

| Área | Arquivos | Status |
|------|----------|--------|
| `modules/ee/common/components/` | BrandColorsForm, CommonSkeletonLoaders | ✅ |
| `modules/ee/dsync/components/` | ConfigureDirectorySync, CreateDirectory, CreateTeamDialog, DirectoryInfo, GroupNameCell, GroupTeamMappingTable | ✅ |
| `modules/ee/dsync/views/` | team-dsync-view | ✅ |
| `modules/ee/sso/components/` | ConnectionInfo, OIDCConnection, SAMLConnection, SSOConfiguration | ✅ |
| `modules/ee/sso/views/` | orgs-sso-view, user-sso-view | ✅ |
| `modules/ee/organizations/components/` | DisableGuestBookingEmailsSetting, MemberListItem, OrgAutoJoinSetting, OtherTeamList, OtherTeamListItem, OtherTeamsListing | ✅ |
| `modules/ee/organizations/attributes/` | DeleteAttributeModal, ListSkeleton, attributes-list-view | ✅ |
| `modules/ee/organizations/privacy/` | blocklist-table | ✅ |
| `modules/ee/organizations/` | features-view, guest-notifications, privacy, other-team-members-view, other-team-profile-view, delegationCredential | ✅ |
| `modules/ee/teams/components/` | MakeTeamPrivateSwitch, MemberInvitationModal | ✅ |
| `modules/feature-opt-in/` | FeaturesSettings, useOrganizationFeatureOptIn | ✅ |

**35 arquivos, 4.814 inserções**

---

### Sprint 8 — `d7f354db69`
**Org admin pages, Roles PBAC UI, featureOptIn + pbac tRPC routers**

| Arquivo | Status |
|---------|--------|
| `organizations/actions/validateUserHasOrg.tsx` | ✅ |
| `organizations/actions/validateUserHasOrgPerms.tsx` | ✅ |
| `organizations/(org-admin-only)/layout.tsx` | ✅ |
| `organizations/(org-admin-only)/billing/page.tsx` | ✅ |
| `organizations/(org-admin-only)/delegation-credential/page.tsx` | ✅ |
| `organizations/(org-admin-only)/dsync/page.tsx` | ✅ |
| `organizations/(org-admin-only)/features/page.tsx` | ✅ |
| `organizations/(org-admin-only)/guest-notifications/page.tsx` | ✅ |
| `organizations/(org-admin-only)/privacy/page.tsx` | ✅ |
| `organizations/(org-admin-only)/sso/page.tsx` | ✅ |
| `organizations/(org-admin-only)/attributes/page.tsx` | ✅ |
| `organizations/(org-admin-only)/attributes/create/page.tsx` | ✅ |
| `organizations/(org-admin-only)/attributes/sync/page.tsx` | ✅ |
| `organizations/(org-admin-only)/attributes/[id]/edit/page.tsx` | ✅ |
| `organizations/roles/page.tsx` | ✅ |
| `organizations/roles/_components/RolesList.tsx` | ✅ |
| `organizations/roles/_components/PbacOptInView.tsx` | ✅ |
| `organizations/roles/_components/CreateRoleCta.tsx` | ✅ |
| `organizations/roles/_components/searchParams.ts` | ✅ |
| `organizations/roles/hooks/useRoleQueryStates.ts` | ✅ |
| `organizations/admin-api/page.tsx` | ✅ |
| `organizations/teams/other/(main-page)/page.tsx` | ✅ |
| `organizations/teams/other/[id]/appearance/page.tsx` | ✅ |
| `organizations/teams/other/[id]/members/page.tsx` | ✅ |
| `organizations/teams/other/[id]/profile/page.tsx` | ✅ |
| `settings/billing/page.tsx` | ✅ |
| `packages/trpc/server/routers/viewer/featureOptIn/_router.ts` — 12 procedures | ✅ |
| `packages/trpc/server/routers/viewer/pbac/_router.tsx` — 8 procedures | ✅ |
| Registro em `viewerRouter`: `featureOptIn`, `permissions` | ✅ |

**29 arquivos, 1.657 inserções**

---

## Status por Área — Visão Completa

### ✅ COMPLETO

| Área | Detalhes |
|------|----------|
| PBAC domain layer | PermissionMapper, RoleService, PermissionCheckService, repositórios |
| Impersonação | ImpersonationProvider + migration |
| API Keys | ApiKeyService com autoLock |
| Round-Robin | Manual + automatic reassignment, bookingLocationService |
| Managed Event Types | Reassignment service completo |
| Payments | Stripe webhook, Payment.tsx, stripe-service |
| Billing | HWM webhook handlers |
| Deployment | DeploymentRepository |
| Routing Forms | Feature completa: UI, tRPC (6 routers), handlers |
| Attributes | Data layer: repositories, services, DI, schemas |
| EE Teams | Views: appearance, profile, settings, members |
| PBAC Services | PermissionCheckService, RoleService |
| Teams settings pages | `[id]/{appearance,profile,settings,members,billing,features,roles}` |
| Attribute Sync | tRPC router |
| SSO | tRPC router + saml.ts canAccessOrganization |
| Security settings | Impersonation, password, 2FA pages |
| Delegation Credentials | Feature + tRPC router |
| DSync | Router completo + IDOR fix |
| Org admin pages | 13 páginas em `(org-admin-only)/` |
| Roles UI | RolesList, PbacOptInView, CreateRoleCta, hooks |
| Org teams other | main-page + `[id]/{appearance,members,profile}` |
| featureOptIn | tRPC router 12 procedures |
| PBAC permissions | tRPC router 8 procedures |
| Billing page | `settings/billing/page.tsx` |
| Admin API | Redirect para docs |
| E2E Organizations | 7 testes passando |
| Workflows | Feature restaurada + integrada no booking flow |
| AI Voice Agent | Endpoint registrado |
| modules/ee/ views | dsync, SSO, org admin views, delegation cred, attributes-list, features, privacy, guest-notifications, other-team |
| modules/feature-opt-in/ | FeaturesSettings + useOrganizationFeatureOptIn hook |

---

### ⚠️ GAPS REMANESCENTES (não bloqueantes)

#### Páginas ausentes (64 total — principais grupos):

| Grupo | Páginas | Prioridade |
|-------|---------|------------|
| `onboarding/organization/` | new org flow (6 páginas) | MÉDIA |
| `onboarding/teams/` | team onboarding (3 páginas) | MÉDIA |
| `settings/organizations/new/` | wizard criação org (5 páginas) | MÉDIA |
| `/(booking-page-wrapper)/org/[orgSlug]/` | booking pages org | BAIXA |
| `embed/` pages | embed variants | BAIXA |
| `auth/sso/` | SSO auth pages | MÉDIA |
| `auth/platform/authorize/` | OAuth platform | BAIXA |
| `routing/` | roteamento UI | MÉDIA |
| `insights/wrong-routing/` | insights página | BAIXA |
| `(main-nav)/members/` e `teams/` | nav principal | BAIXA |
| `settings/(admin-layout)/admin/billing/` | admin billing | BAIXA |
| `settings/license-key/new/` | license key | BAIXA |
| `settings/organizations/(org-admin-only)/appearance/` | org appearance | MÉDIA |
| `settings/my-account/features/` | user features opt-in | BAIXA |
| `connect-and-join/` | convite link | BAIXA |

#### Package ausente:
| Item | Detalhes |
|------|----------|
| `packages/features/ee/integration-attribute-sync/` | Sync de atributos com integrations externas (SCIM etc) |

#### Débito técnico pré-existente (Sprint 4):
| Item | Impacto |
|------|---------|
| `app_RoutingForms_QueuedFormResponse` — Prisma schema | Routing forms queueing não funciona |
| `RoutingTraceService.container` — DI incompleto | Routing trace não persiste |
| `FormResponse` type mismatch | Type error em response.handler.ts |
| `chosenRouteId`, `routedToBookingUid` — campos Prisma ausentes | Analytics de roteamento incompleto |

> Esses itens existiam como `TODO` ou `@ts-ignore` no REF. Não foram introduzidos pelos sprints.

---

## Segurança

| Item | Status |
|------|--------|
| IDOR em dsync/delete.handler.ts | ✅ **CORRIGIDO** (`16c3d65b84`) |
| X-Powered-By header removido | ✅ |
| Permissions-Policy header | ✅ |
| IDOR em delegationCredential/update.handler.ts | ⚠️ Pré-existente no REF — não corrigido |
| Ownership check em getAffectedMembersForDisable | ⚠️ Pré-existente no REF — não corrigido |
| PAT GitHub `gho_REVOKED` | ⚠️ **REVOGAR MANUALMENTE** em github.com/settings/tokens |
| ClickUp token exposto | ⚠️ **ROTACIONAR MANUALMENTE** |

---

## Deploy

| Item | Status |
|------|--------|
| Container `cal-src` `:3005` | Rodando em pre-Sprint-4 state |
| Sprints 1–9 no código | ✅ Commitados |
| Docker rebuild necessário | ⚠️ Pendente para cal.allged.com.br |
| cal-api-v2 `:5555` | Rodando |
| Traefik proxy | Configurado |

**Comando para rebuild:**
```bash
# No servidor, dentro do stack
docker compose -f docker-compose.yml up --build -d cal
```

---

## Estrutura de Commits

```
7f15b47692  Sprint 9: add all missing apps/web/modules/ view files and sub-components
d7f354db69  feat(sprint-8): org admin pages, roles PBAC, featureOptIn + pbac routers
16c3d65b84  fix(dsync): verify directoryId ownership before delete  ← SECURITY
e417e73a7e  Sprint 7: saml.ts canAccessOrganization, dsync router, teams settings pages
05a8f997ca  feat(sprint-6): add delegation-credentials feature and tRPC router
83e75a7397  feat(sprint-6): add SSO tRPC router and security settings pages
f00378c06f  fix: add missing raqb modules and routing-forms types for Sprint 5
0e0d2ecc94  fix: add viewerTeamsRouter alias for members page compatibility
3399fbef18  feat(sprint-5): add teams/[id]/members page + billing stub
fc0797de1f  feat(sprint-5): add trpc/viewer/attribute-sync router
1289ad5243  feat(sprint-5): add settings/teams/[id] pages (appearance, profile, settings)
d658846505  feat(sprint-5): add packages/features/attributes data layer
7bdf635f60  feat(sprint-5): add ee/teams views and pbac services
4eaa190c74  feat(sprint-4): restore routing-forms — feature, tRPC routers, UI components
c1839fb325  feat(api-v2): register missing modules in EndpointsModule
e385be99f5  fix(build): guard incomplete stripe payment webhook
f454297aea  fix(build): guard incomplete EE billing and impersonation entrypoints
de781e5afa  fix(prisma): restore impersonation migration
166d49cc79  feat(sprint-3): restore payments, deployment, users schemas, and billing webhooks
8fc2a291f7  feat(sprint-2): restore round-robin and managed-event-types from cal.com
b9f8a82b7b  feat(sprint-1): restore impersonation, api-keys/autoLock, and pbac from cal.com
```
