# Admin — OAuth Clients (Platform)

## O que é o OAuth Platform

A instância ALLGED funciona como um **OAuth Authorization Server**. Apps externos (como o app mobile companion) se autenticam via OAuth 2.0 para acessar a API em nome dos usuários.

## Página Admin

`/settings/admin/oAuth`

Lista todos os `PlatformOAuthClient` registrados.

## Banco de Dados

Os OAuth Clients ficam no banco `cal` (não `cal_src`):

```sql
-- Conectar ao banco cal
\c cal

SELECT id, name, "redirectUris", "organizationId"
FROM "PlatformOAuthClient";
```

## Cliente Atual (ALLGED Mobile)

```
Name: allged-mobile (ou similar)
Client ID: cal_xxxxxxx
Redirect URI: myapp://callback
```

**ATENÇÃO**: O `client_secret` é visível no APK decompilado. Risco aceitável para app interno, mas não para apps públicos.

## Scopes Suportados

| Scope | Alias | Descrição |
|-------|-------|-----------|
| `PROFILE_READ` | `READ_PROFILE` | Ler perfil do usuário |
| `BOOKING_READ` | `READ_BOOKING` | Ler bookings |
| `BOOKING_WRITE` | `WRITE_BOOKING` | Criar/cancelar bookings |
| `EVENT_TYPE_READ` | `READ_EVENT_TYPE` | Ler event types |
| `AVAILABILITY_READ` | `READ_AVAILABILITY` | Ler disponibilidade |

A normalização de scopes está em:
`packages/trpc/server/routers/viewer/oAuth/generateAuthCode.handler.ts`

## Criar Novo OAuth Client

Via UI (`/settings/admin/oAuth`):
1. Clique em "Criar novo client"
2. Preencha nome e redirect URIs
3. Associe a uma organização (opcional)
4. Copie `client_id` e `client_secret` gerados

Via SQL (emergência):
```sql
-- NÃO fazer em produção sem necessidade
INSERT INTO "PlatformOAuthClient" (...)
VALUES (...);
```

## Fluxo OAuth do Mobile

```
App Mobile → /oauth/authorize?client_id=...&scope=...
    → Usuário loga no cal.allged.com.br
    → Redirect para myapp://callback?code=...
    → App troca code por tokens em /oauth/token
    → Usa access_token para chamar API
```

Ver detalhes em: `docs/allged/05-api/03-oauth-flow.md`
