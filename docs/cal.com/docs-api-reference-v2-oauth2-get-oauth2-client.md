---
title: "Get OAuth2 client"
source: "https://cal.com/docs/api-reference/v2/oauth2/get-oauth2-client"
tags: [cal-com, docs]
---
# Get OAuth2 client

Copy page

Returns the OAuth2 client information for the given client ID

Copy page

GET

/

v2

/

auth

/

oauth2

/

clients

/

{clientId}

Try it

Get OAuth2 client

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/auth/oauth2/clients/{clientId} \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": {
    "client_id": "clxxxxxxxxxxxxxxxx",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "name": "My App",
    "is_trusted": false,
    "client_type": "CONFIDENTIAL",
    "logo": "<string>"
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

clientId

string

required

#### Response

200 - application/json

status

enum<string>

required

Available options:

`success`,

`error`

Example:

`"success"`

data

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-api-keys-refresh-api-key|Refresh API Key]][[docs-api-reference-v2-oauth2-exchange-authorization-code-or-refresh-token-for-tokens|Exchange authorization code or refresh token for tokens]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
