---
title: "Get team routing forms"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-routing-forms/get-team-routing-forms"
tags: [cal-com, docs]
---
# Get team routing forms

Copy page

Required membership role: `team admin`. PBAC permission: `routingForm.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_ROUTING_FORM_READ` scope is required.

Copy page

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

routing-forms

Try it

Get team routing forms

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/routing-forms \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "name": "My Form",
      "description": "This is the description.",
      "position": 0,
      "createdAt": "2024-03-28T10:00:00.000Z",
      "updatedAt": "2024-03-28T10:00:00.000Z",
      "userId": 2313,
      "teamId": 4214321,
      "disabled": false,
      "id": "<string>",
      "routes": {},
      "fields": {},
      "settings": {}
    }
  ]
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

orgId

number

required

teamId

number

required

#### Query Parameters

skip

number

Number of responses to skip

take

number

Number of responses to take

sortCreatedAt

enum<string>

Sort by creation time

Available options:

`asc`,

`desc`

sortUpdatedAt

enum<string>

Sort by update time

Available options:

`asc`,

`desc`

afterCreatedAt

string<date-time>

Filter by responses created after this date

beforeCreatedAt

string<date-time>

Filter by responses created before this date

afterUpdatedAt

string<date-time>

Filter by responses created after this date

beforeUpdatedAt

string<date-time>

Filter by responses updated before this date

routedToBookingUid

string

Filter by responses routed to a specific booking

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-roles-permissions-remove-a-permission-from-an-organization-team-role|Remove a permission from an organization team role]][[docs-api-reference-v2-orgs-teams-routing-forms-responses-get-organization-team-routing-form-responses|Get organization team routing form responses]]
