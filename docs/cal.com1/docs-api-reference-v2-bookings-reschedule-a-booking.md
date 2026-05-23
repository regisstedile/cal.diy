---
title: "Reschedule a booking"
source: "https://cal.com/docs/api-reference/v2/bookings/reschedule-a-booking"
tags: [cal-com, docs]
---
# Reschedule a booking

Copy page

Reschedule a booking or seated booking.

Reschedulable booking statuses:

*   `accepted` — the confirmed booking is moved to the new start time.
*   `pending` — a booking awaiting host confirmation can be rescheduled. The new booking stays `pending` until the host confirms or declines it.

Non-reschedulable booking statuses (endpoint responds with `400 Bad Request`):

*   `cancelled` — the booking has already been cancelled. If it was cancelled because it was previously rescheduled, the error message includes the UID of the booking it was rescheduled to.
*   `rejected` — the host declined the original confirmation-required request. Create a new booking instead.
*   `awaiting_host` — an instant meeting that is live and waiting for a host to join. Create a new booking instead.

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

Copy page

POST

/

v2

/

bookings

/

{bookingUid}

/

reschedule

Try it

Reschedule a booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/reschedule \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: 2026-02-25' \
  --data '
{
  "start": "2024-08-13T10:00:00Z",
  "rescheduledBy": "<string>",
  "reschedulingReason": "User requested reschedule",
  "emailVerificationCode": "123456"
}
'
```

201

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

bookingUid

string

required

#### Body

application/json

Accepts different types of reschedule booking input: Reschedule Booking (Option 1) or Reschedule Seated Booking (Option 2). If you're rescheduling a seated booking as org admin of booking host, pass booking input for Reschedule Booking (Option 1) along with your access token in the request header.

`If you are rescheduling a seated booking for an event type with 'show attendees' disabled, then to retrieve attendees in the response either set 'show attendees' to true on event type level or  you have to provide an authentication method of event type owner, host, team admin or owner or org admin or owner.`

*   Option 1 
*   Option 2 

start

string<date-time>

required

Start time in ISO 8601 format for the new booking

Example:

`"2024-08-13T10:00:00Z"`

rescheduledBy

string

Email of the person who is rescheduling the booking - only needed when rescheduling a booking that requires a confirmation. If event type owner email is provided then rescheduled booking will be automatically confirmed. If attendee email or no email is passed then the event type owner will have to confirm the rescheduled booking.

reschedulingReason

string

Reason for rescheduling the booking

Example:

`"User requested reschedule"`

emailVerificationCode

string

Email verification code required when event type has email verification enabled.

Example:

`"123456"`

#### Response

201 - application/json

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

Booking data, which can be either a BookingOutput object or a RecurringBookingOutput object

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-get-cal-video-real-time-transcript-download-links-for-the-booking|Get Cal Video real time transcript download links for the booking]][[docs-api-reference-v2-bookings-request-to-reschedule-a-booking|Request to reschedule a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)
