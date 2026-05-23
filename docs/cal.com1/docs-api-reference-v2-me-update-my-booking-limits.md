---
title: "Update my booking limits"
source: "https://cal.com/docs/api-reference/v2/me/update-my-booking-limits"
tags: [cal-com, docs]
---
# Update my booking limits

Copy page

Partially updates the authenticated user’s global booking limits. Only fields present in the request body are changed; omit a field to leave it untouched, or set it to null to remove that limit. Only available to organization members — non-org accounts receive a 403. If accessed using an OAuth access token, the `PROFILE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

me

/

booking-limits

Try it

Update my booking limits

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/me/booking-limits \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "perDay": 4,
  "perWeek": 20,
  "perMonth": 60,
  "perYear": 500
}
'
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

#### Body

application/json

perDay

number | null

Maximum number of bookings per day. Pass null to remove this limit.

Required range: `x >= 1`

Example:

`4`

perWeek

number | null

Maximum number of bookings per week. Pass null to remove this limit.

Required range: `x >= 1`

Example:

`20`

perMonth

number | null

Maximum number of bookings per month. Pass null to remove this limit.

Required range: `x >= 1`

Example:

`60`

perYear

number | null

Maximum number of bookings per year. Pass null to remove this limit.

Required range: `x >= 1`

Example:

`500`

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

[[docs-api-reference-v2-me-get-my-booking-limits|Get my booking limits]][[docs-api-reference-v2-me-clear-my-booking-limits|Clear my booking limits]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
