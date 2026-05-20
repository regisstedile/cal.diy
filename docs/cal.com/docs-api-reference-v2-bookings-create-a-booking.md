---
title: "Create a booking"
source: "https://cal.com/docs/api-reference/v2/bookings/create-a-booking"
tags: [cal-com, docs]
---
Create a booking

Bookings

POST /v2/bookings is used to create regular bookings, recurring bookings and instant bookings. The request bodies for all 3 are almost the same except: If eventTypeId in the request body is id of a regular event, then regular booking is created.

If it is an id of a recurring event type, then recurring booking is created.

Meaning that the request bodies are equal but the outcome depends on what kind of event type it is with the goal of making it as seamless for developers as possible.

For team event types it is possible to create instant meeting. To do that just pass `"instant": true` to the request body.

The start needs to be in UTC aka if the timezone is GMT+2 in Rome and meeting should start at 11, then UTC time should have hours 09:00 aka without time zone.

Finally, there are 2 ways to book an event type belonging to an individual user:

1.   Provide `eventTypeId` in the request body.
2.   Provide `eventTypeSlug` and `username` and optionally `organizationSlug` if the user with the username is within an organization.

And 2 ways to book and event type belonging to a team:

1.   Provide `eventTypeId` in the request body.
2.   Provide `eventTypeSlug` and `teamSlug` and optionally `organizationSlug` if the team with the teamSlug is within an organization.

If you are creating a seated booking for an event type with ‘show attendees’ disabled, then to retrieve attendees in the response either set ‘show attendees’ to true on event type level or you have to provide an authentication method of event type owner, host, team admin or owner or org admin or owner.

For event types that have SMS reminders workflow, you need to pass the attendee’s phone number in the request body via `attendee.phoneNumber` (e.g., “+19876543210” in international format). This is an optional field, but becomes required when SMS reminders are enabled for the event type. For the complete attendee object structure, see the  documentation.

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

#### Body

application/json

Accepts different types of booking input: Create Booking (Option 1), Create Instant Booking (Option 2), or Create Recurring Booking (Option 3)

*   Option 1

*   Option 2

*   Option 3

start

string<date-time>

required

The start time of the booking in ISO 8601 format in UTC timezone.

Example:

`"2024-08-13T09:00:00Z"`

attendee

object

required

The attendee's details.

Show child attributes

bookingFieldsResponses

object

Booking field responses consisting of an object with booking field slug as keys and user response as values for custom booking fields added by you.

Example:

`{ "customField": "customValue" }`

eventTypeId

number

The ID of the event type that is booked. Required unless eventTypeSlug and username are provided as an alternative to identifying the event type.

Example:

`123`

eventTypeSlug

string

The slug of the event type. Required along with username / teamSlug and optionally organizationSlug if eventTypeId is not provided.

Example:

`"my-event-type"`

username

string

The username of the event owner. Required along with eventTypeSlug and optionally organizationSlug if eventTypeId is not provided.

Example:

`"john-doe"`

teamSlug

string

Team slug for team that owns event type for which slots are fetched. Required along with eventTypeSlug and optionally organizationSlug if the team is part of organization

Example:

`"john-doe"`

organizationSlug

string

The organization slug. Optional, only used when booking with eventTypeSlug + username or eventTypeSlug + teamSlug.

Example:

`"acme-corp"`

guests

string[]

An optional list of guest emails attending the event.

Example:

`["guest1@example.com", "guest2@example.com"]`

meetingUrl

string

deprecated

Deprecated - use 'location' instead. Meeting URL just for this booking. Displayed in email and calendar event. If not provided then cal video link will be generated.

Example:

`"https://example.com/meeting"`

location

object

One of the event type locations. If instead of passing one of the location objects as required by schema you are still passing a string please use an object.

*   Option 1

*   Option 2

*   Option 3

*   Option 4

*   Option 5

*   Option 6

*   Option 7

*   Option 8

Show child attributes

metadata

object

You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and string values up to 500 characters.

Example:

`{ "key": "value" }`

lengthInMinutes

number

If it is an event type that has multiple possible lengths that attendee can pick from, you can pass the desired booking length here. If not provided then event type default length will be used for the booking.

Example:

`30`

routing

object

Routing information from routing forms that determined the booking assignment. Both responseId and teamMemberIds are required if provided.

Show child attributes

Example:

`{  "responseId": 123,  "teamMemberIds": [101, 102]}`

emailVerificationCode

string

Email verification code required when event type has email verification enabled.

Example:

`"123456"`

allowConflicts

boolean

When true and the authenticated user is a host of the event type, availability conflict checks are bypassed. If the user is not a host or is unauthenticated, this parameter is silently ignored.

Example:

`true`

allowBookingOutOfBounds

boolean

When true and the authenticated user is a host of the event type, booking time out-of-bounds checks are bypassed allowing bookings outside the normally permitted scheduling window. If the user is not a host or is unauthenticated, this parameter is silently ignored. Only supported on the 2026-02-25 API version.

Example:

`true`

#### Response

201 - application/json

status

enum<string>

required

Available options

:

`success`,

`error`

Example:

`"success"`

data

object

required

Booking data, which can be either a BookingOutput object or an array of RecurringBookingOutput objects

*   Option 1 · object

*   Option 2 · object[]

*   Option 3 · object

*   Option 4 · object[]

Show child attributes

Was this page helpful?

[[docs-api-reference-v2-me-clear-my-booking-limits|Clear my booking limits]][[docs-api-reference-v2-bookings-get-all-bookings|Get all bookings]]
