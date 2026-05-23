---
title: "Add guests to an existing booking"
source: "https://cal.com/docs/api-reference/v2/bookings-guests/add-guests-to-an-existing-booking"
tags: [cal-com, docs]
---
# Add guests to an existing booking

Copy page

Add one or more guests to an existing booking. Maximum 10 guests per request, with a limit of 30 total guests per booking.

**Rate Limiting:** This endpoint is rate limited to 5 requests per minute to prevent abuse.

**Email Notifications:** When guests are added, the following notifications are sent (unless disabled by event type settings):

*   **Organizer & Team Members:** Receive an “Add Guests” notification email informing them that new guests have been added to the booking.

*   **New Guests:** Receive a “Scheduled Event” email with full booking details and calendar invite. If they have a phone number, they also receive an SMS notification.

*   **Existing Guests:** Receive an “Add Guests” notification email informing them that additional guests have been added to the booking.

The cal-api-version header is required for this endpoint. Without it, the request will fail with a 404 error.

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

guests

Try it

Add guests to an existing booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/guests \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "guests": [
    {
      "email": "john.doe@example.com",
      "name": "John Doe",
      "timeZone": "America/New_York"
    },
    {
      "email": "jane.smith@example.com",
      "name": "Jane Smith"
    }
  ]
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

guests

object[]

required

Array of guests to add to the booking. Maximum 10 guests per request.

Show child attributes

Example:

`[  {    "email": "john.doe@example.com",    "name": "John Doe",    "timeZone": "America/New_York"  },  {    "email": "jane.smith@example.com",    "name": "Jane Smith"  }]`

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

[[docs-api-reference-v2-bookings-attendees-get-a-specific-attendee-for-a-booking|Get a specific attendee for a booking]][[docs-api-reference-v2-schedules-create-a-schedule|Create a schedule]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
