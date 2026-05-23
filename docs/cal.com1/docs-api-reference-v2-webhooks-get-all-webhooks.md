---
title: "Get all webhooks"
source: "https://cal.com/docs/api-reference/v2/webhooks/get-all-webhooks"
tags: [cal-com, docs]
---
# Get all webhooks

Copy page

Gets a paginated list of webhooks for the authenticated user. If accessed using an OAuth access token, the `WEBHOOK_READ` scope is required.

Copy page

GET

/

v2

/

webhooks

Try it

Get all webhooks

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/webhooks?take=250' \
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
      "userId": 123,
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

[[docs-api-reference-v2-webhooks-create-a-webhook|Create a webhook]][[docs-api-reference-v2-webhooks-update-a-webhook|Update a webhook]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
