---
title: "Remove multiple permissions from an organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles-permissions/remove-multiple-permissions-from-an-organization-role"
tags: [cal-com, docs]
---
# Remove multiple permissions from an organization role

Copy page

Required membership role: `org admin`. PBAC permission: `role.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

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

Try it

Remove multiple permissions from an organization role

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}/permissions
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

#### Query Parameters

permissions

enum<string>[]

Permissions to remove (format: resource.action). Supports comma-separated values as well as repeated query params.

Available options:

`*.*`,

`role.create`,

`role.read`,

`role.update`,

`role.delete`,

`eventType.create`,

`eventType.read`,

`eventType.update`,

`eventType.delete`,

`team.create`,

`team.read`,

`team.update`,

`team.delete`,

`team.invite`,

`team.remove`,

`team.listMembers`,

`team.listMembersPrivate`,

`team.changeMemberRole`,

`team.impersonate`,

`organization.create`,

`organization.read`,

`organization.listMembers`,

`organization.listMembersPrivate`,

`organization.invite`,

`organization.remove`,

`organization.manageBilling`,

`organization.changeMemberRole`,

`organization.impersonate`,

`organization.passwordReset`,

`organization.editUsers`,

`organization.update`,

`organization.delete`,

`booking.read`,

`booking.readOrgBookings`,

`booking.readRecordings`,

`booking.update`,

`booking.readOrgAuditLogs`,

`insights.read`,

`workflow.create`,

`workflow.read`,

`workflow.update`,

`workflow.delete`,

`organization.attributes.read`,

`organization.attributes.update`,

`organization.attributes.delete`,

`organization.attributes.create`,

`organization.attributes.editUsers`,

`routingForm.create`,

`routingForm.read`,

`routingForm.update`,

`routingForm.delete`,

`webhook.create`,

`webhook.read`,

`webhook.update`,

`webhook.delete`,

`watchlist.create`,

`watchlist.read`,

`watchlist.update`,

`watchlist.delete`,

`featureOptIn.read`,

`featureOptIn.update`,

`organization.customDomain.create`,

`organization.customDomain.read`,

`organization.customDomain.update`,

`organization.customDomain.delete`

Example:

`"?permissions=eventType.read,booking.read"`

#### Response

204 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-roles-permissions-replace-all-permissions-for-an-organization-role|Replace all permissions for an organization role]][[docs-api-reference-v2-orgs-roles-permissions-remove-a-permission-from-an-organization-role|Remove a permission from an organization role]]
