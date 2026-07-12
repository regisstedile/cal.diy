# BookingListItem.tsx — linha de reserva mais rica

**Data:** 2026-07-12 · **Aprovado pelo dono** (design em conversa, "pode seguir").

## Problema

`/bookings/upcoming` mostra pouca informação por linha (só data/hora, título,
"..."). Pedido do dono: avatar do participante, ícone de local, badge de
time/tipo de evento por reserva — quer mais riqueza visual pra quem opera.

## Achado antes de desenhar

Confirmado que **não é gap de restauração** (diff normalizado contra o REF é
quase idêntico neste arquivo) — é pedido de feature nova, nem o REF faz isso.
Dos 3 itens pedidos:

- **Badge de time**: já existe e funciona (`booking.eventType?.team && <Badge>`).
  Não aparece nas reservas de teste porque são 1:1, sem time. Nada a fazer.
- **Avatar**: zero uso de `Avatar`/`AvatarGroup` no arquivo, apesar de
  `avatarUrl` já vir pronto na query (organizador e attendees enriquecidos).
- **Ícone de local**: `guessEventLocationType()` já resolve ícone+label pra
  todos os tipos (vídeo por integração, telefone, presencial, custom) — só é
  renderizado hoje quando o local é um link `http` clicável.

## Decisão

1. **Avatar em grupo** — usa `AvatarGroup` (`packages/ui/components/avatar`),
   mesmo idioma de `apps/web/modules/bookings/components/event-meta/Members.tsx`:
   `items = [organizador, ...attendees].map(u => ({ image: getUserAvatarUrl(u), title: u.name, alt: u.name }))`.
   `getUserAvatarUrl` já resolve fallback de placeholder e URL absoluta —
   não reinventar isso. `size="sm"`, trunca em 4 (`truncateAfter` padrão do
   componente).
2. **Ícone de local sempre visível** — generaliza o uso de
   `guessEventLocationType(location)` pra aparecer na linha de badges
   (junto de status/time), não só dentro do link de "entrar". 16px, com
   tooltip do label. Sem link clicável quando não é vídeo.
3. **Badge de time** — nenhuma mudança, já correto.

## Escopo

Único arquivo: `apps/web/components/booking/BookingListItem.tsx`. Zero
mudança de backend/query (dado já selecionado). Sem risco à query da tela
mais usada — só adiciona render, não toca em `get.handler.ts`.

## Testes

Visual (validado em navegador após rebuild — não dá pra testar via curl).
`tsc --noEmit` como guarda de tipo antes do build.

## Fora do escopo

Avatar do organizador com destaque diferente dos attendees; customização de
cor por tipo de local; qualquer mudança na query de listagem.
