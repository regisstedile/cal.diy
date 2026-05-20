---
title: "Get all webhooks for a team event type"
source: "https://cal.com/docs/api-reference/v2/teams-event-types-webhooks/get-all-webhooks-for-a-team-event-type"
tags: [cal-com, docs]
---
# Get all webhooks for a team event type

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_READ` scope is required.

Copy page

GET

/

v2

/

teams

/

{teamId}

/

event-types

/

{eventTypeId}

/

webhooks

Try it

Get all webhooks for a team event type

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/event-types/{eventTypeId}/webhooks \
  --header 'Authorization: <authorization>'
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
      "eventTypeId": 123,
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

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

eventTypeId

number

required

teamId

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

[[docs-api-reference-v2-teams-event-types-webhooks-create-a-webhook-for-a-team-event-type|Create a webhook for a team event type]][[docs-api-reference-v2-teams-event-types-webhooks-delete-all-webhooks-for-a-team-event-type|Delete all webhooks for a team event type]]
