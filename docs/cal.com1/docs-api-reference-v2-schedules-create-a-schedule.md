---
title: "Create a schedule"
source: "https://cal.com/docs/api-reference/v2/schedules/create-a-schedule"
tags: [cal-com, docs]
---
Create a schedule

Schedules

Create a schedule for the authenticated user.

The point of creating schedules is for event types to be available at specific times.

The first goal of schedules is to have a default schedule. If you are platform customer and created managed users, then it is important to note that each managed user should have a default schedule.

1.   If you passed `timeZone` when creating managed user, then the default schedule from Monday to Friday from 9AM to 5PM will be created with that timezone. The managed user can then change the default schedule via the `AvailabilitySettings` atom.
2.   If you did not, then we assume you want the user to have this specific schedule right away. You should create a default schedule by specifying `"isDefault": true` in the request body. Until the user has a default schedule the user can’t be booked nor manage their schedule via the AvailabilitySettings atom.

The second goal of schedules is to create another schedule that event types can point to. This is useful for when an event is booked because availability is not checked against the default schedule but instead against that specific schedule. After creating a non-default schedule, you can update an event type to point to that schedule via the PATCH `event-types/{eventTypeId}` endpoint.

When specifying start time and end time for each day use the 24 hour format e.g. 08:00, 15:00 etc.

If accessed using an OAuth access token, the `SCHEDULE_WRITE` scope is required.

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

cal-api-version

string

default:2024-06-11

required

Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.

#### Body

application/json

name

string

required

Example:

`"Catch up hours"`

timeZone

string

required

Timezone is used to calculate available times when an event using the schedule is booked.

Example:

`"Europe/Rome"`

isDefault

boolean

required

Each user should have 1 default schedule. If you specified `timeZone` when creating managed user, then the default schedule will be created with that timezone. Default schedule means that if an event type is not tied to a specific schedule then the default schedule is used.

Example:

`true`

availability

object[]

Each object contains days and times when the user is available. If not passed, the default availability is Monday to Friday from 09:00 to 17:00.

Show child attributes

Example:

`[  {    "days": ["Monday", "Tuesday"],    "startTime": "17:00",    "endTime": "19:00"  },  {    "days": ["Wednesday", "Thursday"],    "startTime": "16:00",    "endTime": "20:00"  }]`

overrides

object[]

Need to change availability for a specific date? Add an override.

Show child attributes

Example:

`[  {    "date": "2024-05-20",    "startTime": "18:00",    "endTime": "21:00"  }]`

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

Show child attributes

Was this page helpful?

[[docs-api-reference-v2-bookings-guests-add-guests-to-an-existing-booking|Add guests to an existing booking]][[docs-api-reference-v2-schedules-get-all-schedules|Get all schedules]]
