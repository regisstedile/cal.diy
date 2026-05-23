# Traefik / Proxy Reverso

## Roteamento Atual

| Domínio | Serviço interno | Porta |
|---------|----------------|-------|
| `cal.allged.com.br` | cal-src | 3005 |
| `chatwoot.allged.com.br` | chatwoot | 3010 |
| `n8n.allged.com.br` | n8n | 5678 |

## HTTPS

Certificados Let's Encrypt gerenciados automaticamente pelo Traefik.

## Headers Importantes

O Traefik deve passar os headers corretos para o Next.js:

```
X-Forwarded-For: {IP do cliente}
X-Forwarded-Proto: https
X-Real-IP: {IP do cliente}
```

O Next.js usa `NEXTAUTH_URL` para construir URLs de redirect. Deve ser `https://cal.allged.com.br`.

## Single-Org-Mode e Subdomínios

Se `NEXT_PUBLIC_SINGLE_ORG_SLUG` estiver definido, o Traefik não precisa rotear subdomínios de org. Caso contrário, subdomínios como `allged.cal.allged.com.br` precisariam de wildcard DNS e roteamento no Traefik.

**Estado atual**: Single-Org-Mode desabilitado, subdomínios de org não estão configurados.

## Verificar Certificado

```bash
curl -I https://cal.allged.com.br
# Deve retornar: HTTP/2 200, certificado válido
```
