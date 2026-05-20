---
title: "Get all memberships"
source: "https://cal.com/docs/api-reference/v2/teams-memberships/get-all-memberships"
tags: [cal-com, docs]
---
# Get all memberships

Copy page

Retrieve team memberships with optional filtering by email addresses. Supports pagination. If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_READ` scope is required.

Copy page

GET

/

v2

/

teams

/

{teamId}

/

memberships

Try it

Get all memberships

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/memberships \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "userId": 123,
    "teamId": 123,
    "accepted": true,
    "role": "MEMBER",
    "user": {
      "email": "<string>",
      "avatarUrl": "<string>",
      "username": "<string>",
      "name": "<string>",
      "bio": "<string>",
      "metadata": {
        "key": "value"
      }
    },
    "disableImpersonation": true
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

teamId

number

required

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

emails

string[]

Filter team memberships by email addresses. If you want to filter by multiple emails, separate them with a comma (max 20 emails for performance).

Example:

`"?emails=user1@example.com,user2@example.com"`

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

[[docs-api-reference-v2-teams-memberships-create-a-membership|Create a membership]][[docs-api-reference-v2-teams-memberships-get-a-membership|Get a membership]]
