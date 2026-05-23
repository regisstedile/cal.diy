# Admin — Gestão de Usuários

## Página

`/settings/admin/users`

Lista todos os usuários da instância com ações de gerenciamento.

## Usuários Atuais (ALLGED)

| ID | Email | Username | Role | Org |
|----|-------|----------|------|-----|
| 1 | registedile@gmail.com | registedile-gmail.com | ADMIN | allged (id=2) |
| 2 | tecnicoastoria@gmail.com | weliton | USER | null |
| 3 | tecnicoallged@gmail.com | weslley | USER | null |

## Ações Disponíveis

### Via UI (`/settings/admin/users`)

- **Editar usuário**: Alterar nome, email, username, role
- **Impersonar**: Logar como o usuário para debug
- **Deletar**: Remove o usuário permanentemente

### Via SQL

```sql
-- Ver todos os usuários
SELECT id, email, username, role, "organizationId", "createdDate"
FROM users
ORDER BY id;

-- Promover a ADMIN
UPDATE users SET role = 'ADMIN' WHERE email = 'email@exemplo.com';

-- Ver memberships de time/org
SELECT u.email, t.name as team, m.role as team_role
FROM "Membership" m
JOIN users u ON m."userId" = u.id
JOIN "Team" t ON m."teamId" = t.id;
```

## Pendências ALLGED

### Técnicos sem Org

`weliton` e `weslley` têm `organizationId = null`. Para resolver:

1. Acesse `/settings/organizations/members`
2. Convide via email: `tecnicoastoria@gmail.com` e `tecnicoallged@gmail.com`
3. Técnicos aceitam o convite em `/settings/organizations/invites`

Após aceite, `organizationId` será atualizado para `2` (org allged).

### Impersonation

Útil para debug. Em produção, usar com cuidado — as ações feitas sob impersonation afetam a conta real do usuário.

```
/settings/admin/users → clicar em "Impersonar" → sessão muda para o usuário
```

## tRPC

```
viewer.admin.listPaginated    -- lista paginada de usuários
viewer.admin.getUserById      -- detalhes de um usuário
viewer.admin.deleteUser       -- remove usuário
viewer.admin.sendPasswordResetEmail -- enviar email de reset
```
