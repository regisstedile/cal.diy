# App Mobile — Notificações Push

## Stack

Expo Notifications + serviço de push (FCM para Android, APNs para iOS).

## Configuração

```json
// app.json
{
  "expo": {
    "plugins": [
      ["expo-notifications", {
        "icon": "./assets/notification-icon.png",
        "color": "#ffffff"
      }]
    ]
  }
}
```

## Permissões

```typescript
import * as Notifications from "expo-notifications";

async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}
```

## Push Token

Cada dispositivo tem um token único. Precisa ser enviado ao backend para que o servidor saiba onde entregar a notificação.

```typescript
const token = await Notifications.getExpoPushTokenAsync({
  projectId: Constants.expoConfig?.extra?.eas?.projectId,
});

// Enviar token ao backend
await api.post("/api/v1/push-token", { token: token.data });
```

## Tipos de Notificação (Cal.com)

| Tipo | Quando Dispara |
|------|---------------|
| `booking.created` | Novo agendamento confirmado |
| `booking.rescheduled` | Agendamento reagendado |
| `booking.cancelled` | Agendamento cancelado |
| `booking.reminder` | Lembrete X minutos antes |

## Integração com Backend

O cal.diy dispara notificações via webhooks. Para integrar com o app mobile:

1. Backend dispara webhook para n8n
2. n8n processa e chama Expo Push API
3. Expo entrega para FCM/APNs
4. Dispositivo recebe notificação

### Expo Push API

```
POST https://exp.host/--/api/v2/push/send
{
  "to": "ExponentPushToken[xxx]",
  "title": "Novo agendamento",
  "body": "Weliton confirmou para amanhã às 14h",
  "data": { "bookingId": 123 }
}
```

## Estado Atual (ALLGED)

Notificações push **não estão implementadas** no app companion da ALLGED. O app exibe bookings via polling (pull), não push.

Para implementar:
1. Adicionar endpoint no backend para salvar push tokens por usuário
2. Configurar webhook no cal.allged.com.br apontando para n8n
3. Criar workflow n8n que chama Expo Push API
4. No app: registrar token ao logar, tratar notificações recebidas

## Notificações Locais (Lembretes)

Alternativa sem backend — o app agenda notificações locais:

```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Agendamento em 15 minutos",
    body: "Manutenção elétrica - João Silva",
  },
  trigger: {
    date: new Date(bookingStart.getTime() - 15 * 60 * 1000),
  },
});
```

Vantagem: funciona offline. Desvantagem: só para o usuário que tem o app aberto.
