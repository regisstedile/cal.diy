---
title: "Connect your conferencing application"
source: "https://cal.com/docs/api-reference/v2/conferencing/connect-your-conferencing-application"
tags: [cal-com, docs]
---
# Connect your conferencing application

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

POST

/

v2

/

conferencing

/

{app}

/

connect

Try it

Connect your conferencing application

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/conferencing/{app}/connect \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "type": "google_video",
    "userId": 123,
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

app

enum<string>

required

Conferencing application type

Available options:

`google-meet`

#### Response

200 - application/json

status

enum<string>

required

Available options:

`success`,

`error`

data

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-destination-calendars-update-destination-calendars|Update destination calendars]][[docs-api-reference-v2-conferencing-get-oauth-conferencing-app-auth-url|Get OAuth conferencing app auth URL]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
