---
title: "Update a membership"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-memberships/update-a-membership"
tags: [cal-com, docs]
---
# Update a membership

Copy page

Required membership role: `team admin`. PBAC permission: `team.changeMemberRole`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

PATCH

/

v2

/

organizations

/

{orgId}

/

teams

/

{teamId}

/

memberships

/

{membershipId}

Try it

Update a membership

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/memberships/{membershipId} \
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

For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

orgId

number

required

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

[[docs-api-reference-v2-orgs-teams-memberships-delete-a-membership|Delete a membership]][[docs-api-reference-v2-orgs-teams-roles-create-a-new-organization-team-role|Create a new organization team role]]
