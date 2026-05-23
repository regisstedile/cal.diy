---
title: "Update a private link for an event type"
source: "https://cal.com/docs/api-reference/v2/event-types-private-links/update-a-private-link-for-an-event-type"
tags: [cal-com, docs]
---
# Update a private link for an event type

Copy page

If accessed using an OAuth access token, the `EVENT_TYPE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

event-types

/

{eventTypeId}

/

private-links

/

{linkId}

Try it

Update a private link for an event type

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/private-links/{linkId} \
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

200

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

linkId

string

required

#### Body

application/json

expiresAt

string<date-time>

New expiration date for time-based links

Example:

`"2024-12-31T23:59:59.000Z"`

maxUsageCount

number

New maximum number of times the link can be used

Required range: `x >= 1`

Example:

`10`

#### Response

200 - application/json

status

string

required

Response status

Example:

`"success"`

data

object

required

Updated private link data (either time-based or usage-based)

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-private-links-get-all-private-links-for-an-event-type|Get all private links for an event type]][[docs-api-reference-v2-event-types-private-links-delete-a-private-link-for-an-event-type|Delete a private link for an event type]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
