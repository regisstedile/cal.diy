---
title: "Delete a team event type"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types/delete-a-team-event-type"
tags: [cal-com, docs]
---
# Delete a team event type

Copy page

Required membership role: `team admin`. PBAC permission: `eventType.delete`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

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

event-types

/

{eventTypeId}

Try it

Delete a team event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId}
```

200

```
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Team Meeting"
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

teamId

number

required

eventTypeId

number

required

orgId

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

[[docs-api-reference-v2-orgs-teams-event-types-update-a-team-event-type|Update a team event type]][[docs-api-reference-v2-orgs-teams-event-types-create-a-phone-call|Create a phone call]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
