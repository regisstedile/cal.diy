---
title: "Save Stripe credentials"
source: "https://cal.com/docs/api-reference/v2/stripe/save-stripe-credentials"
tags: [cal-com, docs]
---
# Save Stripe credentials

Copy page

Copy page

GET

/

v2

/

stripe

/

save

Try it

Save Stripe credentials

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/stripe/save \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "url": "<string>"
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

state

string

required

code

string

required

#### Response

200 - application/json

url

string

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-stripe-get-stripe-connect-url|Get Stripe connect URL]][[docs-api-reference-v2-stripe-check-stripe-connection|Check Stripe connection]]
