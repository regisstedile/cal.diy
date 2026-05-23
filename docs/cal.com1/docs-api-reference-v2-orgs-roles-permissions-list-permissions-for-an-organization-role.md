---
title: "List permissions for an organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles-permissions/list-permissions-for-an-organization-role"
tags: [cal-com, docs]
---
# List permissions for an organization role

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

/

permissions

Try it

List permissions for an organization role

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}/permissions
```

200

```
{
  "status": "success",
  "data": [
    "<string>"
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

roleId

string

required

#### Response

200 - application/json

status

string

required

Example:

`"success"`

data

string[]

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-roles-permissions-add-permissions-to-an-organization-role-single-or-batch|Add permissions to an organization role (single or batch)]][[docs-api-reference-v2-orgs-roles-permissions-replace-all-permissions-for-an-organization-role|Replace all permissions for an organization role]]
