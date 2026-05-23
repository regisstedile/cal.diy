---
title: "Get all managed users"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-managed-users/get-all-managed-users"
tags: [cal-com, docs]
---
# Get all managed users

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

GET

/

v2

/

oauth-clients

/

{clientId}

/

users

Try it

Get all managed users

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/users \
  --header 'Authorization: Bearer <token>' \
  --header 'x-cal-secret-key: <x-cal-secret-key>'
```

200

```
{
  "status": "success",
  "data": [
    {
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
  ]
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

#### Query Parameters

limit

number

The number of items to return

Example:

`10`

offset

number

The number of items to skip

Example:

`0`

emails

string[]

Filter managed users by email. If you want to filter by multiple emails, separate them with a comma.

Example:

`"?emails=email1@example.com,email2@example.com"`

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-deprecated-platform-oauth-clients-delete-an-oauth-client|Delete an OAuth client]][[docs-api-reference-v2-deprecated-platform-managed-users-create-a-managed-user|Create a managed user]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
