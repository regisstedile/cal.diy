---
title: "Update a private link for a team event type"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types-private-links/update-a-private-link-for-a-team-event-type"
tags: [cal-com, docs]
---
# Update a private link for a team event type

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

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

event-types

/

{eventTypeId}

/

private-links

/

{linkId}

Try it

Update a private link for a team event type

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId}/private-links/{linkId} \
  --header 'cal-api-version: 2024-09-04'
```

200

```
{
  "status": "success",
  "data": {
    "linkId": "abc123def456",
    "eventTypeId": 123,
    "isExpired": false,
    "bookingUrl": "https://cal.com/d/abc123def456",
    "expiresAt": "2025-12-31T23:59:59.000Z"
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

Updated private link data (either time-based or usage-based)

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-event-types-private-links-get-all-private-links-for-a-team-event-type|Get all private links for a team event type]][[docs-api-reference-v2-orgs-teams-event-types-private-links-delete-a-private-link-for-a-team-event-type|Delete a private link for a team event type]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
