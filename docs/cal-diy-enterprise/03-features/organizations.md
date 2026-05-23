---
title: "Feature — Organizations"
tags: [cal-diy, organizations, trpc, prisma, playwright]
created: 2026-05-23
---

# Feature — Organizations

## Para que serve

Organizations agrupam usuários em uma entidade `Team` com `isOrganization = true`. A organização controla membros, convites, roles, perfil organizacional e SSO/SAML.

## Fluxos cobertos

- Criar organização.
- Editar dados gerais: nome, slug e bio.
- Listar membros.
- Convidar usuário existente.
- Aceitar convite.
- Recusar convite.
- Alterar role de membro.
- Remover membro.
- Ler/salvar/remover configuração SAML.

## Arquivos principais

| Camada | Arquivos |
|---|---|
| UI geral | `apps/web/app/(use-page-wrapper)/settings/(settings-layout)/organizations/general/page.tsx` |
| UI membros | `apps/web/app/(use-page-wrapper)/settings/(settings-layout)/organizations/members/page.tsx` |
| UI convites | `apps/web/app/(use-page-wrapper)/settings/(settings-layout)/organizations/invites/page.tsx` |
| UI SSO/SAML | `apps/web/app/(use-page-wrapper)/settings/(settings-layout)/organizations/sso/page.tsx` |
| tRPC router | `packages/trpc/server/routers/viewer/organizations/_router.tsx` |
| tRPC schemas | `packages/trpc/server/routers/viewer/organizations/schema.ts` |
| Handlers | `packages/trpc/server/routers/viewer/organizations/*.handler.ts` |
| Helpers | `packages/trpc/server/routers/viewer/organizations/organizationUtils.ts` |
| Prisma | `packages/prisma/schema.prisma` |
| E2E | `apps/web/playwright/settings/organizations.e2e.ts` |
| Docs ALLGED | `docs/allged/03-usuarios-orgs/` |

## Contratos tRPC

| Procedure | Tipo | Input | Papel |
|---|---|---|---|
| `viewer.organizations.getCurrent` | query | none | Retorna organização atual + role + `canUpdate` |
| `viewer.organizations.create` | mutation | `name`, `slug`, `bio` | Cria organização e define usuário como owner |
| `viewer.organizations.update` | mutation | `name`, `slug`, `bio` | Atualiza dados gerais |
| `viewer.organizations.listMembers` | query | `search`, `cursor`, `limit` | Lista memberships aceitas/paginadas |
| `viewer.organizations.inviteMember` | mutation | `email`, `role?` | Cria membership pendente |
| `viewer.organizations.removeMember` | mutation | `userId` | Remove membro não-owner |
| `viewer.organizations.updateMemberRole` | mutation | `userId`, `role` | Altera role para `MEMBER` ou `ADMIN` |
| `viewer.organizations.listPendingInvites` | query | none | Lista convites pendentes do usuário logado |
| `viewer.organizations.acceptInvite` | mutation | `teamId` | Aceita convite e cria profile org |
| `viewer.organizations.declineInvite` | mutation | `teamId` | Remove membership pendente |
| `viewer.organizations.getSamlSettings` | query | none | Retorna disponibilidade e conexão SAML |
| `viewer.organizations.saveSamlConnection` | mutation | `rawMetadata` | Cria/atualiza conexão SAML no Jackson |
| `viewer.organizations.deleteSamlConnection` | mutation | none | Remove conexão SAML da organização |

## Validações runtime

Arquivo: `packages/trpc/server/routers/viewer/organizations/schema.ts`.

- `slug`: 2 a 48 caracteres, lowercase, números e hífens simples.
- `name`: 2 a 80 caracteres.
- `bio`: até 500 caracteres.
- `email`: email válido para convite.
- `role`: convite e update aceitam apenas `MEMBER` ou `ADMIN`; `OWNER` não é atribuído por essas mutações.
- `rawMetadata`: obrigatório para salvar SAML.

## Modelos Prisma relevantes

| Modelo | Papel |
|---|---|
| `Team` | Organização quando `isOrganization = true`; times filhos usam `parentId` |
| `OrganizationSettings` | Configurações específicas da org, domínio auto-accept, admin API, emails, SEO, SAML indireto |
| `Membership` | Relaciona usuário e organização/time; controla `accepted` e `role` |
| `MembershipRole` | `MEMBER`, `ADMIN`, `OWNER` |
| `Profile` | Perfil do usuário dentro da organização |
| `User.organizationId` | Campo legado/de conveniência ainda atualizado nos fluxos atuais |

## Regras de negócio observadas

### Criar organização

Handler: `create.handler.ts`.

- Usuário precisa existir.
- Usuário não pode já ter `organizationId`.
- Usuário não pode já ter membership aceita em outra organização.
- Slug é normalizado e precisa estar disponível.
- Transação cria `Team`, `OrganizationSettings`, `Membership OWNER`, `Profile` e atualiza `User.organizationId`.

