# Registro de Decisões de Arquitetura

## 2026-05-22 — Fix: insights endpoint no ENDPOINTS array

**Problema**: Página `/insights` ficava em skeleton eterno.

**Causa**: `"insights"` não estava no array `ENDPOINTS` em `packages/trpc/react/shared.ts`. Sem essa entry, `links["insights"]` era `undefined` → TypeError → `isError=true` → skeleton permanente.

**Solução**: Adicionar `"insights"` ao array ENDPOINTS.

**Lição**: Todo router tRPC precisa estar no ENDPOINTS array. Se adicionar novo router e a página não carrega, verificar este arquivo primeiro.

---

## 2026-05-22 — Fix: normalização de scopes OAuth

**Problema**: App mobile enviava `READ_PROFILE` mas backend validava como `PROFILE_READ` (ou vice-versa). Login falhava.

**Solução**: `generateAuthCode.handler.ts` agora normaliza qualquer formato de scope para o enum correto antes de validar:
```typescript
const SCOPE_ALIASES = {
  READ_PROFILE: AccessScope.READ_PROFILE,
  PROFILE_READ: AccessScope.READ_PROFILE,
  ...
};
```

**Lição**: APIs externas que aceitam parâmetros de scope devem normalizar formatos alternativos.

---

## 2026-05-22 — Dois bancos PostgreSQL

**Situação**: O sistema usa dois bancos: `cal` e `cal_src`.

**Razão**: `PlatformOAuthClient` foi implementado originalmente no banco `cal` (banco padrão do cal.com). O banco `cal_src` é onde estão todos os dados reais dos usuários.

**Impacto**: Ao debugar, verificar em qual banco cada tabela está. `PlatformOAuthClient` → `cal`. Todo o resto → `cal_src`.

---

## 2026-05-22 — `disable-signup` habilitado

**Decisão**: Flag `disable-signup = true` para impedir cadastros não autorizados.

**Razão**: Instância privada — só técnicos ALLGED devem ter acesso.

**Para adicionar novo usuário**: desabilitar temporariamente, criar conta, reabilitar.

---

## 2026-05-23 — Organização `allged` criada

**Decisão**: Criar org com slug `allged` via interface `/settings/organizations/general`.

**Estado atual**: Só o admin (registedile@gmail.com) está na org. Técnicos weliton e weslley ainda têm `organizationId = null`.

**Próximo passo**: Convidar técnicos para a org e avaliar habilitar `NEXT_PUBLIC_SINGLE_ORG_SLUG=allged`.

---

## 2026-05-23 — Branch `deploy` em vez de `main`

**Decisão**: Manter customizações na branch `deploy` e o upstream em `main`.

**Razão**: Facilita visualizar o diff entre nossa versão e o upstream. `git log main..deploy` mostra todos os commits customizados.

**GitHub**: O fork `regisstedile/cal.diy` main = nossa branch `deploy`.
