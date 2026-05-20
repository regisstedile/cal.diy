---
title: "Check Stripe connection"
source: "https://cal.com/docs/api-reference/v2/stripe/check-stripe-connection"
tags: [cal-com, docs]
---
# Check Stripe connection

Copy page

Copy page

GET

/

v2

/

stripe

/

check

Try it

Check Stripe connection

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/stripe/check \
  --header 'Authorization: <authorization>'
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

Was this page helpful?

Yes No

[[docs-api-reference-v2-stripe-save-stripe-credentials|Save Stripe credentials]][[docs-api-reference-v2-teams-create-a-team|Create a team]]
