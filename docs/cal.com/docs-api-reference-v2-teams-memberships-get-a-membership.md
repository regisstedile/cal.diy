---
title: "Get a membership"
source: "https://cal.com/docs/api-reference/v2/teams-memberships/get-a-membership"
tags: [cal-com, docs]
---
# Get a membership

Copy page

If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_READ` scope is required.

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

/

{membershipId}

Try it

Get a membership

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/memberships/{membershipId} \
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

membershipId

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

[[docs-api-reference-v2-teams-memberships-get-all-memberships|Get all memberships]][[docs-api-reference-v2-teams-memberships-update-membership|Update membership]]
