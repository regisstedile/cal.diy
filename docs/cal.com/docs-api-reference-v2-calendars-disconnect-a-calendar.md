---
title: "Disconnect a calendar"
source: "https://cal.com/docs/api-reference/v2/calendars/disconnect-a-calendar"
tags: [cal-com, docs]
---
# Disconnect a calendar

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

POST

/

v2

/

calendars

/

{calendar}

/

disconnect

Try it

Disconnect a calendar

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/calendars/{calendar}/disconnect \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": 10
}'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "type": "<string>",
    "userId": 123,
    "teamId": 123,
    "appId": "<string>",
    "invalid": true
  }
}
```

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

#### Body

application/json

id

integer

required

Credential ID of the calendar to delete, as returned by the /calendars endpoint

Example:

`10`

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

[[docs-api-reference-v2-calendars-check-a-calendar-connection|Check a calendar connection]][[docs-api-reference-v2-cal-unified-calendars-get-meeting-details-from-calendar|Get meeting details from calendar]]
