---
title: "Delete a private link for an event type"
source: "https://cal.com/docs/api-reference/v2/event-types-private-links/delete-a-private-link-for-an-event-type"
tags: [cal-com, docs]
---
# Delete a private link for an event type

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

private-links

/

{linkId}

Try it

Delete a private link for an event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/event-types/{eventTypeId}/private-links/{linkId} \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2024-09-04'
```

200

```
{
  "status": "success",
  "data": {
    "linkId": "abc123def456",
    "message": "Private link deleted successfully"
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

Deleted link information

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-event-types-private-links-update-a-private-link-for-an-event-type|Update a private link for an event type]][[docs-api-reference-v2-routing-forms-calculate-slots-based-on-routing-form-response|Calculate slots based on routing form response]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
