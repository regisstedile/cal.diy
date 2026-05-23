---
title: "Check available credits"
source: "https://cal.com/docs/api-reference/v2/credits/check-available-credits"
tags: [cal-com, docs]
---
# Check available credits

Copy page

Check if the authenticated user (or their org/team) has available credits and return the current balance.

Copy page

GET

/

v2

/

credits

/

available

Try it

Check available credits

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/credits/available \
  --header 'Authorization: Bearer <token>'
```

200

`{}`

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200 - application/json

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-notifications-remove-an-app-push-subscription|Remove an app push subscription]][[docs-api-reference-v2-credits-charge-credits|Charge credits]]
