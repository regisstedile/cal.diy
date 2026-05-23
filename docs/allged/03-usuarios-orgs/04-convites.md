# Convites de Organização

## Fluxo

```
Admin convida email → Membership criada (accepted=false)
                   → Email enviado ao convidado
                   → Convidado acessa /settings/organizations/invites
                   → Aceita ou recusa
                   → accepted=true (aceito) ou Membership deletada (recusado)
```

## Restrição Importante

**O email convidado deve ter conta no sistema.**

Se o email não existir como `User`, o invite falha com:
> "No user found with that email. They must have a Cal.diy account first."

Para adicionar novo usuário:
1. Desabilitar flag `disable-signup` temporariamente
2. Usuário se cadastra
3. Re-habilitar flag
4. Convidar o usuário

Ou: criar usuário diretamente no DB.

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.organizations.inviteMember` | Enviar convite |
| `viewer.organizations.listPendingInvites` | Convites pendentes do usuário logado |
| `viewer.organizations.acceptInvite` | Aceitar convite |
| `viewer.organizations.declineInvite` | Recusar convite |

## UI

- Admin convida: `/settings/organizations/members` → botão "Invite member"
- Convidado responde: `/settings/organizations/invites`

## Roles Disponíveis ao Convidar

- `MEMBER` (padrão)
- `ADMIN`

Não é possível convidar como OWNER via UI (OWNER só via primeiro criador da org).
