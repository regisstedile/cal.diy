---
title: "Get your default conferencing application"
source: "https://cal.com/docs/api-reference/v2/conferencing/get-your-default-conferencing-application"
tags: [cal-com, docs]
---
# Get your default conferencing application

Copy page

If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

conferencing

/

default

Try it

Get your default conferencing application

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/conferencing/default \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "appSlug": "<string>",
    "appLink": "<string>"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

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

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-conferencing-set-your-default-conferencing-application|Set your default conferencing application]][[docs-api-reference-v2-conferencing-disconnect-your-conferencing-application|Disconnect your conferencing application]]
