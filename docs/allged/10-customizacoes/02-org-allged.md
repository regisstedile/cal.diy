# Organização ALLGED — Estado Atual

## Dados no DB

```sql
-- Organização
SELECT id, name, slug FROM "Team" WHERE "isOrganization" = true;
-- 2 | allged | allged

-- Membership
SELECT u.email, m.role, m.accepted 
FROM "Membership" m JOIN users u ON m."userId" = u.id 
WHERE m."teamId" = 2;
-- registedile@gmail.com | OWNER | true

-- Usuários e suas orgs
SELECT id, email, username, role, "organizationId" FROM users;
-- 1 | registedile@gmail.com  | registedile-gmail.com | ADMIN | 2
-- 2 | tecnicoastoria@gmail.com | weliton             | USER  | null
-- 3 | tecnicoallged@gmail.com  | weslley             | USER  | null
```

## Pendências

### Técnicos fora da org

`weliton` e `weslley` têm `organizationId = null`. Precisam ser convidados para a org `allged`.

Para convidar:
1. Acesse `/settings/organizations/members`
2. Convite por email: `tecnicoastoria@gmail.com` e `tecnicoallged@gmail.com`
3. Técnicos aceitam em `/settings/organizations/invites`

### Single-Org-Mode

`NEXT_PUBLIC_SINGLE_ORG_SLUG` está vazio. Considerar habilitar com `allged` para:
- URLs mais limpas (`/weliton` em vez de `/allged/weliton`)
- Melhor integração do booking page com a org

Para habilitar: editar `/home/regis/stack/.env`:
```
CAL_SRC_ORG_SLUG=allged
```
Depois rebuild do container.

## OrganizationSettings

```sql
SELECT * FROM "OrganizationSettings" WHERE "organizationId" = 2;
```

Criado automaticamente pelo `create.handler.ts` com:
- `orgAutoAcceptEmail`: domínio do email do criador (gmail.com)
- `isOrganizationConfigured`: true

## Acesso à Org via Settings

- Perfil: `/settings/organizations/profile`
- Geral: `/settings/organizations/general`
- Membros: `/settings/organizations/members`
- Convites: `/settings/organizations/invites`
