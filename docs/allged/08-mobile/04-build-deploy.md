# Build e Deploy do App Mobile

## EAS Build

O build é feito via **Expo Application Services (EAS)**. Não precisa de Xcode ou Android Studio localmente.

## Pré-requisito: EXPO_TOKEN

```bash
# Nunca colar o token no chat — usar ! prefix no terminal
! EXPO_TOKEN=seu_token_aqui eas whoami

# Revogar tokens expostos em:
# https://expo.dev/accounts/registedile/settings/access-tokens
```

**ATENÇÃO**: Os tokens `2WdGK6sZVR6-*` e `wVf14ZH2BUE0-*` expostos em sessão anterior foram comprometidos — revogar imediatamente.

## Build Android (APK)

```bash
cd /home/regis/stack/companion/apps/mobile

# Build de preview (APK para instalar diretamente)
! EXPO_TOKEN=xxx eas build --platform android --profile preview

# Build de produção (AAB para Play Store)
! EXPO_TOKEN=xxx eas build --platform android --profile production
```

## Profiles (eas.json)

```json
{
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  }
}
```

## Variáveis de Ambiente no EAS

**Problema**: `process.env.EXPO_PUBLIC_*` pode não ser confiável no EAS build.

**Solução**: usar `app.json` extra + `Constants` do Expo:

```json
// app.json
{
  "expo": {
    "extra": {
      "calUrl": "https://cal.allged.com.br",
      "calClientId": "cal_..."
    }
  }
}
```

```typescript
// uso no código
import Constants from "expo-constants";
const CAL_URL = Constants.expoConfig?.extra?.calUrl;
```

## Build Atual

| Build ID | Plataforma | Status | Branding |
|---------|-----------|--------|---------|
| `7ae3f01a` | Android APK | Disponível | (anterior) |

Próximo build: "Agendamento" branding + fix de scope (já no backend).

## Instalar APK

```bash
# Download do EAS e instalar via ADB
adb install app-build.apk

# Ou compartilhar link do EAS para instalar OTA
```

## Atualização OTA (Over-the-Air)

Para mudanças de JS (sem mudança nativa):
```bash
! EXPO_TOKEN=xxx eas update --branch preview --message "fix: descricao"
```

Usuários recebem a atualização automaticamente na próxima abertura do app.

**Não funciona para**: mudanças em `app.json`, assets nativos, permissões novas.
