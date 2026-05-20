---
title: "Update an organization role"
source: "https://cal.com/docs/api-reference/v2/orgs-roles/update-an-organization-role"
tags: [cal-com, docs]
---
Update an organization role

Roles

Required membership role: `org admin`. PBAC permission: `role.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Authorization

string

For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

orgId

number

required

roleId

string

required

#### Body

application/json

color

string

Color for the role (hex code)

description

string

Description of the role

permissions

enum<string>[]

Permissions for this role (format: resource.action). On update, this field replaces the entire permission set for the role (full replace). Use granular permission endpoints for one-by-one changes.

Available options

:

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

`[  "eventType.read",  "eventType.create",  "booking.read"]`

name

string

Name of the role

Minimum string length: `1`

#### Response

200 - application/json

status

enum<string>

required

Available options

:

`success`,

`error`

Example:

`"success"`

data

object

required

Show child attributes

Was this page helpful?

[[docs-api-reference-v2-orgs-roles-get-a-specific-organization-role|Get a specific organization role]][[docs-api-reference-v2-orgs-roles-delete-an-organization-role|Delete an organization role]]
