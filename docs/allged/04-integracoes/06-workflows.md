# Workflows

## O que são

Workflows são automações de comunicação que disparam mensagens (email, SMS, WhatsApp ou ligação via IA) em resposta a eventos de booking. Cada workflow define **quando** agir (trigger) e **o que** fazer (steps).

## Estrutura

```
Workflow
├── Nome
├── Trigger (quando disparar)
├── Tempo + Unidade (para triggers com offset)
├── Escopo: pessoal (userId) ou equipe (teamId)
└── Steps []
    ├── Número do step (ordenação)
    ├── Action (canal + destinatário)
    ├── Template (modelo de mensagem)
    └── Corpo / Assunto / Remetente
```

## Triggers

### Com offset (agendados)

| Trigger | Quando |
|---------|--------|
| `BEFORE_EVENT` | X minutos/horas/dias **antes** do evento |
| `AFTER_EVENT` | X minutos/horas/dias **após** o evento terminar |

Esses triggers criam um `WorkflowReminder` agendado no banco. O Tasker (Trigger.dev) processa no horário certo.

### Imediatos

| Trigger | Quando |
|---------|--------|
| `NEW_EVENT` | Booking criado |
| `EVENT_CANCELLED` | Booking cancelado |
| `RESCHEDULE_EVENT` | Booking reagendado |
| `BOOKING_REQUESTED` | Booking pendente de aprovação |
| `BOOKING_REJECTED` | Booking rejeitado |
| `BOOKING_PAID` | Pagamento confirmado |
| `BOOKING_PAYMENT_INITIATED` | Pagamento iniciado |
| `BOOKING_NO_SHOW_UPDATED` | No-show marcado |
| `AFTER_HOSTS_CAL_VIDEO_NO_SHOW` | Host não apareceu no Cal Video |
| `AFTER_GUESTS_CAL_VIDEO_NO_SHOW` | Convidado não apareceu |

### Routing Forms

| Trigger | Quando |
|---------|--------|
| `FORM_SUBMITTED` | Formulário de routing submetido (com booking) |
| `FORM_SUBMITTED_NO_EVENT` | Formulário submetido (sem booking gerado) |

## Actions (canais)

| Action | Canal | Destinatário |
|--------|-------|-------------|
| `EMAIL_HOST` | Email | Organizador do evento |
| `EMAIL_ATTENDEE` | Email | Participante |
| `EMAIL_ADDRESS` | Email | Endereço fixo configurado |
| `SMS_ATTENDEE` | SMS | Celular do participante |
| `SMS_NUMBER` | SMS | Número fixo configurado |
| `WHATSAPP_ATTENDEE` | WhatsApp | Celular do participante |
| `WHATSAPP_NUMBER` | WhatsApp | Número fixo configurado |
| `CAL_AI_PHONE_CALL` | Ligação IA | Participante (feature Enterprise) |

## Templates

| Template | Uso |
|----------|-----|
| `CUSTOM` | Mensagem totalmente livre |
| `REMINDER` | Lembrete padrão (pré-configurado) |
| `RATING` | Pedido de avaliação pós-evento |
| `CANCELLED` | Notificação de cancelamento |
| `COMPLETED` | Confirmação de conclusão |
| `RESCHEDULED` | Notificação de reagendamento |

**WhatsApp** aceita apenas: `REMINDER`, `COMPLETED`, `CANCELLED`, `RESCHEDULED`.

## Variáveis dinâmicas

Disponíveis no corpo e assunto de qualquer mensagem:

| Variável | Valor |
|----------|-------|
| `{event_name}` | Nome do tipo de evento |
| `{event_date}` | Data do evento |
| `{event_time}` | Hora do evento |
| `{event_end_time}` | Hora de término |
| `{timezone}` | Fuso do organizador |
| `{attendee_timezone}` | Fuso do participante |
| `{location}` | Local / link da reunião |
| `{meeting_url}` | URL da reunião (Cal Video etc.) |
| `{organizer_name}` | Nome do organizador |
| `{attendee_name}` | Nome completo do participante |
| `{attendee_first_name}` | Primeiro nome |
| `{attendee_last_name}` | Sobrenome |
| `{attendee_email}` | Email do participante |
| `{additional_notes}` | Notas adicionais do booking |
| `{cancel_url}` | Link para cancelar |
| `{cancel_reason}` | Motivo do cancelamento |
| `{reschedule_url}` | Link para reagendar |
| `{reschedule_reason}` | Motivo do reagendamento |
| `{rating_url}` | Link de avaliação |
| `{no_show_url}` | Link para marcar no-show |

Data/hora aceitam formato customizado: `{event_date_ddd, MMM D, YYYY}`, `{event_time_h:mma}`.

## Escopo e ativação

- **Pessoal**: workflow pertence a um usuário (`userId`), aplicável nos event types desse usuário
- **Equipe**: workflow pertence a um time (`teamId`), requer permissão `workflow.create` (role admin/owner como fallback)
- **Ativação**: workflow pode ser ativado em event types específicos (`WorkflowsOnEventTypes`) ou em todos (`isActiveOnAll = true`)

## Fluxo de execução

```
Evento ocorre (booking criado, cancelado, etc.)
    ↓
scheduleWorkflowNotifications()
    ├── Trigger imediato → executa step agora via Tasker
    └── Trigger com offset → cria WorkflowReminder agendado
                                ↓
                         Tasker (Trigger.dev) processa
                                ↓
                    Email (SendGrid/SMTP) | SMS (Twilio) | WhatsApp
```

## Permissões (PBAC)

| Permissão | Ação |
|-----------|------|
| `workflow.read` | Ver workflow |
| `workflow.create` | Criar workflow |
| `workflow.update` | Editar workflow |
| `workflow.delete` | Deletar workflow |

Roles `ADMIN` e `OWNER` do time têm acesso como fallback.

## Criação via UI

1. Acesse `/workflows`
2. Clique em **"Criar do zero"** ou escolha um template
3. Configure nome, trigger, offset (se aplicável)
4. Adicione steps (canal + destinatário + mensagem)
5. Ative em um ou mais event types
6. Salve

## API v2

Endpoints disponíveis para organizações/times:

```
POST   /v2/organizations/{orgId}/teams/{teamId}/workflows
GET    /v2/organizations/{orgId}/teams/{teamId}/workflows
GET    /v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}
PATCH  /v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}
DELETE /v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}
```

Permissão mínima: role `team admin` ou scope OAuth `TEAM_WORKFLOW_WRITE`.

## Cal.AI Phone Call (Enterprise)

Feature EE que substitui mensagem por ligação automática de voz via Retell AI. Configurada no step com `action: CAL_AI_PHONE_CALL`. Gerenciada pelo router `aiVoiceAgent` (get, create, update, listVoices, testCall, createWebCall).

Requer:
- Licença Enterprise
- Número de telefone verificado configurado no time
- Agente de voz configurado via `/settings/organizations/[org]/voice-agent`
