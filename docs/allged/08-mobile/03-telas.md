# App Mobile — Telas

## Estrutura de Navegação

```
(tabs)/
├── (home)/          # Tab inicial
├── (bookings)/      # Tab de agendamentos
│   ├── index.tsx           # Android: lista/calendário toggle
│   └── index.ios.tsx       # iOS: sem toggle (pendência)
├── (profile)/       # Tab de perfil
└── (settings)/      # Tab de configurações
```

## Tab: Home

Tela inicial pós-login. Exibe resumo rápido do dia.

**Arquivo**: `app/(tabs)/(home)/index.tsx`

## Tab: Bookings

### Android (`index.tsx`)

Exibe bookings com toggle entre modo lista e modo calendário (WeekCalendarView).

Filtros disponíveis via `useActiveBookingFilter`:
- **Upcoming**: agendamentos futuros
- **Past**: agendamentos passados  
- **Cancelled**: cancelados

Hook `useBookings` busca bookings filtrados via API OAuth.

### iOS (`index.ios.tsx`) — Pendência

Falta implementar o toggle lista/calendário. Atualmente só exibe lista sem filtro visual. **Tarefas pendentes**:
- Adicionar Header com toggle
- Integrar WeekCalendarView
- Implementar useActiveBookingFilter

## Tab: Profile

Exibe dados do usuário logado (nome, email, avatar via emailMd5).

## Tela: Login (`LoginScreen`)

**Arquivo**: `app/(auth)/login.tsx` ou similar

Fluxo:
1. Usuário informa URL da instância cal.allged.com.br
2. Abre WebView com tela de login do cal
3. Após login, captura tokens OAuth via redirect
4. Salva tokens no SecureStore

## Componentes Principais

| Componente | Arquivo | Descrição |
|-----------|---------|-----------|
| `WeekCalendarView` | `components/WeekCalendarView.tsx` | Vista semanal de bookings |
| `Header` | `components/Header.tsx` | Cabeçalho com avatar e ações |
| `BookingCard` | `components/BookingCard.tsx` | Card de agendamento individual |

## Estado de Bookings

```typescript
// useBookings hook
const { bookings, isLoading, refetch } = useBookings({
  filter: activeFilter,  // 'upcoming' | 'past' | 'cancelled'
  limit: 20,
});
```

Dados buscados de: `GET /api/v2/bookings?status=upcoming&limit=20`

## Widget (iOS/Android)

`useWidgetSync` sincroniza bookings com widget da tela inicial do dispositivo. Salva dados no storage compartilhado entre app e widget.
