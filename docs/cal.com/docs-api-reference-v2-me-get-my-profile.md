---
title: "Get my profile"
source: "https://cal.com/docs/api-reference/v2/me/get-my-profile"
tags: [cal-com, docs]
---
# Get my profile

Copy page

If accessed using an OAuth access token, the `PROFILE_READ` scope is required.

Copy page

GET

/

v2

/

me

Try it

Get my profile

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/me \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "username": "<string>",
    "email": "<string>",
    "name": "<string>",
    "avatarUrl": "<string>",
    "bio": "<string>",
    "timeFormat": 123,
    "defaultScheduleId": 123,
    "weekStart": "<string>",
    "timeZone": "<string>",
    "locale": "en",
    "organizationId": 123,
    "organization": {
      "isPlatform": true,
      "id": 123
    }
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

required

Show child attributes

Was this page helpful?

Yes No

[[docs-agents|AI agents]][[docs-api-reference-v2-me-update-my-profile|Update my profile]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
