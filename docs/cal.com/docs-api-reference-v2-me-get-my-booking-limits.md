---
title: "Get my booking limits"
source: "https://cal.com/docs/api-reference/v2/me/get-my-booking-limits"
tags: [cal-com, docs]
---
# Get my booking limits

Copy page

Returns the authenticated user’s global booking limits. Unset bounds are returned as null. Only available to organization members — non-org accounts receive a 403. If accessed using an OAuth access token, the `PROFILE_READ` scope is required.

Copy page

GET

/

v2

/

me

/

booking-limits

Try it

Get my booking limits

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/me/booking-limits \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "perDay": 4,
    "perWeek": 20,
    "perMonth": 60,
    "perYear": 500
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

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

[[docs-api-reference-v2-me-update-my-profile|Update my profile]][[docs-api-reference-v2-me-update-my-booking-limits|Update my booking limits]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