### Convidar membro

Handler: `inviteMember.handler.ts`.

- Apenas owner/admin pode gerenciar organização via `assertCanManageOrganization`.
- Invitee precisa existir como usuário Cal.diy.
- Invitee não pode pertencer a outra organização.
- Cria `Membership` com `accepted = false`.
- Erro único Prisma `P2002` vira conflito legível.
- Email de convite é tentativa best-effort: falha de envio é logada, mas não desfaz membership.

### Aceitar convite

Handler: `acceptInvite.handler.ts`.

- Membership pendente precisa existir.
- Usuário precisa existir.
- Convite aceito não pode ser aceito de novo.
- Usuário não pode já pertencer a outra organização.
- Transação atualiza membership, cria `Profile` e seta `User.organizationId`.

### Recusar convite

Handler: `declineInvite.handler.ts`.

- Remove apenas membership pendente (`accepted = false`).
- Se nada foi removido, retorna `NOT_FOUND`.

### Alterar role

Handler: `updateMemberRole.handler.ts`.

- Apenas owner/admin pode gerenciar.
- Não altera role de `OWNER`.
- Se membro não existe: `NOT_FOUND`.
- Se alvo é owner: `FORBIDDEN`.

### Remover membro

Handler: `removeMember.handler.ts`.

- Apenas owner/admin pode gerenciar.
- Usuário não pode remover a si mesmo.
- Não remove owner.
- Remove membership e depois, em transação, remove `Profile` da organização e limpa `User.organizationId` quando aplicável.

### SAML

Handler: `saml.handler.ts`.

- Leitura funciona mesmo sem `SAML_DATABASE_URL`, retornando `isSamlAvailable = false`.
- Salvar/remover exige `SAML_DATABASE_URL` e owner/admin.
- Tenant Jackson é `org-{organizationId}`.
- ACS URL e Entity ID vêm de `WEBAPP_URL + samlPath`.

## Fluxo UI

### General

`general/page.tsx` usa `viewer.organizations.getCurrent`. Se não existe organização, submit chama `create`; se existe, chama `update`. O form usa `slugify` antes de enviar.

### Members

`members/page.tsx` usa `listMembers`. Ações:

- abrir dialog de convite;
- `inviteMember` com email e role;
- `updateMemberRole` pelo select;
- `removeMember` pelo botão destrutivo.

Após mutações, invalida `listMembers` e mostra toast.

### Invites

`invites/page.tsx` usa `listPendingInvites`. Ações:

- `acceptInvite`: invalida invites + `viewer.me.get`, mostra toast e redireciona para `/settings/organizations/general`;
- `declineInvite`: invalida invites e mostra toast.

### SSO

`sso/page.tsx` usa `getSamlSettings`. Se SAML não está habilitado por env, mostra alerta. Se habilitado, permite copiar ACS/Entity ID, salvar metadata XML e apagar conexão.

## Testes existentes

Arquivo: `apps/web/playwright/settings/organizations.e2e.ts`.

Cobertura atual: 7 testes passando.

| Teste | O que protege |
|---|---|
| owner can create an organization | criação de `Team isOrganization`, submit da tela general |
| owner sees members page with self listed | membership owner e tela members |
| owner can invite existing member and member sees pending invite | criação de membership pendente e visibilidade para invitee |
| invitee can accept an org invite | aceita invite, seta `organizationId`, cria `Profile` |
| invitee can decline an org invite | remove membership pendente |
| owner can change a member's role | `MEMBER -> ADMIN` via UI e persistência no banco |
| owner can remove a member | remoção da UI e deleção de membership |

Comando validado:

```bash
NEXT_PUBLIC_IS_E2E=1 PLAYWRIGHT_HEADLESS=1 corepack yarn playwright test apps/web/playwright/settings/organizations.e2e.ts --project=@calcom/web --workers=1
```

Resultado validado em 2026-05-23: `7 passed`.

## Riscos e lacunas

- Convite só funciona para usuário já existente; não cobre invite de email externo sem conta.
- `User.organizationId` é comentado como deprecated no schema, mas ainda é atualizado pelos fluxos; futuras mudanças precisam coordenar `Profile` e membership.
- SAML depende de `SAML_DATABASE_URL`; sem env, a UI apenas informa indisponibilidade.
- E2E cobre fluxo principal, mas não cobre erros: remover owner, self-remove, duplicate invite, slug duplicado, SAML save/delete.
- Role customizada (`customRoleId`) existe no schema, mas o fluxo UI atual usa apenas `MEMBER`/`ADMIN`/`OWNER`.

## Próximas melhorias recomendadas

1. Adicionar testes negativos de Organizations para owner/self/duplicate invite.
2. Documentar `organizationUtils.ts`, principalmente `assertCanManageOrganization` e slug/profile helpers.
3. Documentar SAML com envs e runbook de Jackson.
4. Criar diagrama curto do ciclo `Membership.accepted=false -> accepted=true -> Profile + organizationId`.
