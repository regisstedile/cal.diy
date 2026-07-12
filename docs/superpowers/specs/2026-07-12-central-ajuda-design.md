# Central de Ajuda `/ajuda` — design aprovado

**Data:** 2026-07-12 · **Aprovado pelo dono** (design apresentado em conversa, "pode seguir").

## Problema

cal.allged.com.br não tem onboarding para quem opera. Os docs do repo
(`docs/allged/`, 52 arquivos) são técnicos (arquitetura, banco, API) — inúteis
para atendente, gestor de equipe, admin ou cliente final.

## Decisões (com trade-offs julgados)

1. **Dentro do app** (rota `/ajuda`), não site separado — escolha do dono.
2. **Conteúdo novo em `docs/ajuda/`** — guias de tarefa em PT, passo-a-passo com
   caminho de menu exato (labels do pt-BR real: "Disponibilidade", "Reservas",
   "Tipos de Eventos", "Times", "Configurações"). Docs técnicos não são
   reaproveitados.
3. **Leitura em runtime** (`force-dynamic` + `fs.readFile`) com
   `HELP_DOCS_DIR` (env) e volume ro no compose — editar MD no host atualiza no
   F5, sem rebuild de 30min. Rebuild só para mudança de código da tela.
4. **Pública** — sem check de auth (auth é page-level no fork; o layout
   `(use-page-wrapper)` não impõe sessão). Cliente final acessa
   `/ajuda/cliente/...` por link compartilhado.
5. **Zero dependências novas** — `markdown-it` já é dep do apps/web; frontmatter
   (title/ordem) parseado manualmente.

## Componentes

| Unidade | Responsabilidade |
|---|---|
| `docs/ajuda/{agenda,equipe,admin,cliente}/*.md` | Conteúdo; frontmatter `title` + `ordem` |
| `apps/web/lib/ajuda/helpDocs.ts` | Loader: lista categorias/guias, parseia frontmatter, ordena, renderiza MD→HTML (markdown-it, html:false) |
| `app/(use-page-wrapper)/ajuda/page.tsx` | Index: cards por categoria com lista de guias |
| `app/(use-page-wrapper)/ajuda/[categoria]/[slug]/page.tsx` | Guia individual |
| `SideBar.tsx` | Link "Ajuda" no rodapé do sidebar |
| `stack/docker-compose.yml` | Volume `docs/ajuda → /calcom/docs/ajuda:ro` + env `HELP_DOCS_DIR` |

Categorias hardcoded no loader (título/descrição/ícone) — YAGNI para
categorias dinâmicas.

## Segurança

- markdown-it com `html: false` (default): HTML cru no MD é escapado.
- Slug/categoria validados contra a lista real de arquivos lidos do diretório
  (nunca interpolados em path) — sem path traversal.
- Conteúdo é do repo (controlado), volume é read-only.

## Erros

- Diretório ausente/env errada → index mostra estado vazio amigável, sem crash.
- Slug inexistente → `notFound()` (404 padrão do app).

## Testes

- Unit no loader (fixture dir): parse de frontmatter, ordenação por `ordem`,
  ignora não-`.md`, slug sanity.
- `tsc --noEmit` apps/web; `next build` via Docker antes do deploy (lição:
  tsc não pega fronteira client/server).

## Fora da v1

Busca, i18n, seções por role logado, editor, link na booking page pública.
