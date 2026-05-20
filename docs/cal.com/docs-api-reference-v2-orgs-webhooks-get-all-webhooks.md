---
title: "Get all webhooks"
source: "https://cal.com/docs/api-reference/v2/orgs-webhooks/get-all-webhooks"
tags: [cal-com, docs]
---
# Get all webhooks

Copy page

Required membership role: `org admin`. PBAC permission: `webhook.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_WEBHOOK_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

webhooks

Try it

Get all webhooks

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/webhooks
```

200

```
{
  "status": "success",
  "data": [
    {
      "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
      "triggers": [
        "BOOKING_CREATED"
      ],
      "teamId": 123,
      "id": 123,
      "subscriberUrl": "<string>",
      "active": true,
      "secret": "<string>"
    }
  ]
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

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

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

[[docs-api-reference-v2-orgs-teams-workflows-delete-organization-team-routing-form-workflow|Delete organization team routing-form workflow]][[docs-api-reference-v2-orgs-webhooks-create-a-webhook|Create a webhook]]
