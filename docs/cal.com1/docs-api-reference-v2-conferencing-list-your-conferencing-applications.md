---
title: "List your conferencing applications"
source: "https://cal.com/docs/api-reference/v2/conferencing/list-your-conferencing-applications"
tags: [cal-com, docs]
---
# List your conferencing applications

Copy page

If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

conferencing

Try it

List your conferencing applications

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/conferencing \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 123,
      "type": "google_video",
      "userId": 123,
      "invalid": true
    }
  ]
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

data

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-conferencing-conferencing-app-oauth-callback|Conferencing app OAuth callback]][[docs-api-reference-v2-conferencing-set-your-default-conferencing-application|Set your default conferencing application]]
