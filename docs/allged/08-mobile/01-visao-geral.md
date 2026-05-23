# App Mobile — Visão Geral

## Stack

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Expo SDK | 52 | Framework |
| React Native | 0.76 | UI |
| Expo Router | 4 | Navegação por arquivo |
| EAS Build | — | Build CI/CD |
| TypeScript | 5 | Tipagem |

## Localização

```
/home/regis/stack/companion/apps/mobile/
```

## Estrutura de Telas

```
app/
├── _layout.tsx          # Layout raiz (AuthProvider, QueryClient)
├── oauth/               # Fluxo de login
│   ├── login.tsx        # Tela de login (abre WebView OAuth)
│   └── callback.tsx     # Captura o code do redirect
└── (tabs)/              # Tabs principais (após login)
    ├── _layout.tsx      # Tab bar
    ├── (bookings)/      # Lista de agendamentos
    │   ├── index.tsx
    │   └── index.ios.tsx  # Variante iOS (com calendário)
    ├── (event-types)/   # Tipos de evento
    │   └── index.tsx
    ├── (availability)/  # Configurar disponibilidade
    │   └── index.tsx
    └── (more)/          # Configurações e perfil
        └── index.tsx
```

## Plataformas

| Arquivo | Plataforma |
|---------|-----------|
| `index.tsx` | Android (e fallback) |
| `index.ios.tsx` | iOS específico |

O Expo Router carrega automaticamente o arquivo `.ios.tsx` no iOS.

## API

O app consome a API REST v2:
```
Base URL: https://cal.allged.com.br/api/v2
Auth: Bearer {access_token}
```

## Estado Atual

- APK disponível (build `7ae3f01a` no EAS)
- Login OAuth funcionando (fix de scope normalization aplicado no backend)
- Pendente: toggle lista/calendário no iOS para bookings
- Pendente: push notifications configuradas

## Autenticação

Ver: [02-autenticacao.md](02-autenticacao.md)

## Build

Ver: [04-build-deploy.md](04-build-deploy.md)
