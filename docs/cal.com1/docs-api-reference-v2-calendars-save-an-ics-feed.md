---
title: "Save an ICS feed"
source: "https://cal.com/docs/api-reference/v2/calendars/save-an-ics-feed"
tags: [cal-com, docs]
---
# Save an ICS feed

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

POST

/

v2

/

calendars

/

ics-feed

/

save

Try it

Save an ICS feed

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/calendars/ics-feed/save \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "urls": [
    "https://cal.com/ics/feed.ics"
  ],
  "readOnly": false
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": 1234567890,
    "type": "ics-feed_calendar",
    "userId": 1234567890,
    "teamId": 1234567890,
    "appId": "ics-feed",
    "invalid": false
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

urls

string[]

required

An array of ICS URLs

Example:

`["https://cal.com/ics/feed.ics"]`

readOnly

boolean

default:true

Whether to allowing writing to the calendar or not

Example:

`false`

#### Response

201 - application/json

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

[[docs-api-reference-v2-credits-charge-credits|Charge credits]][[docs-api-reference-v2-calendars-check-an-ics-feed|Check an ICS feed]]
