---
title: "Refresh API Key"
source: "https://cal.com/docs/api-reference/v2/api-keys/refresh-api-key"
tags: [cal-com, docs]
---
# Refresh API Key

Copy page

Generate a new API key and delete the current one. Provide API key to refresh as a Bearer token in the Authorization header (e.g. "Authorization: Bearer <apiKey>").

Copy page

POST

/

v2

/

api-keys

/

refresh

Try it

Refresh API Key

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/api-keys/refresh \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "apiKeyDaysValid": 30,
  "apiKeyNeverExpires": true
}
'
```

200

```
{
  "status": "success",
  "data": {
    "apiKey": "<string>"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Body

application/json

apiKeyDaysValid

number

default:30

For how many days is managed organization api key valid. Defaults to 30 days.

Required range: `x >= 1`

Example:

`60`

apiKeyNeverExpires

boolean

If true, organization api key never expires.

Example:

`true`

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

[[docs-api-reference-v2-organization-team-verified-resources-get-verified-phone-number-of-an-org-team-by-id|Get verified phone number of an org team by id]][[docs-api-reference-v2-oauth2-get-oauth2-client|Get OAuth2 client]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
