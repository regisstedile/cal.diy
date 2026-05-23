---
title: "Get Stripe connect URL"
source: "https://cal.com/docs/api-reference/v2/stripe/get-stripe-connect-url"
tags: [cal-com, docs]
---
# Get Stripe connect URL

Copy page

Copy page

GET

/

v2

/

stripe

/

connect

Try it

Get Stripe connect URL

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/stripe/connect \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "authUrl": "<string>"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token

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

[[docs-api-reference-v2-webhooks-delete-a-webhook|Delete a webhook]][[docs-api-reference-v2-stripe-save-stripe-credentials|Save Stripe credentials]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
