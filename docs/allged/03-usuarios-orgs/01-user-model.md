# Modelo de Usuário

## Campos Principais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Int | PK |
| `email` | String | Email único |
| `username` | String | Username na URL pública |
| `name` | String? | Nome completo |
| `role` | Enum | `USER` ou `ADMIN` |
| `organizationId` | Int? | Org à qual pertence |
| `timeZone` | String | Timezone padrão ("America/Sao_Paulo") |
| `locale` | String | Idioma ("pt-BR") |
| `emailVerified` | DateTime? | Quando email foi verificado |
| `identityProvider` | Enum | `CAL`, `GOOGLE`, `SAML` |
| `twoFactorEnabled` | Bool | 2FA ativo |
| `createdDate` | DateTime | Criação |

## Roles

| Role | Acesso |
|------|--------|
| `USER` | Acesso ao próprio perfil, event types, bookings |
| `ADMIN` | Tudo do USER + painel admin (`/settings/admin/*`) |

## Profile

Quando o usuário entra em uma organização, um `Profile` é criado:

```
User id=1 (registedile@gmail.com)
  └─ Profile:
       - uid: uuid
       - username: "regis" (pode ser diferente do user.username)
       - organizationId: 2 (org allged)
```

Isso permite que o mesmo usuário tenha usernames diferentes em orgs diferentes.

## Senhas

Armazenadas separadamente no modelo `UserPassword` (hash bcrypt). Não está no model `User` por questões de segurança — nunca retornar hash acidentalmente.

## Contas OAuth Vinculadas

Modelo `Account`: quando usuário faz login via Google, cria um Account com:
- `provider`: "google"
- `access_token` / `refresh_token`: tokens do Google
- `providerAccountId`: ID do usuário no Google

## Usuários Atuais (ALLGED)

| ID | Email | Username | Role | OrgId |
|----|-------|----------|------|-------|
| 1 | registedile@gmail.com | registedile-gmail.com | ADMIN | 2 |
| 2 | tecnicoastoria@gmail.com | weliton | USER | null |
| 3 | tecnicoallged@gmail.com | weslley | USER | null |

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.me.get` | Dados do usuário atual |
| `viewer.me.update` | Atualiza perfil |
| `viewer.users.get` | Busca usuário por username (admin) |
| `viewer.admin.listPaginated` | Lista usuários (admin) |
