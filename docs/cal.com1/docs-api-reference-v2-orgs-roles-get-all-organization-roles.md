---
title: "Get all organization roles"
source: "https://cal.com/docs/api-reference/v2/orgs-roles/get-all-organization-roles"
tags: [cal-com, docs]
---
# Get all organization roles

Copy page

Required membership role: `org admin`. PBAC permission: `role.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

roles

Try it

Get all organization roles

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/roles
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
      "organizationId": 123
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

[[docs-api-reference-v2-orgs-roles-create-a-new-organization-role|Create a new organization role]][[docs-api-reference-v2-orgs-roles-get-a-specific-organization-role|Get a specific organization role]]
