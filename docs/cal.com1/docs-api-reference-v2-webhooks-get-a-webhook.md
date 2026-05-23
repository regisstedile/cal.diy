---
title: "Get a webhook"
source: "https://cal.com/docs/api-reference/v2/webhooks/get-a-webhook"
tags: [cal-com, docs]
---
# Get a webhook

Copy page

If accessed using an OAuth access token, the `WEBHOOK_READ` scope is required.

Copy page

GET

/

v2

/

webhooks

/

{webhookId}

Try it

Get a webhook

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/webhooks/{webhookId} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
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
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

webhookId

string

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

[[docs-api-reference-v2-webhooks-update-a-webhook|Update a webhook]][[docs-api-reference-v2-webhooks-delete-a-webhook|Delete a webhook]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
