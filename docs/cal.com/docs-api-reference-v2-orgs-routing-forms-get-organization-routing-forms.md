---
title: "Get organization routing forms"
source: "https://cal.com/docs/api-reference/v2/orgs-routing-forms/get-organization-routing-forms"
tags: [cal-com, docs]
---
# Get organization routing forms

Copy page

Required membership role: `org admin`. PBAC permission: `routingForm.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_ROUTING_FORM_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

routing-forms

Try it

Get organization routing forms

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/routing-forms \
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

teamIds

number[]

Filter by teamIds. Team ids must be separated by a comma.

Example:

`"?teamIds=100,200"`

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

[[docs-api-reference-v2-orgs-roles-permissions-remove-a-permission-from-an-organization-role|Remove a permission from an organization role]][[docs-api-reference-v2-orgs-routing-forms-get-routing-form-responses|Get routing form responses]]
