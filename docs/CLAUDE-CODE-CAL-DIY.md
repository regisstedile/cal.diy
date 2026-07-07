# Claude Code no Cal-diy — Guia Completo

> Síntese dos cursos PurpleSchool (75 aulas), Profileschool (7 sessões) e Designcode/LinkedIn aplicados ao workflow real do cal-diy.
> Atualizado: junho 2026

---

## O Que É Claude Code

Claude Code é um **agente autônomo de desenvolvimento** que vai além de autocompletar código. Ele:

- Lê e navega por qualquer arquivo do projeto
- Escreve, edita e deleta arquivos
- Executa comandos no terminal (yarn, git, docker, etc.)
- Gerencia Git — commits, branches, PRs
- Conecta a ferramentas externas via MCP (banco de dados, APIs, browsers)
- Mantém contexto persistente entre sessões via AGENTS.md/CLAUDE.md

**Comparação direta:**

| GitHub Copilot / Cursor | Claude Code |
|---|---|
| Autocomplete dentro do IDE | Executa tarefas completas |
| Uma linha por vez | Navega 10+ arquivos, escreve código, testa, commita |
| Precisa de múltiplos prompts | Entende a tarefa completa de uma vez |
| Contexto da janela atual | 1 milhão de tokens + AGENTS.md persistente |

---

## O Que Temos Configurado Hoje

### AGENTS.md — Memória Permanente do Projeto
```
/home/regis/stack/cal-diy/AGENTS.md
```
Lido em cada sessão. Define a arquitetura, regras, comandos. O Claude nunca "esquece" o que é o projeto.

**O que tem:**
- Stack tecnológico (Yarn monorepo, Next.js, Prisma, tRPC)
- Regras de código (select vs include, ErrorWithCode vs TRPCError)
- Onde cada tipo de arquivo vai
- Guia de PR (tamanho máximo, convencional commits)

### agents/rules/ — Regras Modulares por Tópico
```
/home/regis/stack/cal-diy/agents/rules/
```
30+ arquivos, cada um cobrindo uma decisão arquitetural. O Claude carrega conforme relevante.

**Regras existentes:**
- `architecture-vertical-slices.md` — organizar por domínio
- `data-repository-pattern.md` — repository com interface
- `patterns-dependency-injection.md` — DI com ioctopus
- `quality-code-review.md` — foco em funcionalidade
- `ci-type-check-first.md` — types antes de testes

### agents/skills/ — Skills Disponíveis
```
/home/regis/stack/cal-diy/agents/skills/
  calcom-api/           # como usar a API do cal.com
  vercel-react-best-practices/  # boas práticas React/Vercel
  web-design-guidelines/        # padrões visuais
```

### MCP Servers Conectados
```
supabase      → banco de dados Supabase (projetos externos)
n8n-local     → automações n8n local (localhost:5678)
n8n-astoria   → n8n Astoria
cal-diy       → API do próprio cal-diy (:5555/api/v2)
chatwoot      → Chatwoot CRM
baserow       → Baserow (banco alternativo)
brightdata    → scraping web
```

### Hooks Ativos
```
SessionStart    → caveman mode (estilo de resposta)
UserPromptSubmit → caveman tracker
statusLine      → caveman statusline
```

### Plugins Ativos (30+)
```
superpowers, feature-dev, code-review, pr-review-toolkit,
frontend-design, security-guidance, agent-sdk-dev,
context7, playwright, supabase, slack, figma, vercel...
```

---

## O Que os Cursos Ensinam + O Que Falta

### 1. Hooks de Segurança e Qualidade (PurpleSchool Módulo 9)

O PurpleSchool descreve um padrão que **não temos configurado:**

**PreToolUse — bloquear comandos perigosos:**
```json
// ~/.claude/settings.json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "node /home/regis/.claude/hooks/safety-check.js"
      }]
    }]
  }
}
```

```javascript
// safety-check.js — exit code 2 = bloqueia a ação
const input = JSON.parse(process.stdin.read());
const cmd = input.tool_input?.command || '';

const BLOCKED = ['rm -rf /', 'git push --force', 'DROP TABLE', 'git reset --hard HEAD~'];
const isBlocked = BLOCKED.some(b => cmd.includes(b));

if (isBlocked) {
  console.error(`BLOQUEADO: Comando perigoso detectado: ${cmd}`);
  process.exit(2); // exit 2 = bloquear E mostrar mensagem
}
process.exit(0);
```

