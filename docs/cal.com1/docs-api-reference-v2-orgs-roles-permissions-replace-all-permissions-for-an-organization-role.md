---
title: "Replace all permissions for an organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles-permissions/replace-all-permissions-for-an-organization-role"
tags: [cal-com, docs]
---
# Replace all permissions for an organization role

Copy page

Required membership role: `org admin`. PBAC permission: `role.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

PUT

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

Replace all permissions for an organization role

cURL

```
curl --request PUT \
  --url https://api.cal.com/v2/organizations/{orgId}/roles/{roleId}/permissions \
  --header 'Content-Type: application/json' \
  --data '
{
  "permissions": [
    "eventType.read",
    "booking.read"
  ]
}
'
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

#### Body

application/json

permissions

enum<string>[]

required

Permissions to add (format: resource.action)

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

```json
["eventType.read", "booking.read"]
```

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

[[docs-api-reference-v2-orgs-roles-permissions-list-permissions-for-an-organization-role|List permissions for an organization role]][[docs-api-reference-v2-orgs-roles-permissions-remove-multiple-permissions-from-an-organization-role|Remove multiple permissions from an organization role]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
