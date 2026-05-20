---
title: "Get booking references"
source: "https://cal.com/docs/api-reference/v2/bookings/get-booking-references"
tags: [cal-com, docs]
---
# Get booking references

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

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

references

Try it

Get booking references

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/references \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2026-02-25'
```

200

```
{
  "status": "success",
  "data": [
    {
      "type": "<string>",
      "eventUid": "<string>",
      "destinationCalendarId": "<string>",
      "id": 123
    }
  ]
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

#### Query Parameters

type

enum<string>

Filter booking references by type

Available options:

`google_calendar`,

`office365_calendar`,

`daily_video`,

`google_video`,

`office365_video`,

`zoom_video`

Example:

`"google_calendar"`

#### Response

200 - application/json

status

enum<string>

required

The status of the request, always 'success' for successful responses

Available options:

`success`,

`error`

Example:

`"success"`

data

object[]

required

Booking References

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-get-add-to-calendar-links-for-a-booking|Get 'Add to Calendar' links for a booking]][[docs-api-reference-v2-bookings-get-video-meeting-sessions-only-supported-for-cal-video|Get Video Meeting Sessions. Only supported for Cal Video]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
