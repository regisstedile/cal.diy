---
title: "Update meeting details in calendar"
source: "https://cal.com/docs/api-reference/v2/cal-unified-calendars/update-meeting-details-in-calendar"
tags: [cal-com, docs]
---
# Update meeting details in calendar

Copy page

Updates event information in the specified calendar provider. If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

PATCH

/

v2

/

calendars

/

{calendar}

/

events

/

{eventUid}

Try it

Update meeting details in calendar

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/calendars/{calendar}/events/{eventUid} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "start": {
    "time": "2023-11-07T05:31:56Z",
    "timeZone": "<string>"
  },
  "end": {
    "time": "2023-11-07T05:31:56Z",
    "timeZone": "<string>"
  },
  "title": "<string>",
  "description": "<string>",
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
  "status": "accepted"
}
'
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

#### Body

application/json

start

object

Start date and time of the calendar event with timezone information

Show child attributes

end

object

End date and time of the calendar event with timezone information

Show child attributes

title

string

Title of the calendar event

description

string | null

Detailed description of the calendar event

attendees

object[] | null

List of attendees. CAUTION: You must pass the entire array with all updated values. Any attendees not included in this array will be removed from the event.

Show child attributes

status

enum<string> | null

Status of the event (accepted, pending, declined, cancelled)

Available options:

`accepted`,

`pending`,

`declined`,

`cancelled`

Example:

`"accepted"`

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

[[docs-api-reference-v2-cal-unified-calendars-get-meeting-details-from-calendar|Get meeting details from calendar]][[docs-api-reference-v2-selected-calendars-add-a-selected-calendar|Add a selected calendar]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
