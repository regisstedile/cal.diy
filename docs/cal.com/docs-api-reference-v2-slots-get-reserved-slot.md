---
title: "Get reserved slot"
source: "https://cal.com/docs/api-reference/v2/slots/get-reserved-slot"
tags: [cal-com, docs]
---
# Get reserved slot

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

Copy page

GET

/

v2

/

slots

/

reservations

/

{uid}

Try it

Get reserved slot

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/slots/reservations/{uid} \
  --header 'Authorization: Bearer <token>' \
  --header 'cal-api-version: <cal-api-version>'
```

200

```
{
  "status": "success",
  "data": null
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

cal-api-version

string

default:2024-09-04

required

Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.

#### Path Parameters

uid

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

unknown

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-slots-reserve-a-slot|Reserve a slot]][[docs-api-reference-v2-slots-update-a-reserved-slot|Update a reserved slot]]
