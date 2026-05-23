---
title: "Delete an event type"
source: "https://cal.com/docs/api-reference/v2/event-types/delete-an-event-type"
tags: [cal-com, docs]
---
# Delete an event type

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

If accessed using an OAuth access token, the `EVENT_TYPE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

event-types

/

{eventTypeId}

Try it

Delete an event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/event-types/{eventTypeId} \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2024-06-14'
```

200

```
{
  "status": "success",
  "data": {
    "id": 1,
    "lengthInMinutes": 60,
    "title": "Learn the secrets of masterchief!",
    "slug": "<string>"
  }
}
```

#### Headers

cal-api-version

string

default:2024-06-14

required

Must be set to 2024-06-14. If not set to this value, the endpoint will default to an older version.

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

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-update-an-event-type|Update an event type]][[docs-api-reference-v2-event-types-webhooks-create-a-webhook|Create a webhook]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
