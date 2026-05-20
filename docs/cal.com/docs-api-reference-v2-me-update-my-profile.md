---
title: "Update my profile"
source: "https://cal.com/docs/api-reference/v2/me/update-my-profile"
tags: [cal-com, docs]
---
# Update my profile

Copy page

Updates the authenticated user’s profile. Email changes require verification and the primary email stays unchanged until verification completes, unless the new email is already a verified secondary email or the user is platform-managed. If accessed using an OAuth access token, the `PROFILE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

me

Try it

Update my profile

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/me \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "<string>",
  "name": "<string>",
  "timeFormat": 12,
  "defaultScheduleId": 123,
  "weekStart": "Monday",
  "timeZone": "<string>",
  "locale": "en",
  "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
  "bio": "I am a bio",
  "metadata": {
    "key": "value"
  }
}
'
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

#### Body

application/json

email

string

name

string

timeFormat

enum<number>

Must be 12 or 24

Available options:

`12`,

`24`

Example:

`12`

defaultScheduleId

number

weekStart

enum<string>

Available options:

`Monday`,

`Tuesday`,

`Wednesday`,

`Thursday`,

`Friday`,

`Saturday`,

`Sunday`

Example:

`"Monday"`

timeZone

string

locale

enum<string>

Available options:

`ar`,

`ca`,

`de`,

`es`,

`eu`,

`he`,

`id`,

`ja`,

`lv`,

`pl`,

`ro`,

`sr`,

`th`,

`vi`,

`az`,

`cs`,

`el`,

`es-419`,

`fi`,

`hr`,

`it`,

`km`,

`nl`,

`pt`,

`ru`,

`sv`,

`tr`,

`zh-CN`,

`bg`,

`da`,

`en`,

`et`,

`fr`,

`hu`,

`iw`,

`ko`,

`no`,

`pt-BR`,

`sk`,

`ta`,

`uk`,

`zh-TW`,

`bn`

Example:

`"en"`

avatarUrl

string

URL of the user's avatar image

Example:

`"https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png"`

bio

string

Bio

Example:

`"I am a bio"`

metadata

object

You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.

Example:

```json
{ "key": "value" }
```

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

[[docs-api-reference-v2-me-get-my-profile|Get my profile]][[docs-api-reference-v2-me-get-my-booking-limits|Get my booking limits]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
