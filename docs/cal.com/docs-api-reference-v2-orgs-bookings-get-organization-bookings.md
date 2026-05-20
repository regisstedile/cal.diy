---
title: "Get organization bookings"
source: "https://cal.com/docs/api-reference/v2/orgs-bookings/get-organization-bookings"
tags: [cal-com, docs]
---
# Get organization bookings

Copy page

Required membership role: `org admin`. PBAC permission: `booking.readOrgBookings`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_BOOKING_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

bookings

Try it

Get organization bookings

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/bookings?take=100'
```

200

```
{
  "status": "success",
  "data": [
    {
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
  ],
  "pagination": {
    "totalItems": 123,
    "remainingItems": 103,
    "returnedItems": 10,
    "itemsPerPage": 10,
    "currentPage": 2,
    "totalPages": 13,
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}
```

#### Headers

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

orgId

number

required

#### Query Parameters

status

enum<string>[]

Filter bookings by status. If you want to filter by multiple statuses, separate them with a comma.

Available options:

`upcoming`,

`recurring`,

`past`,

`cancelled`,

`unconfirmed`

Example:

`"?status=upcoming,past"`

attendeeEmail

string

Filter bookings by the attendee's email address.

Example:

`"example@domain.com"`

attendeeName

string

Filter bookings by the attendee's name.

Example:

`"John Doe"`

bookingUid

string

Filter bookings by the booking Uid.

Example:

`"2NtaeaVcKfpmSZ4CthFdfk"`

eventTypeIds

string

Filter bookings by event type ids belonging to the user. Event type ids must be separated by a comma.

Example:

`"?eventTypeIds=100,200"`

eventTypeId

string

Filter bookings by event type id belonging to the user.

Example:

`"?eventTypeId=100"`

teamsIds

string

Filter bookings by team ids that user is part of. Team ids must be separated by a comma.

Example:

`"?teamIds=50,60"`

teamId

string

Filter bookings by team id that user is part of

Example:

`"?teamId=50"`

afterStart

string

Filter bookings with start after this date string.

Example:

`"?afterStart=2025-03-07T10:00:00.000Z"`

beforeEnd

string

Filter bookings with end before this date string.

Example:

`"?beforeEnd=2025-03-07T11:00:00.000Z"`

afterCreatedAt

string

Filter bookings that have been created after this date string.

Example:

`"?afterCreatedAt=2025-03-07T10:00:00.000Z"`

beforeCreatedAt

string

Filter bookings that have been created before this date string.

Example:

`"?beforeCreatedAt=2025-03-14T11:00:00.000Z"`

afterUpdatedAt

string

Filter bookings that have been updated after this date string.

Example:

`"?afterUpdatedAt=2025-03-07T10:00:00.000Z"`

beforeUpdatedAt

string

Filter bookings that have been updated before this date string.

Example:

`"?beforeUpdatedAt=2025-03-14T11:00:00.000Z"`

sortStart

enum<string>

Sort results by their start time in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortStart=asc OR ?sortStart=desc"`

sortEnd

enum<string>

Sort results by their end time in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortEnd=asc OR ?sortEnd=desc"`

sortCreated

enum<string>

Sort results by their creation time (when booking was made) in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortCreated=asc OR ?sortCreated=desc"`

sortUpdatedAt

enum<string>

Sort results by their updated time (for example when booking status changes) in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortUpdated=asc OR ?sortUpdated=desc"`

take

number

default:100

The number of items to return

Example:

`10`

skip

number

default:0

The number of items to skip

Example:

`0`

userIds

string

Filter bookings by ids of users within your organization.

Example:

`"?userIds=100,200"`

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

Array of booking data, which can contain either BookingOutput objects or RecurringBookingOutput objects

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 

Show child attributes

pagination

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-attributes-options-unassign-an-attribute-from-a-user|Unassign an attribute from a user]][[docs-api-reference-v2-orgs-bookings-block-an-organization-booking-attendee|Block an organization booking attendee]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
