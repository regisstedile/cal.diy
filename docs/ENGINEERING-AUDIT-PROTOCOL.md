# ENGINEERING AUDIT PROTOCOL

**Protocolo transversal** — aplica-se a TODOS os projetos do ambiente (Cal.diy,
ADM Copy ERP, FieldOps, MPS OS, allged-web, mcp-allged, etc.), não só ao cal.diy.
Vive aqui por estar num repo versionado/pushed; fonte canônica a espelhar em
`/home/regis/OPS/` quando este virar git. Destilado de uma sessão real
(ADMCOPY + Cal.diy, 2026-07) onde este ciclo emergiu naturalmente e provou valer
mais que qualquer prompt isolado.

**Princípio central:** hipótese → experimento → evidência → correção → revalidação
→ documentação. Nenhuma etapa pula a prova.

---

## As 8 fases (A–H)

Cada projeto segue exatamente esta ordem. Só se avança de fase quando a anterior
tem evidência registrada.

### Fase A — Inventário
Levantar o que existe, sem interpretar ainda. Estrutura, apps, packages, deps,
entrypoints, banco, filas, webhooks, CI, Docker, cron, integrações, testes, docs.
**Saída:** `docs/<projeto>/00-MAPA-GERAL.md` (ou equivalente).
**Gate:** o inventário foi feito lendo o disco/banco AO VIVO, não de memória.

### Fase B — Análise
Como o sistema realmente funciona: fluxo usuário → frontend → API → services →
repos → banco → webhooks → integrações → workers → retorno. Mapear domínios.
**Saída:** `docs/<projeto>/02-MAPA-DOS-DOMINIOS.md`.
**Gate:** cada afirmação de comportamento aponta para `arquivo:linha` ou query.

### Fase C — Revisão crítica (da própria análise)
Criticar as conclusões da Fase B. Para cada uma: **confirmar de novo no código** e
classificar `✅ confirmado` / `🟡 provável` / `❓ não verificado`. Listar tudo sem
evidência suficiente. **Gate anti-fraqueza #2** (docs longos viram "verdade" cedo
demais): nenhum documento é fonte de verdade antes de passar por esta fase.

### Fase D — Prova experimental
**Gate anti-fraqueza #1** (conclusão antes do experimento — o erro da migration
0050): nenhuma conclusão CAUSAL é aceita sem um experimento reproduzível. Subir
container descartável, rodar a migration real, reproduzir o bug, medir. Se a
hipótese não sobreviver ao experimento, refiná-la — e registrar que foi refinada.
**Saída:** evidência (comando + output) no doc de auditoria.

### Fase E — Correção mínima
UMA melhoria por vez: **< 10 arquivos, < 500 linhas de diff, um fluxo, um commit
lógico, sem mudar comportamento não-relacionado**. Antes de editar, registrar:
arquivos a modificar/criar, contratos a preservar, migrations (se houver), riscos,
testes a rodar. Não importar dependências (billing/PBAC/enterprise) só para
satisfazer tipos.

### Fase F — Evidência de funcionamento
Rodar type-check + lint + testes da área tocada. **Diferenciar explicitamente
erros NOVOS (provocados pelo diff) de erros PRÉ-EXISTENTES (baseline)** — nunca
esconder um no outro. Para deploy: cadeia completa código → imagem → container →
proxy → rota pública → dependências → comportamento, cada elo verificado.
**Gate:** se algo falha, não declarar pronto; corrigir o mínimo e revalidar.

### Fase G — Atualização da documentação
Atualizar mapas/matrizes/status no mesmo commit ou imediatamente após. Regenerar o
que for automatizável (ex.: `scripts/parity_*.py`) em vez de editar número na mão.

### Fase H — Planejamento da próxima sprint
Só agora, com o terreno provado. Triagem verificável do backlog (não "achei →
porto"): matriz → priorização → primeira fatia pequena. Fechamento formal da fatia
anterior antes de abrir a próxima.

---

## Métricas: cobertura auditada × prontidão operacional

**Gate anti-fraqueza #3:** proibido `Arquitetura = 90%` como número único — "90%"
significa coisas diferentes em contextos diferentes. Toda área usa DUAS métricas
independentes, cada uma com critério objetivo declarado:

- **Cobertura auditada** = quanto da área foi efetivamente verificada (lida/testada
  ao vivo). Critério: nº de componentes inspecionados ÷ total conhecido.
- **Prontidão operacional** = quanto está pronto para o objetivo real do projeto.
  Critério: nº de requisitos do objetivo satisfeitos ÷ total, ou paridade de
  procedures/rotas medida por script.

Exemplo (formato obrigatório do STATUS-EXECUTIVO de qualquer projeto):

| Área | Cobertura auditada | Prontidão operacional | Base do número |
|---|---|---|---|
| Backend | 100% | 92% | tsc limpo; 2 handlers billing fora de escopo |
| CI | 100% | 85% | 4 jobs verdes; falta job de e2e real |
| Produção | 80% | 45% | probes ok; rollback só via rebuild |
| Fiscal | 100% | 10% | módulo mapeado, quase nada implementado |

Um número sem a coluna "base" é inválido — deve derivar de critério verificável,
nunca de impressão.

---

## Classificação de fatos (usar em todo doc)

`✅ confirmado` (comando rodado, output conferido nesta sessão) ·
`🟡 provável` (memória/doc recente, não re-verificado) ·
`❓ não verificado` (declarar como descoberta pendente, jamais preencher com suposição).

Datas relativas viram absolutas. `[[links]]` entre docs. Nada inventado: se não
foi checado no disco, é gap, não fato.

---

## Checklist rápido (colar no início de cada auditoria)

- [ ] A: inventário ao vivo feito, não de memória
- [ ] B: cada comportamento com `arquivo:linha`/query
- [ ] C: conclusões reclassificadas ✅/🟡/❓; sem-evidência listados
- [ ] D: conclusões causais provadas por experimento reproduzível
- [ ] E: correção < 10 arquivos / < 500 linhas / 1 fluxo / contratos preservados registrados
- [ ] F: erros novos separados do baseline; cadeia de deploy verificada elo a elo
- [ ] G: docs/matrizes atualizados; números regenerados por script
- [ ] H: fatia anterior fechada formalmente antes da próxima
- [ ] Métricas em duas colunas (cobertura × prontidão) com base declarada
