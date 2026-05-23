---
title: "Remove a permission from an organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles-permissions/remove-a-permission-from-an-organization-role"
tags: [cal-com, docs]
---
[[calcom-docs-svg|Cal.com Docs home page![Image 1: light logo]]![[calcom-docs-light-svg|Image 2: dark logo]]](https://cal.com/docs)

*   [Support](https://go.cal.com/support)
*   [Dashboard](https://app.cal.com/)
*   [Dashboard](https://app.cal.com/)

[[docs-api-reference-v2-introduction|API v2 Reference]][[docs-atoms-introduction|Atoms]][[docs-developing-local-development|Developing]][[docs-self-hosting-installation|Self Hosting]]

##### Getting Started

*   [[docs-api-reference-v2-introduction|Introduction to API v2]]
*   [[docs-api-reference-v2-oauth|OAuth]]
*   [[docs-api-reference-v2-access-control|Access Control]]
*   [[docs-api-reference-v2-v1-v2-differences|Migrating from API v1 to v2]]
*   [[docs-mcp-server|MCP server]]
*   [[docs-api-reference-v2-user-booking-limits|User booking limits]]
*   [[docs-agents|AI agents]]

##### CORE

##### CALENDARS

##### EVENT TYPES & AUTOMATION

##### TEAMS

##### ORGANIZATIONS

*       *   [[docs-api-reference-v2-orgs-roles-create-a-new-organization-role|POST Create a new organization role]]
    *   [[docs-api-reference-v2-orgs-roles-get-all-organization-roles|GET Get all organization roles]]
    *   [[docs-api-reference-v2-orgs-roles-get-a-specific-organization-role|GET Get a specific organization role]]
    *   [[docs-api-reference-v2-orgs-roles-update-an-organization-role|PATCH Update an organization role]]
    *   [[docs-api-reference-v2-orgs-roles-delete-an-organization-role|DEL Delete an organization role]]
    *           *   [[docs-api-reference-v2-orgs-roles-permissions-add-permissions-to-an-organization-role-single-or-batch|POST Add permissions to an organization role (single or batch)]]
        *   [[docs-api-reference-v2-orgs-roles-permissions-list-permissions-for-an-organization-role|GET List permissions for an organization role]]
        *   [[docs-api-reference-v2-orgs-roles-permissions-replace-all-permissions-for-an-organization-role|PUT Replace all permissions for an organization role]]
        *   [[docs-api-reference-v2-orgs-roles-permissions-remove-multiple-permissions-from-an-organization-role|DEL Remove multiple permissions from an organization role]]
        *   

##### AUTH & ACCESS

##### DEPRECATED

Remove a permission from an organization role

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}/permissions/{permission}
```

Permissions

Required membership role: `org admin`. PBAC permission: `role.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

DELETE

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

/

{permission}

Remove a permission from an organization role

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}/permissions/{permission}
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

permission

string

required

#### Response

204 - undefined

Was this page helpful?

[[docs-api-reference-v2-orgs-roles-permissions-remove-multiple-permissions-from-an-organization-role|Remove multiple permissions from an organization role]][[docs-api-reference-v2-orgs-routing-forms-get-organization-routing-forms|Get organization routing forms]]
