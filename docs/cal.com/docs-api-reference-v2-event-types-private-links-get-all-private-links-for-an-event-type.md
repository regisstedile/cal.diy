---
title: "Get all private links for an event type"
source: "https://cal.com/docs/api-reference/v2/event-types-private-links/get-all-private-links-for-an-event-type"
tags: [cal-com, docs]
---
# Get all private links for an event type

Copy page

If accessed using an OAuth access token, the `EVENT_TYPE_READ` scope is required.

Copy page

GET

/

v2

/

event-types

/

{eventTypeId}

/

private-links

Try it

Get all private links for an event type

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/private-links \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: <cal-api-version>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "linkId": "abc123def456",
      "eventTypeId": 123,
      "isExpired": false,
      "bookingUrl": "https://cal.com/d/abc123def456",
      "expiresAt": "2025-12-31T23:59:59.000Z"
    }
  ]
}
```

#### Headers

cal-api-version

string

default:2024-09-04

required

Must be set to `2024-09-04`. Returns the full booking URL including org slug and event slug.

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

string

required

Response status

Example:

`"success"`

data

object[]

required

Array of private links for the event type (mix of time-based and usage-based)

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-private-links-create-a-private-link-for-an-event-type|Create a private link for an event type]][[docs-api-reference-v2-event-types-private-links-update-a-private-link-for-an-event-type|Update a private link for an event type]]
