---
title: "Get 'Add to Calendar' links for a booking"
source: "https://cal.com/docs/api-reference/v2/bookings/get-add-to-calendar-links-for-a-booking"
tags: [cal-com, docs]
---
# Get 'Add to Calendar' links for a booking

Copy page

Retrieve calendar links for a booking that can be used to add the event to various calendar services. Returns links for Google Calendar, Microsoft Office, Microsoft Outlook, and a downloadable ICS file.

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

calendar-links

Try it

Get 'Add to Calendar' links for a booking

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/calendar-links \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2026-02-25'
```

200

```
{
  "status": "success",
  "data": [
    {
      "label": "<string>",
      "link": "<string>"
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

Calendar links for the booking

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-decline-a-booking|Decline a booking]][[docs-api-reference-v2-bookings-get-booking-references|Get booking references]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
