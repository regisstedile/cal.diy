---
title: "Clear my booking limits"
source: "https://cal.com/docs/api-reference/v2/me/clear-my-booking-limits"
tags: [cal-com, docs]
---
# Clear my booking limits

Copy page

Removes all of the authenticated user’s global booking limits. Only available to organization members — non-org accounts receive a 403. If accessed using an OAuth access token, the `PROFILE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

me

/

booking-limits

Try it

Clear my booking limits

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/me/booking-limits \
  --header 'Authorization: <authorization>'
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Response

204 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-me-update-my-booking-limits|Update my booking limits]][[docs-api-reference-v2-bookings-create-a-booking|Create a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
