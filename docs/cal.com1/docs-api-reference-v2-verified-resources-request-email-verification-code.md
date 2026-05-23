---
title: "Request email verification code"
source: "https://cal.com/docs/api-reference/v2/verified-resources/request-email-verification-code"
tags: [cal-com, docs]
---
# Request email verification code

Copy page

Sends a verification code to the email. If accessed using an OAuth access token, the `VERIFIED_RESOURCES_WRITE` scope is required.

Copy page

POST

/

v2

/

verified-resources

/

emails

/

verification-code

/

request

Try it

Request email verification code

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/verified-resources/emails/verification-code/request \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "acme@example.com"
}
'
```

200

```
{
  "status": "success"
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Body

application/json

email

string

required

Email to verify.

Example:

`"acme@example.com"`

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

Was this page helpful?

Yes No

[[docs-api-reference-v2-oauth2-exchange-authorization-code-or-refresh-token-for-tokens|Exchange authorization code or refresh token for tokens]][[docs-api-reference-v2-verified-resources-request-phone-number-verification-code|Request phone number verification code]]
