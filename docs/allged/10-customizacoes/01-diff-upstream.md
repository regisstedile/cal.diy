# Customizações vs Upstream cal.diy

## Branch de Deploy

Nossas mudanças estão na branch `deploy`. A branch `main` local segue o upstream `calcom/cal.diy`.

## Commits Customizados (78 commits)

### Insights (Analytics Dashboard)

| Commit | Mudança |
|--------|---------|
| `eb7b606` | **Fix crítico**: adiciona `"insights"` ao ENDPOINTS array → corrige skeleton infinito |
| `c49c3c2` | Marca páginas de insights como `force-dynamic` |
| `6e110f7` | Fix isGlobalAdmin scope, timezone, booking details |
| `6054d0d` | Migra hooks para DataTableProvider de web/modules |
| `498932417d` | Adiciona DataTableProvider e org booking route |
| `8f81096` | Implementa routing insights adapter |

### OAuth e Autenticação

| Commit | Mudança |
|--------|---------|
| `eb7b606` | Normalização de scopes OAuth (READ_PROFILE = PROFILE_READ) |

### Event Types — Times

| Commit | Mudança |
|--------|---------|
| `8a6d8c8` | Tab de atribuição de hosts para event types de time |
| `ddb0f50` | Fix tipo teamMembers |
| `6054d0d` | Simplifica tab, usa import estático |

### Build e Infra

| Commit | Mudança |
|--------|---------|
| `498932417d` | Registra routers insights e saml no tRPC |
| `63fd7cd` | Adiciona handler HTTP para apiKeys tRPC |
| `bc8f9c7` | Fix import Select para build de produção |

### Routing Forms

| Commit | Mudança |
|--------|---------|
| Vários | Separação server/client boundary |

## Arquivos Modificados (Principais)

| Arquivo | Tipo de mudança |
|---------|----------------|
| `packages/trpc/react/shared.ts` | Adicionado `"insights"` ao ENDPOINTS |
| `packages/trpc/server/routers/viewer/oAuth/generateAuthCode.handler.ts` | Normalização de scopes |
| `apps/web/app/(use-page-wrapper)/insights/` | Páginas de insights completas |
| `apps/web/modules/insights/` | Hooks e componentes de insights |
| `packages/i18n/locales/pt-BR/common.json` | Traduções para pt-BR |
| `apps/web/app/(admin-layout)/admin/` | Páginas admin traduzidas |

## Como Atualizar do Upstream

```bash
cd /home/regis/stack/cal-diy

# Ver commits novos no upstream
git fetch origin
git log deploy..origin/main --oneline

# Aplicar no deploy (com potencial conflito)
git rebase origin/main deploy

# Resolver conflitos, depois:
git push fork deploy:main --force
```

**CUIDADO**: O rebase pode ter conflitos em arquivos que modificamos (shared.ts, etc.).
