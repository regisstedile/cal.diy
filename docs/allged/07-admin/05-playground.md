# Admin — Playground

## O que é

Ferramenta interna para testar componentes UI isoladamente. Só acessível para usuários com role `ADMIN`.

**URL**: `/settings/admin/playground`

## Para que serve

- Testar componentes novos antes de integrar em produção
- Debugar comportamento de filtros de data
- Validar UI sem precisar de dados reais

## Acesso

```
/settings/admin/playground
```

Lista os playgrounds disponíveis. Cada card tem título e descrição.

## Playground: Date Range Filter

**URL**: `/settings/admin/playground/date-range-filter`

Testa o componente `DateRangePicker` com diferentes cenários:

| Cenário | Descrição |
|---------|-----------|
| Último 7 dias | Filtro padrão dos insights |
| Último 30 dias | Filtro médio prazo |
| Este mês | Mês corrente |
| Intervalo customizado | Datas livres |

O componente exibe os valores retornados pelo filtro: `startDate`, `endDate`, e os filtros ativos.

### Sincronização com URL

O filtro de data sincroniza com query params:
```
/playground/date-range-filter?activeFilters=...&startDate=...&endDate=...
```

## Arquivos

```
apps/web/app/(use-page-wrapper)/settings/(admin-layout)/admin/playground/
├── page.tsx                    # Lista de playgrounds
├── layout.tsx                  # Layout com "← Voltar ao Playground"
└── date-range-filter/
    └── page.tsx               # Playground do DateRangePicker
```

## Customizações ALLGED

As páginas do playground foram traduzidas para pt-BR (commit na branch `deploy`):

- `page.tsx`: título e descrição em pt-BR
- `date-range-filter/page.tsx`: cenários e labels em pt-BR  
- `layout.tsx`: link "← Voltar ao Playground"

**Nota**: As traduções só ficam visíveis após rebuild do container `cal-src`.

## Adicionar Novo Playground

1. Criar pasta em `admin/playground/novo-playground/`
2. Criar `page.tsx` com o componente a testar
3. Adicionar card em `admin/playground/page.tsx`
