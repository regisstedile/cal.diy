#!/usr/bin/env bash
# Cria notebook "Cal-diy Architecture" no NotebookLM e sobe os 8 docs de arquitetura.
# Pré-requisito: notebooklm login (roda uma vez no browser)

set -euo pipefail

CAL_DIY="/home/regis/stack/cal-diy"
NOTEBOOK_TITLE="Cal-diy Architecture & Claude Code"

echo "==> Criando notebook: $NOTEBOOK_TITLE"
NOTEBOOK_ID=$(notebooklm create "$NOTEBOOK_TITLE" --json | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo "    ID: $NOTEBOOK_ID"

# Define the sources in order (file path : display title)
declare -A SOURCES=(
  ["$CAL_DIY/docs/ARQUITETURA-FSD.md"]="01 - Arquitetura FSD/VSA"
  ["$CAL_DIY/docs/CLAUDE-CODE-CAL-DIY.md"]="02 - Claude Code no Cal-diy"
  ["$CAL_DIY/docs/adr/0001-vertical-slice-architecture.md"]="ADR-0001 - Vertical Slice Architecture"
  ["$CAL_DIY/docs/adr/0002-trpc-como-boundary.md"]="ADR-0002 - tRPC como Boundary"
  ["$CAL_DIY/docs/adr/0003-di-container-ioctopus.md"]="ADR-0003 - DI Container ioctopus"
  ["$CAL_DIY/docs/adr/0004-repository-pattern.md"]="ADR-0004 - Repository Pattern"
  ["$CAL_DIY/docs/adr/0005-separacao-features-modules.md"]="ADR-0005 - Separação Features/Modules"
  ["$CAL_DIY/AGENTS.md"]="08 - AGENTS.md (Configuração Atual)"
)

# Upload in order using an ordered list
ORDERED_FILES=(
  "$CAL_DIY/docs/ARQUITETURA-FSD.md"
  "$CAL_DIY/docs/CLAUDE-CODE-CAL-DIY.md"
  "$CAL_DIY/docs/adr/0001-vertical-slice-architecture.md"
  "$CAL_DIY/docs/adr/0002-trpc-como-boundary.md"
  "$CAL_DIY/docs/adr/0003-di-container-ioctopus.md"
  "$CAL_DIY/docs/adr/0004-repository-pattern.md"
  "$CAL_DIY/docs/adr/0005-separacao-features-modules.md"
  "$CAL_DIY/AGENTS.md"
)

ORDERED_TITLES=(
  "01 - Arquitetura FSD/VSA"
  "02 - Claude Code no Cal-diy"
  "ADR-0001 - Vertical Slice Architecture"
  "ADR-0002 - tRPC como Boundary"
  "ADR-0003 - DI Container ioctopus"
  "ADR-0004 - Repository Pattern"
  "ADR-0005 - Separação Features/Modules"
  "08 - AGENTS.md (Configuração Atual)"
)

for i in "${!ORDERED_FILES[@]}"; do
  FILE="${ORDERED_FILES[$i]}"
  TITLE="${ORDERED_TITLES[$i]}"
  echo "==> Adicionando: $TITLE"
  notebooklm source add "$FILE" \
    --notebook "$NOTEBOOK_ID" \
    --title "$TITLE" \
    --type file
  echo "    OK"
done

echo ""
echo "==> Pronto! Notebook criado com $(( ${#ORDERED_FILES[@]} )) fontes."
echo "    Abra: https://notebooklm.google.com"
echo "    Notebook ID: $NOTEBOOK_ID"
