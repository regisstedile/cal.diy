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

Cada projeto segue exatamente esta ordem. Cada fase tem **entrada** e **saída
obrigatória** (critério de saída) — não se avança sem produzir a saída. Uma fase
não terminou até a saída existir e estar registrada.

### Fase A — Inventário
Levantar o que existe, sem interpretar ainda. Estrutura, apps, packages, deps,
entrypoints, banco, filas, webhooks, CI, Docker, cron, integrações, testes, docs.
- **Entrada:** projeto identificado, acesso a disco/banco/containers.
- **Saída obrigatória:** `docs/<projeto>/00-MAPA-GERAL.md`; inventário feito AO VIVO
  (não de memória); `git fetch` rodado se for repo (ADR-0006).

### Fase B — Análise
Como o sistema realmente funciona: fluxo usuário → frontend → API → services →
repos → banco → webhooks → integrações → workers → retorno. Mapear domínios.
- **Entrada:** mapa geral da Fase A.
- **Saída obrigatória:** `docs/<projeto>/02-MAPA-DOS-DOMINIOS.md`; cada afirmação de
  comportamento com `arquivo:linha` ou query.

### Fase C — Revisão crítica (da própria análise)
Criticar as conclusões da Fase B. **Gate anti-fraqueza #2** (docs longos viram
"verdade" cedo demais).
- **Entrada:** análise da Fase B.
- **Saída obrigatória:** cada conclusão reclassificada `✅ confirmado`/`🟡 provável`/
  `❓ não verificado`; lista explícita do que ficou sem evidência. Nenhum doc é fonte
  de verdade antes desta saída.

### Fase D — Prova experimental
**Gate anti-fraqueza #1** (conclusão antes do experimento — o erro da migration 0050).
- **Entrada:** hipótese causal + experimento definido.
- **Saída obrigatória:** hipótese **confirmada OU refutada**; evidência reproduzível
  (comando + output) no doc; se refinada, registrar a versão anterior e por que caiu;
  **decisão registrada em ADR quando a conclusão vira regra** (ex.: ADR-0007).

### Fase E — Correção mínima
- **Entrada:** conclusão provada da Fase D; contrato pré-implementação registrado
  (arquivos a mudar/criar, contratos a preservar, migrations, riscos, testes).
- **Saída obrigatória:** diff **< 10 arquivos, < 500 linhas, 1 fluxo, 1 commit lógico**,
  sem comportamento não-relacionado, sem importar billing/PBAC/enterprise só p/ tipo.

### Fase F — Evidência de funcionamento
- **Entrada:** correção da Fase E aplicada.
- **Saída obrigatória:** type-check + lint + testes da área rodados; **erros NOVOS
  separados do baseline** explicitamente; para deploy, cadeia código → imagem →
  container → proxy → rota pública → dependências verificada elo a elo. Se algo falha,
  fase NÃO terminou.

### Fase G — Atualização da documentação
- **Entrada:** funcionamento comprovado (Fase F).
- **Saída obrigatória:** mapas/matrizes/status atualizados no mesmo commit ou logo após;
  números regenerados por script (ex.: `scripts/parity_*.py`), não editados à mão;
  ADR criado se uma decisão nova foi tomada.

### Fase H — Planejamento da próxima sprint
- **Entrada:** fatia anterior fechada formalmente (doc de fechamento).
- **Saída obrigatória:** triagem verificável (matriz → priorização, não "achei→porto");
  próxima fatia definida e pequena. Não abrir fatia nova sem fechar a anterior.

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

## Trabalho paralelo (múltiplos agentes)

Dois atores nunca editam o mesmo working tree ao mesmo tempo (ADR-0012). Cada
agente/tarefa paralela usa `git worktree add ../<repo>-<tarefa> -b agent/<tarefa>`,
commita na sua branch, faz push; merge é ponto de sincronização explícito. Ao fim,
`git worktree remove` + `git worktree prune`. Se herdar working tree com trabalho
não-commitado de outro agente: NÃO commitar cego — revisar, validar (testes/tsc),
e reconciliar antes; a decisão de commitar/reverter é do dono.

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
