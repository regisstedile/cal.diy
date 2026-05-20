---
title: "Get a webhook"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-webhooks/get-a-webhook"
tags: [cal-com, docs]
---
# Get a webhook

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

GET

/

v2

/

oauth-clients

/

{clientId}

/

webhooks

/

{webhookId}

Try it

Get a webhook

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/webhooks/{webhookId} \
  --header 'Authorization: Bearer <token>' \
  --header 'x-cal-secret-key: <x-cal-secret-key>'
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
    "oAuthClientId": "<string>",
    "id": 123,
    "subscriberUrl": "<string>",
    "active": true,
    "secret": "<string>"
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

x-cal-secret-key

string

required

OAuth client secret key

#### Path Parameters

webhookId

string

required

clientId

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

[[docs-api-reference-v2-deprecated-platform-webhooks-update-a-webhook|Update a webhook]][[docs-api-reference-v2-deprecated-platform-webhooks-delete-a-webhook|Delete a webhook]]
