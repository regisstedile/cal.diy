---
title: "Get a managed user"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-managed-users/get-a-managed-user"
tags: [cal-com, docs]
---
# Get a managed user

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

/

{userId}

Try it

Get a managed user

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/users/{userId} \
  --header 'Authorization: Bearer <token>' \
  --header 'x-cal-secret-key: <x-cal-secret-key>'
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

[[docs-api-reference-v2-deprecated-platform-managed-users-create-a-managed-user|Create a managed user]][[docs-api-reference-v2-deprecated-platform-managed-users-update-a-managed-user|Update a managed user]]
