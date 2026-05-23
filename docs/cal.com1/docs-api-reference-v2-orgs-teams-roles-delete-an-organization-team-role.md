---
title: "Delete an organization team role"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-roles/delete-an-organization-team-role"
tags: [cal-com, docs]
---
# Delete an organization team role

Copy page

Copy page

DELETE

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

/

{roleId}

Try it

Delete an organization team role

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/roles/{roleId}
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
    "teamId": 123
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

[[docs-api-reference-v2-orgs-teams-roles-update-an-organization-team-role|Update an organization team role]][[docs-api-reference-v2-orgs-teams-roles-permissions-add-permissions-to-an-organization-team-role-single-or-batch|Add permissions to an organization team role (single or batch)]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
