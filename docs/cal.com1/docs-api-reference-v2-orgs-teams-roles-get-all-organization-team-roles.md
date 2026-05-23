---
title: "Get all organization team roles"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-roles/get-all-organization-team-roles"
tags: [cal-com, docs]
---
# Get all organization team roles

Copy page

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

roles

Try it

Get all organization team roles

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/roles?take=250'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "<string>",
      "name": "<string>",
      "type": "SYSTEM",
      "permissions": [
        "booking.read",
        "eventType.create"
      ],
      "createdAt": "<string>",
      "updatedAt": "<string>",
      "color": "<string>",
      "description": "<string>",
      "teamId": 123
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

[[docs-api-reference-v2-orgs-teams-roles-create-a-new-organization-team-role|Create a new organization team role]][[docs-api-reference-v2-orgs-teams-roles-get-a-specific-organization-team-role|Get a specific organization team role]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
