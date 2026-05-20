---
title: "Delete a private link for a team event type"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types-private-links/delete-a-private-link-for-a-team-event-type"
tags: [cal-com, docs]
---
# Delete a private link for a team event type

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

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

/

private-links

/

{linkId}

Try it

Delete a private link for a team event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId}/private-links/{linkId} \
  --header 'cal-api-version: <cal-api-version>'
```

200

```
{
  "status": "success",
  "data": {
    "linkId": "abc123def456",
    "message": "Private link deleted successfully"
  }
}
```

#### Headers

cal-api-version

string

default:2024-09-04

required

Must be set to `2024-09-04`. Returns the full booking URL including org slug and event slug.

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

linkId

string

required

orgId

number

required

#### Response

200 - application/json

status

string

required

Response status

Example:

`"success"`

data

object

required

Deleted link information

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-event-types-private-links-update-a-private-link-for-a-team-event-type|Update a private link for a team event type]][[docs-api-reference-v2-orgs-teams-invite-create-team-invite-link|Create team invite link]]
