# API Keys

## O que são

API Keys permitem acesso à API REST v2 sem OAuth. Útil para integrações server-to-server.

## Criar

`/settings/developer/api-keys` → Adicionar chave

Campos:
- Nome (para identificação)
- Expiração (opcional)

A chave é gerada uma única vez e não pode ser recuperada depois.

## Formato

```
cal_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Usar

```http
GET https://cal.allged.com.br/api/v2/me
Authorization: Bearer cal_xxxxxxxx
```

## Escopos

API Keys tem acesso completo ao usuário que as criou (não tem escopos granulares como OAuth).

## Segurança

- Nunca commitar API keys em código
- Usar variáveis de ambiente
- Rotacionar periodicamente
- Deletar keys que não estão em uso

## Modelo DB

```
ApiKey {
  id: String    // UUID
  userId: Int
  note: String?  // Nome dado
  expiresAt: DateTime?
  hashedKey: String  // Armazenado com hash
  createdAt: DateTime
  lastUsedAt: DateTime?
}
```

## tRPC Routes

| Procedure | Descrição |
|-----------|-----------|
| `viewer.apiKeys.list` | Listar chaves do usuário |
| `viewer.apiKeys.create` | Criar chave |
| `viewer.apiKeys.delete` | Deletar chave |
| `viewer.apiKeys.edit` | Editar nome/expiração |
