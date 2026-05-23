---
title: "Update membership"
source: "https://cal.com/docs/api-reference/v2/teams-memberships/update-membership"
tags: [cal-com, docs]
---
# Update membership

Copy page

If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

PATCH

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

Update membership

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/teams/{teamId}/memberships/{membershipId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "accepted": true,
  "role": "MEMBER",
  "disableImpersonation": true
}
'
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

#### Body

application/json

accepted

boolean

role

enum<string>

Available options:

`MEMBER`,

`OWNER`,

`ADMIN`

disableImpersonation

boolean

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

[[docs-api-reference-v2-teams-memberships-get-a-membership|Get a membership]][[docs-api-reference-v2-teams-memberships-delete-a-membership|Delete a membership]]
