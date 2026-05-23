---
title: "Update a reserved slot"
source: "https://cal.com/docs/api-reference/v2/slots/update-a-reserved-slot"
tags: [cal-com, docs]
---
# Update a reserved slot

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

Copy page

PATCH

/

v2

/

slots

/

reservations

/

{uid}

Try it

Update a reserved slot

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/slots/reservations/{uid} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "eventTypeId": 1,
  "slotStart": "2024-09-04T09:00:00Z",
  "slotDuration": 30,
  "reservationDuration": 5
}
'
```

200

```
{
  "status": "success",
  "data": {
    "eventTypeId": 1,
    "slotStart": "2024-09-04T09:00:00Z",
    "slotEnd": "2024-09-04T10:00:00Z",
    "slotDuration": 30,
    "reservationUid": "e84be5a3-4696-49e3-acc7-b2f3999c3b94",
    "reservationDuration": 5,
    "reservationUntil": "2023-09-04T10:00:00Z"
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

cal-api-version

string

default:2024-09-04

required

Must be set to 2024-09-04. If not set to this value, the endpoint will default to an older version.

#### Path Parameters

uid

string

required

#### Body

application/json

eventTypeId

number

required

The ID of the event type for which slot should be reserved.

Example:

`1`

slotStart

string<date-time>

required

ISO 8601 datestring in UTC timezone representing available slot.

Example:

`"2024-09-04T09:00:00Z"`

slotDuration

number

By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. If you don't have this set explicitly that event type can have one of many lengths you can omit this.

Example:

`30`

reservationDuration

number

ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret).

`For how many minutes the slot should be reserved - for this long time noone else can book this event type at `start` time. If not provided, defaults to 5 minutes.`

Example:

`5`

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

[[docs-api-reference-v2-slots-get-reserved-slot|Get reserved slot]][[docs-api-reference-v2-slots-delete-a-reserved-slot|Delete a reserved slot]]
