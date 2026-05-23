---
title: "Get all attendees for a booking"
source: "https://cal.com/docs/api-reference/v2/bookings-attendees/get-all-attendees-for-a-booking"
tags: [cal-com, docs]
---
# Get all attendees for a booking

Copy page

Retrieve all attendees for a specific booking by its UID.

The cal-api-version header is required for this endpoint. Without it, the request will fail with a 404 error.

If accessed using an OAuth access token, the `BOOKING_READ` scope is required.

Copy page

GET

/

v2

/

bookings

/

{bookingUid}

/

attendees

Try it

Get all attendees for a booking

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/attendees \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: <cal-api-version>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "displayEmail": "john@example.com",
      "timeZone": "America/New_York",
      "absent": false,
      "id": 251,
      "language": "en",
      "phoneNumber": "+1234567890"
    }
  ]
}
```

#### Headers

cal-api-version

string

required

Must be set to 2024-08-13. This header is required as this endpoint does not exist in older API versions.

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

bookingUid

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-update-booking-location-for-an-existing-booking|Update booking location for an existing booking]][[docs-api-reference-v2-bookings-attendees-add-an-attendee-to-a-booking|Add an attendee to a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
