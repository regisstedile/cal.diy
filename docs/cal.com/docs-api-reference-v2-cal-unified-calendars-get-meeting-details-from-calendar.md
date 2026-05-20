---
title: "Get meeting details from calendar"
source: "https://cal.com/docs/api-reference/v2/cal-unified-calendars/get-meeting-details-from-calendar"
tags: [cal-com, docs]
---
# Get meeting details from calendar

Copy page

Returns detailed information about a meeting including attendance metrics. If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

calendars

/

{calendar}

/

event

/

{eventUid}

Try it

Get meeting details from calendar

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/{calendar}/event/{eventUid} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "start": {
      "time": "2023-11-07T05:31:56Z",
      "timeZone": "<string>"
    },
    "end": {
      "time": "2023-11-07T05:31:56Z",
      "timeZone": "<string>"
    },
    "id": "<string>",
    "title": "<string>",
    "source": "google",
    "description": "<string>",
    "locations": [
      {
        "type": "video",
        "url": "<string>",
        "label": "<string>",
        "password": "<string>",
        "meetingCode": "<string>",
        "accessCode": "<string>"
      }
    ],
    "attendees": [
      {
        "email": "<string>",
        "name": "<string>",
        "responseStatus": "accepted",
        "self": true,
        "optional": true,
        "host": true
      }
    ],
    "status": "accepted",
    "hosts": [
      {
        "email": "<string>",
        "name": "<string>",
        "responseStatus": "accepted"
      }
    ],
    "calendarEventOwner": {
      "email": "<string>",
      "name": "<string>"
    }
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

calendar

enum<string>

required

Available options:

`google`

eventUid

string

required

The Google Calendar event ID. You can retrieve this by getting booking references from the following endpoints:

*   For team events: [[docs-api-reference-v2-orgs-teams-bookings-get-booking-references-for-a-booking|https://cal.com/docs/api-reference/v2/orgs-teams-bookings/get-booking-references-for-a-booking]]

*   For user events: [[docs-api-reference-v2-bookings-get-booking-references-for-a-booking|https://cal.com/docs/api-reference/v2/bookings/get-booking-references-for-a-booking]]

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

[[docs-api-reference-v2-calendars-disconnect-a-calendar|Disconnect a calendar]][[docs-api-reference-v2-cal-unified-calendars-update-meeting-details-in-calendar|Update meeting details in calendar]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
