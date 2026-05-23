---
title: "Get all bookings for an organization user"
source: "https://cal.com/docs/api-reference/v2/orgs-users-bookings/get-all-bookings-for-an-organization-user"
tags: [cal-com, docs]
---
Get all bookings for an organization user

Bookings

If accessed using an OAuth access token, the `ORG_BOOKING_READ` scope is required.

Authorization

string

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

orgId

number

required

userId

number

required

status

enum<string>[]

Filter bookings by status. If you want to filter by multiple statuses, separate them with a comma.

Available options

:

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

Available options

:

`asc`,

`desc`

Example:

`"?sortStart=asc OR ?sortStart=desc"`

sortEnd

enum<string>

Sort results by their end time in ascending or descending order.

Available options

:

`asc`,

`desc`

Example:

`"?sortEnd=asc OR ?sortEnd=desc"`

sortCreated

enum<string>

Sort results by their creation time (when booking was made) in ascending or descending order.

Available options

:

`asc`,

`desc`

Example:

`"?sortCreated=asc OR ?sortCreated=desc"`

sortUpdatedAt

enum<string>

Sort results by their updated time (for example when booking status changes) in ascending or descending order.

Available options

:

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

#### Response

200 - undefined

Was this page helpful?

[[docs-api-reference-v2-orgs-users-delete-a-user|Delete a user]][[docs-api-reference-v2-orgs-users-ooo-get-all-out-of-office-entries-for-a-user|Get all out-of-office entries for a user]]
