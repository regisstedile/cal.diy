---
title: "Get OAuth connect URL"
source: "https://cal.com/docs/api-reference/v2/calendars/get-oauth-connect-url"
tags: [cal-com, docs]
---
# Get OAuth connect URL

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

GET

/

v2

/

calendars

/

{calendar}

/

connect

Try it

Get OAuth connect URL

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/{calendar}/connect \
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

`office365`,

`google`

#### Query Parameters

isDryRun

boolean

required

redir

string

Redirect URL after successful calendar authorization.

#### Response

200 - application/json

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-calendars-get-all-calendars|Get all calendars]][[docs-api-reference-v2-calendars-save-google-or-outlook-calendar-credentials|Save Google or Outlook calendar credentials]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
