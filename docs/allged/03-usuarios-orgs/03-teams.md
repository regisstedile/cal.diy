# Teams

## Modelo Team

`Team` serve tanto para **times** (grupos de trabalho) quanto para **organizações** (`isOrganization=true`).

| Campo | Descrição |
|-------|-----------|
| `id` | PK |
| `name` | Nome do time |
| `slug` | URL slug |
| `isOrganization` | true = org, false = time |
| `parentId` | ID da org pai (para times dentro de uma org) |
| `logoUrl` | Logo do time |
| `bio` | Descrição |
| `hideBranding` | Ocultar branding cal.diy |

## Membership

Vínculo entre User e Team:

| Campo | Descrição |
|-------|-----------|
| `userId` | Usuário |
| `teamId` | Time/Org |
| `role` | OWNER, ADMIN ou MEMBER |
| `accepted` | Se aceitou o convite |

## Roles dentro do Time

| Role | Permissões |
|------|-----------|
| `OWNER` | Tudo, incluindo deletar o time |
| `ADMIN` | Gerenciar membros, event types do time |
| `MEMBER` | Participar dos event types, ver membros |

## Hierarquia Org → Times

```
Team (isOrganization=true) id=2 "allged"
  ├─ Team (isOrganization=false, parentId=2) "Técnicos"
  │   ├─ Membership: weliton (MEMBER)
  │   └─ Membership: weslley (MEMBER)
  └─ Team (isOrganization=false, parentId=2) "Suporte"
      └─ ...
```

Ainda não criamos times internos — apenas a org existe.

## Event Types de Time

Um EventType pode pertencer a um time (`teamId` preenchido). Tipos:
- `ROUND_ROBIN`: distribuído entre membros disponíveis
- `COLLECTIVE`: todos os membros devem estar livres

## Settings de Times

`/settings/teams` — lista times do usuário

Cada time tem:
- Perfil (nome, logo, slug)
- Membros
- Event Types
- Webhooks do time

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.teams.list` | Times do usuário |
| `viewer.teams.get` | Time por ID |
| `viewer.teams.create` | Criar time |
| `viewer.teams.update` | Atualizar time |
| `viewer.teams.removeMember` | Remover membro |
| `viewer.teams.inviteMember` | Convidar membro |
