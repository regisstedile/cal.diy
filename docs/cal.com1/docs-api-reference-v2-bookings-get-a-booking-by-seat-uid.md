---
title: "Get a booking by seat UID"
source: "https://cal.com/docs/api-reference/v2/bookings/get-a-booking-by-seat-uid"
tags: [cal-com, docs]
---
# Get a booking by seat UID

Copy page

Get a seated booking by its seat reference UID. This is useful when you have a seatUid from a seated booking and want to retrieve the full booking details.

If you are fetching a seated booking for an event type with ‘show attendees’ disabled, then to retrieve attendees in the response either set ‘show attendees’ to true on event type level or you have to provide an authentication method of event type owner, host, team admin or owner or org admin or owner.

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

Copy page

GET

/

v2

/

bookings

/

by-seat

/

{seatUid}

Try it

Get a booking by seat UID

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/bookings/by-seat/{seatUid} \
  --header 'cal-api-version: 2026-02-25'
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

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

seatUid

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

[[docs-api-reference-v2-bookings-get-all-bookings|Get all bookings]][[docs-api-reference-v2-bookings-get-a-booking|Get a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
