---
title: "Disconnect your conferencing application"
source: "https://cal.com/docs/api-reference/v2/conferencing/disconnect-your-conferencing-application"
tags: [cal-com, docs]
---
# Disconnect your conferencing application

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

DELETE

/

v2

/

conferencing

/

{app}

/

disconnect

Try it

Disconnect your conferencing application

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/conferencing/{app}/disconnect \
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

`msteams`

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

[[docs-api-reference-v2-conferencing-get-your-default-conferencing-application|Get your default conferencing application]][[docs-api-reference-v2-event-types-create-an-event-type|Create an event type]]
