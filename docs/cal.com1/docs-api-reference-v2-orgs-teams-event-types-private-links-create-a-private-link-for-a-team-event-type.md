---
title: "Create a private link for a team event type"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types-private-links/create-a-private-link-for-a-team-event-type"
tags: [cal-com, docs]
---
# Create a private link for a team event type

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

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

event-types

/

{eventTypeId}

/

private-links

Try it

Create a private link for a team event type

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId}/private-links \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: 2024-09-04' \
  --data '
{
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "maxUsageCount": 1
}
'
```

201

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

orgId

number

required

#### Body

application/json

expiresAt

string<date-time>

Expiration date for time-based links

Example:

`"2024-12-31T23:59:59.000Z"`

maxUsageCount

number

default:1

Maximum number of times the link can be used. If omitted and expiresAt is not provided, defaults to 1 (one time use).

Required range: `x >= 1`

Example:

`10`

#### Response

201 - application/json

status

string

required

Response status

Example:

`"success"`

data

object

required

Created private link data (either time-based or usage-based)

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-event-types-get-all-team-event-types|Get all team event types]][[docs-api-reference-v2-orgs-teams-event-types-private-links-get-all-private-links-for-a-team-event-type|Get all private links for a team event type]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
