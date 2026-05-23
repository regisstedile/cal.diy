# SSO / SAML

## Status Atual

Infraestrutura SAML está implementada no código (branch `feat/organization-sso-saml`), mas **não está ativa** na instância ALLGED.

Não há provedor SAML configurado nem necessidade atual.

## O que é SAML SSO

Permite que usuários façam login via provedor de identidade externo (ex: Google Workspace, Okta, Azure AD) sem precisar de senha local.

## Modelos DB

| Modelo | Descrição |
|--------|-----------|
| `DSyncData` | Dados de Directory Sync (SCIM) |
| `DSyncTeamGroupMapping` | Mapeamento grupos SCIM → times |

## Se Precisar Configurar no Futuro

1. Requer licença enterprise (flag `saml` no DB)
2. Configurar metadata XML do provedor em `/settings/organizations/sso`
3. Usuários do domínio serão redirecionados para o provedor

## Referência

Docs oficiais: `docs/cal.com/docs-self-hosting-guides-organization-*.md`
