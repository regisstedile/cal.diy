---
title: "Check an ICS feed"
source: "https://cal.com/docs/api-reference/v2/calendars/check-an-ics-feed"
tags: [cal-com, docs]
---
# Check an ICS feed

Copy page

If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

calendars

/

ics-feed

/

check

Try it

Check an ICS feed

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/ics-feed/check \
  --header 'Authorization: <authorization>'
```

200

`{}`

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Response

200 - application/json

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-calendars-save-an-ics-feed|Save an ICS feed]][[docs-api-reference-v2-calendars-get-busy-times|Get busy times]]