**PostToolUse — type-check após edição de arquivo TypeScript:**
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "bash /home/regis/.claude/hooks/ts-check.sh"
      }]
    }]
  }
}
```

```bash
#!/bin/bash
# ts-check.sh — roda type-check se arquivo .tsx/.ts foi editado
FILE=$(echo $CLAUDE_TOOL_INPUT | python3 -c "import sys,json; print(json.load(sys.stdin)['file_path'])")
if [[ "$FILE" == *.ts || "$FILE" == *.tsx ]]; then
  cd /home/regis/stack/cal-diy
  yarn type-check:ci --force 2>&1 | tail -20
fi
```

**Benefício direto:** o build iterativo atual (6 min por ciclo) seria detectado imediatamente após cada edição, não após o Docker build.

---

### 2. CLAUDE.md na Raiz (não só AGENTS.md)

Hoje o projeto usa `AGENTS.md`. O Claude Code lê `CLAUDE.md` com prioridade. Criar também:

```bash
# /home/regis/stack/cal-diy/CLAUDE.md
```

```markdown
# Cal-diy — Claude Code Configuration

## Projeto
Fork do cal.com. Monorepo Yarn + Turbo.
Apps: web (:3005), api-v2 (:5555)

## Arquitetura
Ver docs/ARQUITETURA-FSD.md para mapa completo.
ADRs em docs/adr/ para decisões arquiteturais.

## Comandos Rápidos
- Build: `cd /home/regis/stack && docker compose build cal-src`
- Type check: `yarn type-check:ci --force`
- Testes: `TZ=UTC yarn test`
- E2E: `PLAYWRIGHT_HEADLESS=1 yarn e2e`

## Regras Críticas
1. select > include em todas as queries Prisma
2. Hooks em apps/web/modules, nunca em packages/features  
3. ErrorWithCode em services, TRPCError só em handlers
4. Testes passando local antes de qualquer push
```

---

### 3. Skills para Workflows do Cal-diy

O Módulo 8 do PurpleSchool ensina skills com argumentos dinâmicos. Exemplos para criar:

**`/build-check` — verificar build sem Docker completo:**
```markdown
<!-- agents/skills/build-check/SKILL.md -->
Roda type-check local no cal-diy e reporta erros:
1. `cd /home/regis/stack/cal-diy`
2. `yarn type-check:ci --force 2>&1 | grep "error TS" | head -20`
3. Para cada erro: mostra arquivo, linha, e propõe a correção
```

**`/feature-nova [nome-dominio]` — scaffold de feature completa:**
```markdown
Cria estrutura completa para novo domínio no cal-diy:
- packages/features/$ARGUMENTS/repositories/I{Domain}Repository.ts
- packages/features/$ARGUMENTS/repositories/Prisma{Domain}Repository.ts
- packages/features/$ARGUMENTS/services/{Domain}Service.ts
- packages/features/$ARGUMENTS/di/tokens.ts
- packages/features/$ARGUMENTS/di/{Domain}Service.module.ts
- packages/features/$ARGUMENTS/di/{Domain}Service.container.ts
Seguir padrão de packages/features/bookings/ como referência.
```

**`/org-stub [procedimento]` — implementar stub em organizations router:**
```markdown
Implementar procedimento real substituindo stub em:
packages/trpc/server/routers/viewer/organizations/_router.tsx
Criar handler em packages/trpc/server/routers/viewer/organizations/[procedimento].handler.ts
```

---

### 4. CLAUDE.md Nested por Pacote (Profileschool)

O Profileschool demonstra `CLAUDE.md` por subdiretório com regras específicas:

```
packages/trpc/CLAUDE.md          → "handlers são thin, delegar para service"
packages/features/CLAUDE.md      → "sem imports de @calcom/trpc aqui"
apps/web/CLAUDE.md               → "hooks tRPC só em modules/"
```

---

### 5. MCP para Cal-diy (já configurado, pode expandir)

O MCP `cal-diy` já está configurado em `CAL_API_BASE_URL=:5555/api/v2`.

**O que já dá pra fazer:**
```
"liste todos os event types via MCP"
"crie um booking de teste via API"
"mostre os webhooks configurados"
```

**Expansão possível — MCP PostgreSQL direto:**
O PurpleSchool ensina a adicionar DBHub no `docker-compose.yml`:
```yaml
# docker-compose.yml
services:
  dbhub:
    image: bytebase/dbhub
    environment:
      DSN: "postgresql://postgres:@db:5432/calendso"
    ports:
      - "8080:8080"
