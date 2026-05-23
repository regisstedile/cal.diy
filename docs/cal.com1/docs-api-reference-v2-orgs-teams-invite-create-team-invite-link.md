---
title: "Create team invite link"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-invite/create-team-invite-link"
tags: [cal-com, docs]
---
# Create team invite link

Copy page

Required membership role: `team admin`. PBAC permission: `team.invite`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

POST

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

invite

Try it

Create team invite link

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/invite
```

200

```
{
  "status": "success",
  "data": {
    "token": "f6a5c8b1d2e34c7f90a1b2c3d4e5f6a5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2",
    "inviteLink": "http://app.cal.com/signup?token=f6a5c8b1d2e34c7f90a1b2c3d4e5f6a5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2&callbackUrl=/getting-started"
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

[[docs-api-reference-v2-orgs-teams-event-types-private-links-delete-a-private-link-for-a-team-event-type|Delete a private link for a team event type]][[docs-api-reference-v2-orgs-teams-memberships-get-all-memberships|Get all memberships]]
