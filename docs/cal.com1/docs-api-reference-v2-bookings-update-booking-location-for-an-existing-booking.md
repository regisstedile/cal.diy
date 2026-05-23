---
title: "Update booking location for an existing booking"
source: "https://cal.com/docs/api-reference/v2/bookings/update-booking-location-for-an-existing-booking"
tags: [cal-com, docs]
---
# Update booking location for an existing booking

Copy page

**Current Limitation:** Updating a booking location will update the location in Cal.com, but the corresponding Calendar event will not be updated automatically. The old location will persist in the Calendar event. This is a known limitation that will be addressed in a future update.

The cal-api-version header is required for this endpoint. Without it, the request will fail with a 404 error.

If accessed using an OAuth access token, the `BOOKING_WRITE` scope is required.

Copy page

PATCH

/

v2

/

bookings

/

{bookingUid}

/

location

Try it

Update booking location for an existing booking

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/bookings/{bookingUid}/location \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "location": {
    "type": "address",
    "address": "123 Example St, City, Country"
  }
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

#### Body

application/json

location

object

One of the event type locations. If instead of passing one of the location objects as required by schema you are still passing a string please use an object.

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 
*   Option 5 
*   Option 6 

Show child attributes

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

[[docs-api-reference-v2-bookings-get-video-meeting-sessions-only-supported-for-cal-video|Get Video Meeting Sessions. Only supported for Cal Video]][[docs-api-reference-v2-bookings-attendees-get-all-attendees-for-a-booking|Get all attendees for a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
