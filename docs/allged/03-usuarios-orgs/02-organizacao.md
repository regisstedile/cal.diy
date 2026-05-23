# Organização ALLGED

## O que é uma Organização

No cal.diy, uma organização é um `Team` com `isOrganization = true`. O mesmo modelo serve para times e orgs — distinção só pelo campo booleano.

## Org ALLGED no DB

```sql
SELECT id, name, slug, "isOrganization" FROM "Team" WHERE "isOrganization" = true;
-- id=2, name=allged, slug=allged, isOrganization=true
```

## OrganizationSettings

Configurações específicas da org:

| Campo | Descrição |
|-------|-----------|
| `orgAutoAcceptEmail` | Domínio cujos emails são auto-aceitos (@allged.com.br) |
| `isOrganizationConfigured` | Setup completo |
| `isOrganizationVerified` | Email de domínio verificado |
| `allowSEOIndexing` | Permite indexação pública |

## NEXT_PUBLIC_SINGLE_ORG_SLUG

Variável de ambiente que ativa o **Single-Org-Mode**.

**Estado atual**: vazio (desabilitado)

Quando habilitado com `tecnicos-allged`:
- Todos os domínios tratados como domínio da org
- URL pública: `cal.allged.com.br/weliton` em vez de `cal.allged.com.br/allged/weliton`
- Root path rewrite desabilitado (dashboard na raiz)

Para habilitar, editar `/home/regis/stack/.env`:
```
CAL_SRC_ORG_SLUG=allged
```
Depois rebuild do container.

## Como Criar Org (via UI)

1. Acesse `/settings/organizations/general`
2. Preencha Nome e Slug (sem pontos, só letras/números/hífens)
3. Clique "Criar organização"

O handler (`create.handler.ts`) executa em transação:
```typescript
// 1. Cria Team com isOrganization=true
// 2. Cria Membership (criador = OWNER)
// 3. Cria Profile para o criador na org
// 4. Atualiza user.organizationId
```

## Seção de Settings

A seção "Organização" no sidebar **sempre aparece** (hardcoded `return true`). Páginas disponíveis:
- Perfil — info da org
- Geral — editar nome/slug/bio
- Convites — convites pendentes
- Membros — gerenciar membros

## ORGANIZATIONS_ENABLED

Build arg no docker-compose:
```yaml
ORGANIZATIONS_ENABLED: "1"
```

Habilita a feature de orgs no código. Sem isso, páginas de org não renderizam.
