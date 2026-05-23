---
title: "Get all memberships"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-memberships/get-all-memberships"
tags: [cal-com, docs]
---
# Get all memberships

Copy page

Required membership role: `team admin`. PBAC permission: `team.listMembers`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_READ` scope is required.

Copy page

GET

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

Try it

Get all memberships

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/memberships?take=250'
```

200

```
{
  "status": "success",
  "data": [
    {
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
  ]
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

[[docs-api-reference-v2-orgs-teams-invite-create-team-invite-link|Create team invite link]][[docs-api-reference-v2-orgs-teams-memberships-create-a-membership|Create a membership]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
