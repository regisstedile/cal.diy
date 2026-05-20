---
title: "Reassign a booking to a specific host"
source: "https://cal.com/docs/api-reference/v2/bookings/reassign-a-booking-to-a-specific-host"
tags: [cal-com, docs]
---
# Reassign a booking to a specific host

Copy page

Currently only supports reassigning host for round robin bookings. The provided authorization header refers to the owner of the booking.

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

If accessed using an OAuth access token, the `BOOKING_WRITE` scope is required.

Copy page

POST

/

v2

/

bookings

/

{bookingUid}

/

reassign

/

{userId}

Try it

Reassign a booking to a specific host

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/reassign/{userId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "reason": "Host has to take another call"
}
'
```

200

```
{
  "status": "success",
  "data": "<unknown>"
}
```

#### Headers

cal-api-version

string

default:2026-02-25

required

Must be set to 2026-02-25.

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

bookingUid

string

required

userId

number

required

#### Body

application/json

reason

string

Reason for reassigning the booking

Example:

`"Host has to take another call"`

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

any

required

Booking data, which can be either a ReassignAutoBookingOutput object or a ReassignManualBookingOutput object

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-reassign-a-booking-to-auto-selected-host|Reassign a booking to auto-selected host]][[docs-api-reference-v2-bookings-confirm-a-booking|Confirm a booking]]