```

Com isso: `"quantos bookings foram criados ontem?"` sem escrever SQL.

---

## Fluxo de Trabalho Atual vs. Otimizado

### Atual (sem hooks de qualidade)
```
1. Claude edita arquivo TypeScript
2. Claude termina a sessão
3. Você roda docker compose build (6 min)
4. Erro de TypeScript aparece
5. Claude corrige
6. Repete do step 3
```

### Otimizado (com PostToolUse type-check)
```
1. Claude edita arquivo TypeScript
2. Hook PostToolUse roda type-check automaticamente (10s)
3. Claude vê o erro imediatamente no mesmo turno
4. Claude corrige antes de continuar
5. Docker build passa de primeira
```

**Impacto prático:** o trabalho de múltiplos dias fixando build erros iterativamente seria resolvido em uma sessão.

---

## Mapa de Capacidades — O Que Claude Code Pode Fazer no Cal-diy

### Já Faz Hoje
- ✅ Implementar features completas (backend + frontend)
- ✅ Corrigir erros de TypeScript
- ✅ Criar migrations Prisma
- ✅ Escrever testes unitários e E2E
- ✅ Code review de PRs
- ✅ Criar documentação (como estes docs)
- ✅ Consultar APIs via MCP (cal-diy, n8n, chatwoot)

### Pode Fazer com Configuração Extra
- 🔧 Detectar erros TS imediatamente após cada edição (hook PostToolUse)
- 🔧 Bloquear comandos destrutivos automaticamente (hook PreToolUse)
- 🔧 Scaffold automático de features completas (skill `/feature-nova`)
- 🔧 Query direta ao banco PostgreSQL via MCP DBHub
- 🔧 Browser automation para testes visuais (Playwright MCP)
- 🔧 Notificar no Slack quando tarefa longa termina (hook SessionEnd)

### Casos de Uso Avançados (Profileschool)
- 🚀 Implementar fluxo completo de blocklist/watchlist (stubs → real)
- 🚀 Migrar stubs do organizations router para handlers reais
- 🚀 Criar suite de testes de integração para services
- 🚀 Gerar documentação de API automática a partir dos routers tRPC
- 🚀 Análise de performance de queries Prisma

---

## Arquitetura de Plugins Ativos

```
Plugins de Qualidade:
  code-review          → review automático de PRs
  pr-review-toolkit    → análise de testes, tipos, falhas silenciosas
  security-guidance    → detecção de vulnerabilidades
  code-simplifier      → simplificação pós-implementação

Plugins de Desenvolvimento:
  feature-dev          → explorer, architect, reviewer (subagents)
  agent-sdk-dev        → verificação de apps SDK
  superpowers          → skills avançadas e workflows
  typescript-lsp       → navegação de tipos TypeScript

Plugins de Integração:
  playwright           → browser automation
  supabase             → database operations
  figma                → design specs
  vercel               → deployment
  slack                → notificações

Plugins de Contexto:
  context7             → documentação atualizada de libs
  frontend-design      → guidelines de UI
```

---

## Ordem de Estudo Recomendada

### Semana 1 — Fundamentos (PurpleSchool Módulos 1-5)
Foco: entender como Claude Code pensa e como dar contexto eficiente.
- O que é contexto e por que AGENTS.md importa
- Como estruturar prompts para tarefas complexas do cal-diy
- Gestão de contexto em sessões longas (/compact, /clear)

### Semana 2 — Automações (PurpleSchool Módulos 8-9)
Foco: hooks + skills que eliminam trabalho repetitivo.
- Criar hook PostToolUse para type-check automático
- Criar hook PreToolUse para segurança
- Criar skills para workflows do cal-diy

### Semana 3 — MCP e Integrações (PurpleSchool Módulo 10)
Foco: conectar Claude Code às ferramentas do stack.
- Configurar MCP PostgreSQL para o banco do cal-diy
- Usar MCP n8n para criar automações por voz
- Playwright MCP para testar UI do cal-diy visualmente

### Semana 4 — Avançado (Profileschool)
Foco: subagents, paralelização, casos complexos.
- Tarefas paralelas com múltiplos subagents
- CLAUDE.md nested por pacote
- Debugging ao vivo de comportamentos inesperados do agente

---

## Resumo para NotebookLM

Este documento junto com:
- `docs/ARQUITETURA-FSD.md` — mapa da arquitetura
- `docs/adr/0001-*.md` a `0005-*.md` — decisões arquiteturais
- `AGENTS.md` — configuração atual

Forma um conjunto completo para entender:
1. **O que é o cal-diy** (arquitetura, domínios, padrões)
2. **Como o Claude Code é usado** (configuração atual)
3. **O que pode ser melhorado** (hooks, skills, MCPs)
4. **A visão de futuro** (features pendentes, otimizações)

---

*Baseado nos cursos: PurpleSchool Основы Claude Code (2026), Profileschool Глубокое погружение (2026), Designcode/LinkedIn Claude AI (2025)*
