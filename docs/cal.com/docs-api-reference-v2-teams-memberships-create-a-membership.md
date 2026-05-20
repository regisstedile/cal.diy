---
title: "Create a membership"
source: "https://cal.com/docs/api-reference/v2/teams-memberships/create-a-membership"
tags: [cal-com, docs]
---
# Create a membership

Copy page

If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

POST

/

v2

/

teams

/

{teamId}

/

memberships

Try it

Create a membership

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams/{teamId}/memberships \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "userId": 123,
  "accepted": false,
  "role": "MEMBER",
  "disableImpersonation": false
}
'
```

201

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

#### Body

application/json

userId

number

required

accepted

boolean

default:false

role

enum<string>

default:MEMBER

Available options:

`MEMBER`,

`OWNER`,

`ADMIN`

disableImpersonation

boolean

default:false

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

[[docs-api-reference-v2-teams-invite-create-team-invite-link|Create team invite link]][[docs-api-reference-v2-teams-memberships-get-all-memberships|Get all memberships]]
