# BACKLOG P0 — bloqueadores de segurança

Itens P0 ficam aqui até resolvidos. P0 = risco de segurança ativo ou perda de
dados. Nenhum P0 é "fechado por narrativa" — exige as 3 provas (rotacionado,
consumidores atualizados, chave antiga revogada/inválida).

## P0-001 — `MCP_API_KEY` do mcp-allged exposta (ABERTO)

- **O quê:** a `MCP_API_KEY` de `/home/regis/docker-extra/mcp-allged/.env` vazou em
  transcrição de chat e em ~7 exports de conversa (`/home/regis/session-exports/`).
- **Agravante:** `/home/regis` é montado read-only no container `mcp-allged`, e o
  `read_file` do MCP bloqueia por NOME (`.env`) mas NÃO os `.txt` de export — ou seja
  o próprio Manus consegue ler a chave via a ferramenta. Ver `feedback_export_leak_pattern`.
- **Estado verificado 2026-07-11:** **NÃO rotacionada** — `.env` mtime 2026-07-10 05:25
  (criação original), container up 26h sem restart. A chave viva é a mesma que vazou.
- **Blast radius:** quem tiver a chave fala com o MCP (docker.sock+restart+compose de
  todo o host 129, n8n, leitura de arquivos). Alto.

### Procedimento de resolução (decisão do dono — afeta o conector Manus)

```bash
cd /home/regis/docker-extra/mcp-allged
NEW=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
sed -i "s|^MCP_API_KEY=.*|MCP_API_KEY=$NEW|" .env
docker compose up -d --build            # recria só este container
grep MCP_API_KEY .env                    # ler local, atualizar header no Manus
```

### Critério de fechamento (as 3 provas)

- [ ] chave rotacionada (`.env` mtime novo + container recriado)
- [ ] conector Manus atualizado com a nova chave (testar 1 tool via URL pública)
- [ ] chave antiga inválida (request com a chave velha → 401)

Enquanto os 3 não forem ✅, este item permanece ABERTO.

## Relacionados (não-P0, mesma família)

- `N8N_API_KEY` reaproveitada no mesmo `.env` — rotação com blast radius maior
  (compartilhada com `mcpServers.n8n-local`); confirmar com o dono antes.
- PAT GitHub / token ClickUp a revogar (manual) — ver `project_cal_diy`.
