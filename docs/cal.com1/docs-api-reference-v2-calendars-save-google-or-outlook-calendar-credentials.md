---
title: "Save Google or Outlook calendar credentials"
source: "https://cal.com/docs/api-reference/v2/calendars/save-google-or-outlook-calendar-credentials"
tags: [cal-com, docs]
---
# Save Google or Outlook calendar credentials

Copy page

Copy page

GET

/

v2

/

calendars

/

{calendar}

/

save

Try it

Save Google or Outlook calendar credentials

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/{calendar}/save \
  --header 'Authorization: Bearer <token>'
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

calendar

enum<string>

required

Available options:

`office365`,

`google`

#### Query Parameters

state

string

required

code

string

required

#### Response

200 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-calendars-get-oauth-connect-url|Get OAuth connect URL]][[docs-api-reference-v2-calendars-save-apple-calendar-credentials|Save Apple calendar credentials]]
