---
title: "Save Stripe credentials"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-stripe/save-stripe-credentials"
tags: [cal-com, docs]
---
##### Getting Started

*   [[docs-api-reference-v2-introduction|Introduction to API v2]]
*   [[docs-api-reference-v2-oauth|OAuth]]
*   [[docs-api-reference-v2-access-control|Access Control]]
*   [[docs-api-reference-v2-v1-v2-differences|Migrating from API v1 to v2]]
*   [[docs-mcp-server|MCP server]]
*   [[docs-api-reference-v2-user-booking-limits|User booking limits]]
*   [[docs-agents|AI agents]]

##### CORE

##### CALENDARS

##### EVENT TYPES & AUTOMATION

##### TEAMS

##### ORGANIZATIONS

*       *   [[docs-api-reference-v2-orgs-teams-get-all-teams|GET Get all teams]]
    *   [[docs-api-reference-v2-orgs-teams-create-a-team|POST Create a team]]
    *   [[docs-api-reference-v2-orgs-teams-get-teams-membership-for-user|GET Get teams membership for user]]
    *   [[docs-api-reference-v2-orgs-teams-get-a-team|GET Get a team]]
    *   [[docs-api-reference-v2-orgs-teams-delete-a-team|DEL Delete a team]]
    *   [[docs-api-reference-v2-orgs-teams-update-a-team|PATCH Update a team]]

    *           *   [[docs-api-reference-v2-orgs-teams-stripe-get-stripe-connect-url-for-a-team|GET Get Stripe connect URL for a team]]
        *   [[docs-api-reference-v2-orgs-teams-stripe-check-team-stripe-connection|GET Check team Stripe connection]]
        *   

##### AUTH & ACCESS

##### DEPRECATED

Save Stripe credentials

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/stripe/save \
  --header 'Authorization: Bearer <token>'
```

```
{
  "url": "<string>"
}
```

Stripe

Required membership role: `team admin`. PBAC permission: `organization.manageBilling`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

GET

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

stripe

/

save

Save Stripe credentials

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/stripe/save \
  --header 'Authorization: Bearer <token>'
```

```
{
  "url": "<string>"
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

teamId

number

required

orgId

number

required

#### Query Parameters

state

string

required

code

string

required

#### Response

200 - application/json

url

string

required

Was this page helpful?

[[docs-api-reference-v2-orgs-teams-stripe-check-team-stripe-connection|Check team Stripe connection]][[docs-api-reference-v2-orgs-teams-users-schedules-get-schedules-of-a-team-member|Get schedules of a team member]]
