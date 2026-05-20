---
title: "Delete a webhook"
source: "https://cal.com/docs/api-reference/v2/event-types-webhooks/delete-a-webhook"
tags: [cal-com, docs]
---
# Delete a webhook

Copy page

If accessed using an OAuth access token, the `EVENT_TYPE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

event-types

/

{eventTypeId}

/

webhooks

/

{webhookId}

Try it

Delete a webhook

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/webhooks/{webhookId} \
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
    "eventTypeId": 123,
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

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

webhookId

string

required

eventTypeId

number

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

[[docs-api-reference-v2-event-types-webhooks-get-a-webhook|Get a webhook]][[docs-api-reference-v2-event-types-private-links-create-a-private-link-for-an-event-type|Create a private link for an event type]]
