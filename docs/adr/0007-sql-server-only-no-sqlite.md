# ADR-0007: SQL Server é o único dialeto — SQLite proibido nas migrations

**Status**: Aceito
**Data**: 2026-07
**Escopo**: ADM Copy ERP e qualquer código que toque o MSSQL de 192.168.0.252

---

## Contexto

O ADM Copy ERP roda em SQL Server (`192.168.0.252\SQLEXPRESS22`). Migrations
escritas ou testadas em SQLite passam localmente e **quebram em produção** por
diferença de dialeto. Dois bugs reais achados numa sessão: `0049_jobs.sql` usava
sintaxe SQLite; `0050_cobranca_fields.sql` faltava o separador de batch `GO` do
T-SQL — ambos só reproduzíveis num SQL Server real.

## Decisão

Todo SQL de produção assume **exclusivamente T-SQL / SQL Server**. Nenhuma
migration é validada contra SQLite. Validação experimental (Fase D do protocolo)
usa um **SQL Server 2022 descartável em Docker**, não um substituto de dialeto.

## Consequências

**Positivas:**
- Bugs de dialeto pegos antes do deploy, não em produção
- Uma verdade só sobre sintaxe/batch/tipos

**Negativas:**
- Teste local exige subir container SQL Server (mais pesado que SQLite)
- Sem portabilidade fácil para outro banco (acoplamento assumido)

## Referências

- `admcopy-erp/docs/AUDITORIA-MIGRATIONS.md`
- [ENGINEERING-AUDIT-PROTOCOL](../ENGINEERING-AUDIT-PROTOCOL.md) Fase D
