# Videoconferência

## Como Funciona

O host conecta um app de videoconferência. Ao criar um booking com localização "Google Meet" (por exemplo), o sistema automaticamente:
1. Cria a reunião via API
2. Salva o link em `BookingReference`
3. Inclui o link nos emails

## Apps Suportados

| App | type | Requisito |
|-----|------|-----------|
| Cal Video (Daily.co) | `daily_video` | Configurar DAILY_API_KEY |
| Google Meet | `google_meet` | Google Calendar conectado |
| Zoom | `zoom_video` | OAuth Zoom configurado |
| Microsoft Teams | `office365_video` | Office 365 conectado |
| Webex | `webex_video` | OAuth Webex |
| Jitsi | `jitsi_video` | Sem configuração (auto) |

## Configurar Zoom

1. Settings → Minha Conta → Conferência → Conectar Zoom
2. Requer: Zoom Client ID e Secret em `/settings/admin/apps/calendar` (na aba conferencing)
3. Redirect URI: `https://cal.allged.com.br/api/integrations/zoom/callback`

## Configurar Google Meet

Não requer config extra — usa o mesmo token OAuth do Google Calendar. Se o Google Calendar está conectado, Google Meet fica disponível automaticamente.

## Localização no EventType

```json
// locations no EventType
[
  { "type": "integrations:google:meet" },
  { "type": "integrations:zoom" },
  { "type": "integrations:daily" },
  { "type": "inPerson", "address": "Rua X" }
]
```

O cliente escolhe qual prefere no formulário de booking (se múltiplos configurados).

## BookingReference

Após criação do booking:
```
BookingReference {
  type: "google_meet",
  uid: "xxx-yyy-zzz",  // Meeting ID
  meetingUrl: "https://meet.google.com/xxx-yyy-zzz",
  meetingPassword: null
}
```

O link fica disponível no email e na página de confirmação.
