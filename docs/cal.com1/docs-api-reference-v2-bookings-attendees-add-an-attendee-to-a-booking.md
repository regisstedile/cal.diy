---
title: "Add an attendee to a booking"
source: "https://cal.com/docs/api-reference/v2/bookings-attendees/add-an-attendee-to-a-booking"
tags: [cal-com, docs]
---
# Add an attendee to a booking

Copy page

Add a new attendee to an existing booking by its UID.

**Side effects:**

*   The booking’s attendee list is updated in the database
*   The calendar event is updated on connected calendars (Google Calendar, Outlook, etc.) to include the new attendee
*   An email notification is sent to the new attendee with the booking details

**Permissions:**

*   The authenticated user must be either the booking organizer, an existing attendee, or have the `booking.update` permission for the team

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

attendees

Try it

Add an attendee to a booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/bookings/{bookingUid}/attendees \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
  --data '
{
  "name": "John Doe",
  "timeZone": "America/New_York",
  "email": "john.doe@example.com",
  "phoneNumber": "+919876543210",
  "language": "en"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "displayEmail": "john@example.com",
    "timeZone": "America/New_York",
    "absent": false,
    "id": 251,
    "bookingId": 313,
    "language": "en",
    "phoneNumber": "+1234567890"
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

name

string

required

The name of the attendee.

Example:

`"John Doe"`

timeZone

string

required

The time zone of the attendee.

Example:

`"America/New_York"`

email

string

required

The email of the attendee.

Example:

`"john.doe@example.com"`

phoneNumber

string

The phone number of the attendee in international format.

Example:

`"+919876543210"`

language

enum<string>

default:en

The preferred language of the attendee. Used for booking confirmation.

Available options:

`ar`,

`ca`,

`de`,

`es`,

`eu`,

`he`,

`id`,

`ja`,

`lv`,

`pl`,

`ro`,

`sr`,

`th`,

`vi`,

`az`,

`cs`,

`el`,

`es-419`,

`fi`,

`hr`,

`it`,

`km`,

`nl`,

`pt`,

`ru`,

`sv`,

`tr`,

`zh-CN`,

`bg`,

`da`,

`en`,

`et`,

`fr`,

`hu`,

`iw`,

`ko`,

`no`,

`pt-BR`,

`sk`,

`ta`,

`uk`,

`zh-TW`,

`bn`

Example:

`"it"`

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

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-bookings-attendees-get-all-attendees-for-a-booking|Get all attendees for a booking]][[docs-api-reference-v2-bookings-attendees-get-a-specific-attendee-for-a-booking|Get a specific attendee for a booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
