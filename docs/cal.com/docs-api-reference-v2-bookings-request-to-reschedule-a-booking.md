---
title: "Request to reschedule a booking"
source: "https://cal.com/docs/api-reference/v2/bookings/request-to-reschedule-a-booking"
tags: [cal-com, docs]
---
# Request to reschedule a booking

Copy page

Request to reschedule a booking. The booking will be cancelled and the attendee will receive an email with a link to reschedule.

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

request-reschedule

Try it

Request to reschedule a booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/request-reschedule \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "rescheduleReason": "I need to reschedule due to a conflict"
}
'
```

200

```
{
  "status": "success"
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

#### Body

application/json

rescheduleReason

string

Reason for requesting to reschedule the booking

Example:

`"I need to reschedule due to a conflict"`

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

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-reschedule-a-booking|Reschedule a booking]][[docs-api-reference-v2-bookings-cancel-a-booking|Cancel a booking]]
