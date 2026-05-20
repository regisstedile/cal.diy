---
title: "Decline a booking"
source: "https://cal.com/docs/api-reference/v2/bookings/decline-a-booking"
tags: [cal-com, docs]
---
# Decline a booking

Copy page

The provided authorization header refers to the owner of the booking.

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

decline

Try it

Decline a booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/decline \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: 2026-02-25' \
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
  "data": {
    "id": 123,
    "uid": "booking_uid_123",
    "title": "Consultation",
    "description": "Learn how to integrate scheduling into marketplace.",
    "hosts": [
      {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane100@example.com",
        "displayEmail": "jane100@example.com",
        "username": "jane100",
        "timeZone": "America/Los_Angeles"
      }
    ],
    "status": "accepted",
    "start": "2024-08-13T15:30:00Z",
    "end": "2024-08-13T16:30:00Z",
    "duration": 60,
    "eventTypeId": 50,
    "eventType": {
      "id": 1,
      "slug": "some-event"
    },
    "location": "https://example.com/meeting",
    "absentHost": true,
    "createdAt": "2024-08-13T15:30:00Z",
    "updatedAt": "2024-08-13T15:30:00Z",
    "attendees": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "displayEmail": "john@example.com",
        "timeZone": "America/New_York",
        "absent": false,
        "language": "en",
        "phoneNumber": "+1234567890"
      }
    ],
    "bookingFieldsResponses": {
      "customField": "customValue"
    },
    "cancellationReason": "User requested cancellation",
    "cancelledByEmail": "canceller@example.com",
    "reschedulingReason": "User rescheduled the event",
    "rescheduledByEmail": "rescheduler@example.com",
    "rescheduledFromUid": "previous_uid_123",
    "rescheduledToUid": "new_uid_456",
    "meetingUrl": "https://example.com/recurring-meeting",
    "metadata": {
      "key": "value"
    },
    "rating": 4,
    "icsUid": "ics_uid_123",
    "guests": [
      "guest1@example.com",
      "guest2@example.com"
    ]
  }
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

reason

string

Reason for declining a booking that requires a confirmation

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

object

required

Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects

*   Option 1 · object 
*   Option 2 · object 
*   Option 3 · object[] 
*   Option 4 · object 
*   Option 5 · object 
*   Option 6 · object[] 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-confirm-a-booking|Confirm a booking]][[docs-api-reference-v2-bookings-get-add-to-calendar-links-for-a-booking|Get 'Add to Calendar' links for a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
