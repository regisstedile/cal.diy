---
title: "Get a specific organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles/get-a-specific-organization-role"
tags: [cal-com, docs]
---
# Get a specific organization role

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

/

{roleId}

Try it

Get a specific organization role

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}
```

200

```
{
  "status": "success",
  "data": {
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

roleId

string

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

[[docs-api-reference-v2-orgs-roles-get-all-organization-roles|Get all organization roles]][[docs-api-reference-v2-orgs-roles-update-an-organization-role|Update an organization role]]
