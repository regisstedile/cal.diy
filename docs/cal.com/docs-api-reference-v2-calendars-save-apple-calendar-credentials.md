---
title: "Save Apple calendar credentials"
source: "https://cal.com/docs/api-reference/v2/calendars/save-apple-calendar-credentials"
tags: [cal-com, docs]
---
# Save Apple calendar credentials

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

credentials

Try it

Save Apple calendar credentials

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/calendars/{calendar}/credentials \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "username": "<string>",
  "password": "<string>"
}
'
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

`apple`

#### Body

application/json

username

string

required

password

string

required

#### Response

201 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-calendars-save-google-or-outlook-calendar-credentials|Save Google or Outlook calendar credentials]][[docs-api-reference-v2-calendars-check-a-calendar-connection|Check a calendar connection]]
