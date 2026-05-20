---
title: "Delete all webhooks"
source: "https://cal.com/docs/api-reference/v2/event-types-webhooks/delete-all-webhooks"
tags: [cal-com, docs]
---
# Delete all webhooks

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

Try it

Delete all webhooks

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/webhooks \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": "<string>"
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

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

string

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-webhooks-get-all-webhooks|Get all webhooks]][[docs-api-reference-v2-event-types-webhooks-update-a-webhook|Update a webhook]]
