# Auditoria de schema drift — banco `cal_src` vs `schema.prisma`

**Gerado:** 2026-07-11. Motivada por um falso positivo na Sprint 11.2 (achei que
`Membership.disableImpersonation` era campo não-migrado; era imprecisão minha).
Método: `prisma migrate diff --from-url <cal_src> --to-schema-datamodel schema.prisma`
+ conferência em `information_schema`. Fase D/C do protocolo.

## Resultado: banco praticamente alinhado ao schema

O único drift entre banco e schema é **1 default de coluna, benigno**:

```sql
ALTER TABLE "App_RoutingForms_FormResponse" ALTER COLUMN "uuid" DROP DEFAULT;
```

- **Banco tem:** `column_default = (gen_random_uuid())::text` (default no nível DB).
- **Schema declara:** `uuid String @unique @default(uuid())` — o Prisma gera o uuid
  na aplicação, não pede default no DB.
- **Impacto:** nenhum. O default do DB é redundante (o Prisma sempre fornece o
  valor). Não corrigir — mexer no banco sem necessidade viola o protocolo. Fica
  registrado como conhecido/benigno.

## Correção do falso positivo da Sprint 11.2

`Membership.disableImpersonation` **não é drift**. Fatos verificados:
- `schema.prisma:519` (`disableImpersonation Boolean @default(false)`) pertence ao
  model **User** (começa na linha 403), NÃO ao Membership (linha 770).
- Banco: `User.disableImpersonation` **existe**; `Membership` não tem coluna de
  impersonation (colunas reais: accepted, createdAt, customRoleId, id, role,
  teamId, updatedAt, userId).
- Schema: o model Membership do fork **não declara** disableImpersonation.

**Conclusão corrigida:** o fork **removeu** impersonation do nível de Membership
(só User mantém). O `updateMembership` do REF, que grava `Membership.disableImpersonation`,
é incompatível com o model do fork — portá-lo é decisão de produto (readicionar o
campo + migration), não correção de drift. A decisão da Sprint 11.2 (não portar)
segue certa; só a causa estava mal descrita e foi corrigida no código e no fechamento.

## Como re-rodar

```bash
node_modules/.bin/prisma migrate diff \
  --from-url "postgresql://cal_src:***@<postgres-ip>:5432/cal_src" \
  --to-schema-datamodel packages/prisma/schema.prisma --script
```
(IP do postgres drifta — ver comentário no `.env`.)
