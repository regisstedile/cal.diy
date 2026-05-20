---
title: "Set your default conferencing application"
source: "https://cal.com/docs/api-reference/v2/conferencing/set-your-default-conferencing-application"
tags: [cal-com, docs]
---
# Set your default conferencing application

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

default

Try it

Set your default conferencing application

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/conferencing/{app}/default \
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

`google-meet`,

`zoom`,

`msteams`,

`daily-video`

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

[[docs-api-reference-v2-conferencing-list-your-conferencing-applications|List your conferencing applications]][[docs-api-reference-v2-conferencing-get-your-default-conferencing-application|Get your default conferencing application]]
