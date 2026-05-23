---
title: "Delete a reserved slot"
source: "https://cal.com/docs/api-reference/v2/slots/delete-a-reserved-slot"
tags: [cal-com, docs]
---
# Delete a reserved slot

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

Copy page

DELETE

/

v2

/

slots

/

reservations

/

{uid}

Try it

Delete a reserved slot

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/slots/reservations/{uid} \
  --header 'Authorization: Bearer <token>' \
  --header 'cal-api-version: <cal-api-version>'
```

200

```
{
  "status": "success"
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

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-slots-update-a-reserved-slot|Update a reserved slot]][[docs-api-reference-v2-out-of-office-get-all-out-of-office-entries-for-the-authenticated-user|Get all out-of-office entries for the authenticated user]]
