# Feature Flags — Configuração da Instância ALLGED

## Estado Atual no DB (cal_src)

```sql
SELECT slug, enabled, type FROM "Feature" ORDER BY slug;
```

| Flag | Habilitada | Propósito |
|------|-----------|-----------|
| `disable-signup` | **✅ ON** | Bloqueia novos cadastros |
| (demais flags) | ❌ OFF | Ver tabela completa em 07-admin/01-feature-flags.md |

## Flags Que Deveriam Ser Revisadas

### `webhooks`
**Recomendado: ON**
Webhooks estão configurados para n8n, mas a flag pode precisar estar ON para funcionar.

```sql
UPDATE "Feature" SET enabled = true WHERE slug = 'webhooks';
```

### `teams`
**Considerar: ON** se usar times dentro da org.

```sql
UPDATE "Feature" SET enabled = true WHERE slug = 'teams';
```

### `insights`
A flag `insights` no DB pode precisar estar ON para o dashboard funcionar corretamente (além do fix do ENDPOINTS).

```sql
UPDATE "Feature" SET enabled = true WHERE slug = 'insights';
```

### `google-calendar`
**ON** se quiser que usuários conectem Google Calendar pela interface.

## Como Modificar Flags

### Via UI (recomendado)
`/settings/admin/flags` → toggle

### Via SQL (direto no banco)
```sql
-- Habilitar
UPDATE "Feature" SET enabled = true, "updatedAt" = NOW() WHERE slug = 'nome-da-flag';

-- Desabilitar
UPDATE "Feature" SET enabled = false, "updatedAt" = NOW() WHERE slug = 'nome-da-flag';

-- Inserir flag que não existe
INSERT INTO "Feature" (slug, enabled, type, description, "createdAt", "updatedAt")
VALUES ('nome-da-flag', true, 'OPERATIONAL', 'Descrição', NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET enabled = true, "updatedAt" = NOW();
```

## Flags Que NÃO Habilitar

| Flag | Motivo |
|------|--------|
| `emails` | Lógica invertida — habilitar BLOQUEIA emails |
| `saml` | Não há provedor SAML configurado |
| `credits` | Sem sistema de billing ativo |
| `stripe` | Sem conta Stripe configurada |
