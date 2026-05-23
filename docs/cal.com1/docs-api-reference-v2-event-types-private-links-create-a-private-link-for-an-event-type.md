---
title: "Create a private link for an event type"
source: "https://cal.com/docs/api-reference/v2/event-types-private-links/create-a-private-link-for-an-event-type"
tags: [cal-com, docs]
---
# Create a private link for an event type

Copy page

If accessed using an OAuth access token, the `EVENT_TYPE_WRITE` scope is required.

Copy page

POST

/

v2

/

event-types

/

{eventTypeId}

/

private-links

Try it

Create a private link for an event type

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/private-links \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "maxUsageCount": 10
}
'
```

201

```
{
  "status": "success",
  "data": {
    "linkId": "abc123def456",
    "eventTypeId": 123,
    "isExpired": false,
    "bookingUrl": "https://cal.com/d/abc123def456",
    "expiresAt": "2025-12-31T23:59:59.000Z"
  }
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

#### Body

application/json

expiresAt

string<date-time>

Expiration date for time-based links

Example:

`"2024-12-31T23:59:59.000Z"`

maxUsageCount

number

default:1

Maximum number of times the link can be used. If omitted and expiresAt is not provided, defaults to 1 (one time use).

Required range: `x >= 1`

Example:

`10`

#### Response

201 - application/json

status

string

required

Response status

Example:

`"success"`

data

object

required

Created private link data (either time-based or usage-based)

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-webhooks-delete-a-webhook|Delete a webhook]][[docs-api-reference-v2-event-types-private-links-get-all-private-links-for-an-event-type|Get all private links for an event type]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
