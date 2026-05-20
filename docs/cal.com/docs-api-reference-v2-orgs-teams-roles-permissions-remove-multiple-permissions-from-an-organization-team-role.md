---
title: "Remove multiple permissions from an organization team role"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-roles-permissions/remove-multiple-permissions-from-an-organization-team-role"
tags: [cal-com, docs]
---
# Remove multiple permissions from an organization team role

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

Try it

Remove multiple permissions from an organization team role

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/roles/{roleId}/permissions
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

#### Query Parameters

permissions

enum<string>[]

Permissions to remove (format: resource.action). Supports comma-separated values as well as repeated query params.

Available options:

`role.create`,

`role.read`,

`role.update`,

`role.delete`,

`eventType.create`,

`eventType.read`,

`eventType.update`,

`eventType.delete`,

`team.read`,

`team.update`,

`team.delete`,

`team.invite`,

`team.remove`,

`team.listMembers`,

`team.listMembersPrivate`,

`team.changeMemberRole`,

`team.impersonate`,

`booking.read`,

`booking.readTeamBookings`,

`booking.readRecordings`,

`booking.update`,

`booking.readTeamAuditLogs`,

`insights.read`,

`workflow.create`,

`workflow.read`,

`workflow.update`,

`workflow.delete`,

`routingForm.create`,

`routingForm.read`,

`routingForm.update`,

`routingForm.delete`,

`webhook.create`,

`webhook.read`,

`webhook.update`,

`webhook.delete`,

`featureOptIn.read`,

`featureOptIn.update`

Example:

`"?permissions=eventType.read,booking.read"`

#### Response

204 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-roles-permissions-replace-all-permissions-for-an-organization-team-role|Replace all permissions for an organization team role]][[docs-api-reference-v2-orgs-teams-roles-permissions-remove-a-permission-from-an-organization-team-role|Remove a permission from an organization team role]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
