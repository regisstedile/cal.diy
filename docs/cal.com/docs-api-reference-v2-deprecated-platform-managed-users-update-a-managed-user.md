---
title: "Update a managed user"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-managed-users/update-a-managed-user"
tags: [cal-com, docs]
---
# Update a managed user

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

PATCH

/

v2

/

oauth-clients

/

{clientId}

/

users

/

{userId}

Try it

Update a managed user

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/users/{userId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --header 'x-cal-secret-key: <x-cal-secret-key>' \
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
    "id": 1,
    "email": "alice+cluo37fwd0001khkzqqynkpj3@example.com",
    "username": "alice",
    "name": "alice",
    "bio": "bio",
    "timeZone": "America/New_York",
    "weekStart": "Sunday",
    "createdDate": "2024-04-01T00:00:00.000Z",
    "timeFormat": 12,
    "defaultScheduleId": null,
    "locale": "en",
    "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
    "metadata": {
      "key": "value"
    }
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

x-cal-secret-key

string

required

OAuth client secret key

#### Path Parameters

clientId

string

required

userId

number

required

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

`{ "key": "value" }`

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

[[docs-api-reference-v2-deprecated-platform-managed-users-get-a-managed-user|Get a managed user]][[docs-api-reference-v2-deprecated-platform-managed-users-delete-a-managed-user|Delete a managed user]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
