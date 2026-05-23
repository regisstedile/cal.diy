---
title: "Delete a membership"
source: "https://cal.com/docs/api-reference/v2/teams-memberships/delete-a-membership"
tags: [cal-com, docs]
---
# Delete a membership

Copy page

If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

DELETE

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

Delete a membership

cURL

```
curl --request DELETE \
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

[[docs-api-reference-v2-teams-memberships-update-membership|Update membership]][[docs-api-reference-v2-teams-schedules-get-all-team-member-schedules|Get all team member schedules]]
