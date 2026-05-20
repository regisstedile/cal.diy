---
title: "Delete a webhook"
source: "https://cal.com/docs/api-reference/v2/webhooks/delete-a-webhook"
tags: [cal-com, docs]
---
# Delete a webhook

Copy page

If accessed using an OAuth access token, the `WEBHOOK_WRITE` scope is required.

Copy page

DELETE

/

v2

/

webhooks

/

{webhookId}

Try it

Delete a webhook

cURL

```
curl --request DELETE \
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

[[docs-api-reference-v2-webhooks-get-a-webhook|Get a webhook]][[docs-api-reference-v2-stripe-get-stripe-connect-url|Get Stripe connect URL]]
