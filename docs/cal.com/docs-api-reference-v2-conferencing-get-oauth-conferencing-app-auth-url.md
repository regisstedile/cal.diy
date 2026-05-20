---
title: "Get OAuth conferencing app auth URL"
source: "https://cal.com/docs/api-reference/v2/conferencing/get-oauth-conferencing-app-auth-url"
tags: [cal-com, docs]
---
# Get OAuth conferencing app auth URL

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

GET

/

v2

/

conferencing

/

{app}

/

oauth

/

auth-url

Try it

Get OAuth conferencing app auth URL

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/conferencing/{app}/oauth/auth-url \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success"
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

`zoom`,

`msteams`

#### Query Parameters

returnTo

string

required

onErrorReturnTo

string

required

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

Was this page helpful?

Yes No

[[docs-api-reference-v2-conferencing-connect-your-conferencing-application|Connect your conferencing application]][[docs-api-reference-v2-conferencing-conferencing-app-oauth-callback|Conferencing app OAuth callback]]
