---
title: "Get all the recordings for the booking"
source: "https://cal.com/docs/api-reference/v2/bookings/get-all-the-recordings-for-the-booking"
tags: [cal-com, docs]
---
# Get all the recordings for the booking

Copy page

Fetches all the recordings for the booking `:bookingUid`. Requires authentication and proper authorization. Access is granted if you are the booking organizer, team admin or org admin/owner.

cal-api-version: `2026-02-25` is required in the request header.

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

recordings

Try it

Get all the recordings for the booking

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/recordings \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2026-02-25'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "1234567890",
      "roomName": "daily-video-room-123",
      "startTs": 1678901234,
      "status": "completed",
      "duration": 3600,
      "shareToken": "share-token-123",
      "maxParticipants": 10,
      "downloadLink": "https://cal-video-recordings.s3.us-east-2.amazonaws.com/meetco/123s",
      "error": "Error message"
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

[[docs-api-reference-v2-bookings-get-a-booking|Get a booking]][[docs-api-reference-v2-bookings-get-cal-video-real-time-transcript-download-links-for-the-booking|Get Cal Video real time transcript download links for the booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
