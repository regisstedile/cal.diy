---
title: "Get Cal Video real time transcript download links for the booking"
source: "https://cal.com/docs/api-reference/v2/bookings/get-cal-video-real-time-transcript-download-links-for-the-booking"
tags: [cal-com, docs]
---
# Get Cal Video real time transcript download links for the booking

Copy page

Fetches all the transcript download links for the booking `:bookingUid`

Transcripts are generated when clicking “Transcribe” during a Cal Video meeting. Download links are valid for 1 hour only - make a new request to generate fresh links after expiration.

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

transcripts

Try it

Get Cal Video real time transcript download links for the booking

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/transcripts \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2026-02-25'
```

200

```
{
  "status": "success",
  "data": [
    "https://transcript1.com",
    "https://transcript2.com"
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

Available options:

`success`,

`error`

Example:

`"success"`

data

string[]

required

Example:

`[  "https://transcript1.com",  "https://transcript2.com"]`

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-get-all-the-recordings-for-the-booking|Get all the recordings for the booking]][[docs-api-reference-v2-bookings-reschedule-a-booking|Reschedule a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
