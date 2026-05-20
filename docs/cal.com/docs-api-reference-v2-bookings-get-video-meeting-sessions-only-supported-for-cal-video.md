---
title: "Get Video Meeting Sessions. Only supported for Cal Video"
source: "https://cal.com/docs/api-reference/v2/bookings/get-video-meeting-sessions-only-supported-for-cal-video"
tags: [cal-com, docs]
---
# Get Video Meeting Sessions. Only supported for Cal Video

Copy page

Requires authentication and proper authorization. Access is granted if you are the booking organizer, team admin or org admin/owner.

cal-api-version: `2026-02-25` is required in the request header.

This endpoint is rate-limited to 60 requests per minute per caller (per API key, access token, OAuth client, or IP). Exceeding the limit returns a 429 response and blocks further calls for 60 seconds.

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

conferencing-sessions

Try it

Get Video Meeting Sessions. Only supported for Cal Video

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/{bookingUid}/conferencing-sessions \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2026-02-25'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "session123",
      "room": "daily-video-room-123",
      "startTime": 1678901234,
      "duration": 3600,
      "ongoing": false,
      "maxParticipants": 10,
      "participants": [
        {
          "userId": "user123",
          "userName": "John Doe",
          "joinTime": 1678901234,
          "duration": 3600
        }
      ]
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

[[docs-api-reference-v2-bookings-get-booking-references|Get booking references]][[docs-api-reference-v2-bookings-update-booking-location-for-an-existing-booking|Update booking location for an existing booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
