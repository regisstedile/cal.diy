---
title: "Check a calendar connection"
source: "https://cal.com/docs/api-reference/v2/calendars/check-a-calendar-connection"
tags: [cal-com, docs]
---
# Check a calendar connection

Copy page

If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

calendars

/

{calendar}

/

check

Try it

Check a calendar connection

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/{calendar}/check \
  --header 'Authorization: <authorization>'
```

200

`{}`

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

calendar

enum<string>

required

Available options:

`apple`,

`google`,

`office365`

#### Response

200 - application/json

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-calendars-save-apple-calendar-credentials|Save Apple calendar credentials]][[docs-api-reference-v2-calendars-disconnect-a-calendar|Disconnect a calendar]]
