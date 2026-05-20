---
title: "Remove a permission from an organization team role"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-roles-permissions/remove-a-permission-from-an-organization-team-role"
tags: [cal-com, docs]
---
# Remove a permission from an organization team role

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

/

permissions

/

{permission}

Try it

Remove a permission from an organization team role

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/roles/{roleId}/permissions/{permission}
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

permission

string

required

#### Response

204 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-roles-permissions-remove-multiple-permissions-from-an-organization-team-role|Remove multiple permissions from an organization team role]][[docs-api-reference-v2-orgs-teams-routing-forms-get-team-routing-forms|Get team routing forms]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
