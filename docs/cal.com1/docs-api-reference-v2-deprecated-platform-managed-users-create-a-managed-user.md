---
title: "Create a managed user"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-managed-users/create-a-managed-user"
tags: [cal-com, docs]
---
# Create a managed user

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

POST

/

v2

/

oauth-clients

/

{clientId}

/

users

Try it

Create a managed user

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/users \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --header 'x-cal-secret-key: <x-cal-secret-key>' \
  --data '
{
  "email": "alice@example.com",
  "name": "Alice Smith",
  "timeFormat": 12,
  "weekStart": "Monday",
  "timeZone": "America/New_York",
  "locale": "en",
  "avatarUrl": "https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png",
  "bio": "I am a bio",
  "metadata": {
    "key": "value"
  }
}
'
```

201

```
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "user": {
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
    },
    "accessTokenExpiresAt": 123,
    "refreshTokenExpiresAt": 123
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

#### Body

application/json

email

string

required

Example:

`"alice@example.com"`

name

string

required

Managed user's name is used in emails

Example:

`"Alice Smith"`

timeFormat

enum<number>

Must be a number 12 or 24

Available options:

`12`,

`24`

Example:

`12`

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

Timezone is used to create user's default schedule from Monday to Friday from 9AM to 5PM. If it is not passed then user does not have a default schedule and it must be created manually via the /schedules endpoint. Until the schedule is created, the user can't access availability atom to set his / her availability nor booked. It will default to Europe/London if not passed.

Example:

`"America/New_York"`

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

201 - application/json

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

[[docs-api-reference-v2-deprecated-platform-managed-users-get-all-managed-users|Get all managed users]][[docs-api-reference-v2-deprecated-platform-managed-users-get-a-managed-user|Get a managed user]]
