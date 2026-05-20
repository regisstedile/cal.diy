---
title: "Update an organization team role"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-roles/update-an-organization-team-role"
tags: [cal-com, docs]
---
# Update an organization team role

Copy page

Copy page

PATCH

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

Update an organization team role

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/roles/{roleId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "color": "<string>",
  "description": "<string>",
  "permissions": [
    "eventType.read",
    "eventType.create",
    "booking.read"
  ],
  "name": "<string>"
}
'
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

[[docs-api-reference-v2-orgs-teams-roles-get-a-specific-organization-team-role|Get a specific organization team role]][[docs-api-reference-v2-orgs-teams-roles-delete-an-organization-team-role|Delete an organization team role]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
