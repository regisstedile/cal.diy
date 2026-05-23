---
title: "Update a team event type"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types/update-a-team-event-type"
tags: [cal-com, docs]
---
# Update a team event type

Copy page

Required membership role: `team admin`. PBAC permission: `eventType.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

organizations

/

{orgId}

/

teams

/

{teamId}

/

event-types

/

{eventTypeId}

Try it

Update a team event type

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "lengthInMinutes": 60,
  "lengthInMinutesOptions": [
    15,
    30,
    60
  ],
  "title": "Learn the secrets of masterchief!",
  "slug": "learn-the-secrets-of-masterchief",
  "description": "Discover the culinary wonders of the Argentina by making the best flan ever!",
  "bookingFields": [
    {
      "type": "name",
      "label": "<string>",
      "placeholder": "<string>",
      "disableOnPrefill": true
    }
  ],
  "disableGuests": true,
  "slotInterval": 123,
  "minimumBookingNotice": 123,
  "beforeEventBuffer": 123,
  "afterEventBuffer": 123,
  "scheduleId": 123,
  "bookingLimitsCount": {
    "day": 1,
    "week": 2,
    "month": 3,
    "year": 4
  },
  "bookerActiveBookingsLimit": {
    "maximumActiveBookings": 3,
    "offerReschedule": true
  },
  "onlyShowFirstAvailableSlot": true,
  "bookingLimitsDuration": {
    "day": 60,
    "week": 120,
    "month": 180,
    "year": 240
  },
  "bookingWindow": {
    "type": "businessDays",
    "value": 5,
    "rolling": true
  },
  "offsetStart": 123,
  "confirmationPolicy": {
    "type": "always",
    "blockUnconfirmedBookingsInBooker": true
  },
  "recurrence": {
    "interval": 10,
    "occurrences": 10,
    "frequency": "yearly"
  },
  "requiresBookerEmailVerification": true,
  "hideCalendarNotes": true,
  "lockTimeZoneToggleOnBookingPage": true,
  "seats": {
    "seatsPerTimeSlot": 4,
    "showAttendeeInfo": true,
    "showAvailabilityCount": true
  },
  "customName": "{Event type title} between {Organiser} and {Scheduler}",
  "useDestinationCalendarEmail": true,
  "hideCalendarEventDetails": true,
  "successRedirectUrl": "https://masterchief.com/argentina/flan/video/9129412",
  "hideOrganizerEmail": true,
  "calVideoSettings": {
    "disableRecordingForOrganizer": true,
    "disableRecordingForGuests": true,
    "redirectUrlOnExit": "<string>",
    "enableAutomaticRecordingForOrganizer": true,
    "enableAutomaticTranscription": true,
    "disableTranscriptionForGuests": true,
    "disableTranscriptionForOrganizer": true,
    "sendTranscriptionEmails": true
  },
  "hidden": true,
  "bookingRequiresAuthentication": false,
  "disableCancelling": {
    "disabled": true
  },
  "disableRescheduling": {
    "disabled": false,
    "minutesBefore": 60
  },
  "interfaceLanguage": "",
  "allowReschedulingPastBookings": false,
  "allowReschedulingCancelledBookings": false,
  "showOptimizedSlots": false,
  "schedulingType": "collective",
  "hosts": [
    {
      "userId": 123,
      "mandatory": true,
      "priority": "lowest"
    }
  ],
  "assignAllTeamMembers": true,
  "locations": [
    {
      "type": "address",
      "address": "123 Example St, City, Country",
      "public": true
    }
  ],
  "emailSettings": {
    "disableEmailsToAttendees": true,
    "disableEmailsToHosts": true
  },
  "rescheduleWithSameRoundRobinHost": true
}
'
```

200

```
{
  "status": "success",
  "data": {
    "id": 1,
    "lengthInMinutes": 60,
    "title": "Learn the secrets of masterchief!",
    "slug": "learn-the-secrets-of-masterchief",
    "description": "Discover the culinary wonders of Argentina by making the best flan ever!",
    "locations": [
      {
        "type": "address",
        "address": "123 Example St, City, Country",
        "public": true
      }
    ],
    "bookingFields": [
      {
        "type": "name",
        "label": "<string>",
        "placeholder": "<string>",
        "isDefault": true,
        "slug": "name",
        "required": true,
        "disableOnPrefill": true
      }
    ],
    "disableGuests": true,
    "recurrence": {
      "interval": 10,
      "occurrences": 10,
      "frequency": "yearly"
    },
    "metadata": {},
    "price": 123,
    "currency": "<string>",
    "lockTimeZoneToggleOnBookingPage": true,
    "forwardParamsSuccessRedirect": true,
    "successRedirectUrl": "<string>",
    "isInstantEvent": true,
    "scheduleId": 123,
    "hidden": true,
    "bookingRequiresAuthentication": true,
    "teamId": 123,
    "bookingUrl": "https://cal.com/team/acme/30min",
    "hosts": [
      {
        "userId": 123,
        "name": "John Doe",
        "username": "john-doe",
        "mandatory": true,
        "priority": "lowest",
        "avatarUrl": "https://cal.com/api/avatar/d95949bc-ccb1-400f-acf6-045c51a16856.png"
      }
    ],
    "schedulingType": "roundRobin",
    "team": {
      "id": 123,
      "slug": "<string>",
      "bannerUrl": "<string>",
      "name": "<string>",
      "logoUrl": "<string>",
      "weekStart": "<string>",
      "brandColor": "<string>",
      "darkBrandColor": "<string>",
      "theme": "<string>"
    },
    "lengthInMinutesOptions": [
      15,
      30,
      60
    ],
    "slotInterval": 60,
    "minimumBookingNotice": 0,
    "beforeEventBuffer": 0,
    "afterEventBuffer": 0,
    "seatsPerTimeSlot": 123,
    "seatsShowAvailabilityCount": true,
    "bookingLimitsCount": {
      "day": 1,
      "week": 2,
      "month": 3,
      "year": 4
    },
    "bookerActiveBookingsLimit": {
      "maximumActiveBookings": 3,
      "offerReschedule": true
    },
    "onlyShowFirstAvailableSlot": true,
    "bookingLimitsDuration": {
      "day": 60,
      "week": 120,
      "month": 180,
      "year": 240
    },
    "bookingWindow": [
      {
        "type": "businessDays",
        "value": 5,
        "rolling": true
      }
    ],
    "bookerLayouts": {
      "defaultLayout": "month",
      "enabledLayouts": [
        "month"
      ]
    },
    "confirmationPolicy": {
      "type": "always",
      "blockUnconfirmedBookingsInBooker": true,
      "noticeThreshold": {
        "unit": "minutes",
        "count": 30
      }
    },
    "requiresBookerEmailVerification": true,
    "hideCalendarNotes": true,
    "color": {
      "lightThemeHex": "#292929",
      "darkThemeHex": "#fafafa"
    },
    "seats": {
      "seatsPerTimeSlot": 4,
      "showAttendeeInfo": true,
      "showAvailabilityCount": true
    },
    "offsetStart": 123,
    "customName": "<string>",
    "destinationCalendar": {
      "integration": "<string>",
      "externalId": "<string>"
    },
    "useDestinationCalendarEmail": true,
    "hideCalendarEventDetails": true,
    "hideOrganizerEmail": true,
    "calVideoSettings": {
      "disableRecordingForOrganizer": true,
      "disableRecordingForGuests": true,
      "redirectUrlOnExit": "<string>",
      "enableAutomaticRecordingForOrganizer": true,
      "enableAutomaticTranscription": true,
      "disableTranscriptionForGuests": true,
      "disableTranscriptionForOrganizer": true,
      "sendTranscriptionEmails": true
    },
    "disableCancelling": {
      "disabled": true
    },
    "disableRescheduling": {
      "disabled": true,
      "minutesBefore": 60
    },
    "interfaceLanguage": "<string>",
    "allowReschedulingPastBookings": true,
    "allowReschedulingCancelledBookings": true,
    "showOptimizedSlots": true,
    "ownerId": 123,
    "parentEventTypeId": 123,
    "assignAllTeamMembers": true,
    "emailSettings": {
      "disableEmailsToAttendees": true,
      "disableEmailsToHosts": true
    },
    "rescheduleWithSameRoundRobinHost": true
  }
}
```

#### Headers

Authorization

string

For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

teamId

number

required

eventTypeId

number

required

orgId

number

required

#### Body

application/json

lengthInMinutes

number

Example:

`60`

lengthInMinutesOptions

number[]

If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.

Example:

`[15, 30, 60]`

title

string

Example:

`"Learn the secrets of masterchief!"`

slug

string

Example:

`"learn-the-secrets-of-masterchief"`

description

string

Example:

`"Discover the culinary wonders of the Argentina by making the best flan ever!"`

bookingFields

object[]

Complete set of booking form fields. This array replaces all existing booking fields. To modify existing fields, first fetch the current event type, then include all desired fields in this array. Sending only one field will remove all other custom fields, keeping only default fields plus the provided one.

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 
*   Option 5 
*   Option 6 
*   Option 7 
*   Option 8 
*   Option 9 
*   Option 10 
*   Option 11 
*   Option 12 
*   Option 13 
*   Option 14 
*   Option 15 
*   Option 16 
*   Option 17 
*   Option 18 
*   Option 19 

Show child attributes

disableGuests

boolean

If true, person booking this event can't add guests via their emails.

slotInterval

number

Number representing length of each slot when event is booked. By default it equal length of the event type. If event length is 60 minutes then we would have slots 9AM, 10AM, 11AM etc. but if it was changed to 30 minutes then we would have slots 9AM, 9:30AM, 10AM, 10:30AM etc. as the available times to book the 60 minute event.

minimumBookingNotice

number

Minimum number of minutes before the event that a booking can be made.

beforeEventBuffer

number

Extra time automatically blocked on your calendar before a meeting starts. This gives you time to prepare, review notes, or transition from your previous activity.

afterEventBuffer

number

Extra time automatically blocked on your calendar after a meeting ends. This gives you time to wrap up, add notes, or decompress before your next commitment.

scheduleId

number

If you want that this event has different schedule than user's default one you can specify it here.

bookingLimitsCount

object

Limit how many times this event can be booked

*   Option 1 
*   Option 2 

Show child attributes

bookerActiveBookingsLimit

object

Limit the number of active bookings a booker can make for this event type.

*   Option 1 
*   Option 2 

Show child attributes

onlyShowFirstAvailableSlot

boolean

This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.

bookingLimitsDuration

object

Limit total amount of time that this event can be booked

*   Option 1 
*   Option 2 

Show child attributes

bookingWindow

object

Limit how far in the future this event can be booked

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 

Show child attributes

offsetStart

number

Offset timeslots shown to bookers by a specified number of minutes

bookerLayouts

object

Should booker have week, month or column view. Specify default layout and enabled layouts user can pick.

Show child attributes

confirmationPolicy

object

Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.

*   Option 1 
*   Option 2 

Show child attributes

recurrence

object

Create a recurring event type.

*   Option 1 
*   Option 2 

Show child attributes

requiresBookerEmailVerification

boolean

hideCalendarNotes

boolean

lockTimeZoneToggleOnBookingPage

boolean

color

object

Show child attributes

seats

object

Create an event type with multiple seats.

*   Option 1 
*   Option 2 

Show child attributes

customName

string

Customizable event name with valid variables: {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, {HOST/ATTENDEE}, {HOST}, {ATTENDEE}, {USER}

Example:

`"{Event type title} between {Organiser} and {Scheduler}"`

destinationCalendar

object

Show child attributes

useDestinationCalendarEmail

boolean

hideCalendarEventDetails

boolean

successRedirectUrl

string

A valid URL where the booker will redirect to, once the booking is completed successfully

Example:

`"https://masterchief.com/argentina/flan/video/9129412"`

hideOrganizerEmail

boolean

Boolean to Hide organizer's email address from the booking screen, email notifications, and calendar events

calVideoSettings

object

Cal video settings for the event type

Show child attributes

hidden

boolean

bookingRequiresAuthentication

boolean

default:false

Boolean to require authentication for booking this event type via api. If true, only authenticated users who are the event-type owner or org/team admin/owner can book this event type.

disableCancelling

object

Settings for disabling cancelling of this event type.

Show child attributes

Example:

`{ "disabled": true }`

disableRescheduling

object

Settings for disabling rescheduling of this event type. Can be always disabled or disabled when less than X minutes before the meeting.

Show child attributes

Example:

`{ "disabled": false, "minutesBefore": 60 }`

interfaceLanguage

enum<string>

Set preferred language for the booking interface. Use empty string for visitor's browser language (default).

Available options:

,

`en`,

`ar`,

`az`,

`bg`,

`bn`,

`ca`,

`cs`,

`da`,

`de`,

`el`,

`es`,

`es-419`,

`eu`,

`et`,

`fi`,

`fr`,

`he`,

`hu`,

`it`,

`ja`,

`km`,

`ko`,

`nl`,

`no`,

`pl`,

`pt-BR`,

`pt`,

`ro`,

`ru`,

`sk-SK`,

`sr`,

`sv`,

`tr`,

`uk`,

`vi`,

`zh-CN`,

`zh-TW`

allowReschedulingPastBookings

boolean

default:false

Enabling this option allows for past events to be rescheduled.

allowReschedulingCancelledBookings

boolean

default:false

When enabled, users will be able to create a new booking when trying to reschedule a cancelled booking.

showOptimizedSlots

boolean

default:false

Arrange time slots to optimize availability.

schedulingType

enum<string>

The scheduling type for the team event - collective or roundRobin. ❗If you change scheduling type you must also provide `hosts` or `assignAllTeamMembers` in the request body, otherwise the event type will have no hosts - this is required because in case of collective event type all hosts are mandatory but in case of round robin some or non can be mandatory so we can't predict how you want the hosts to be setup which is why you must provide that information. If you want to convert round robin or collective into managed or managed into round robin or collective then you will have to create a new team event type and delete old one.

Available options:

`collective`,

`roundRobin`

Example:

`"collective"`

hosts

object[]

Hosts contain specific team members you want to assign to this event type, but if you want to assign all team members, use `assignAllTeamMembers: true` instead and omit this field. For platform customers the hosts can include userIds only of managed users. Provide either hosts or assignAllTeamMembers but not both

Show child attributes

assignAllTeamMembers

boolean

If true, all current and future team members will be assigned to this event type. Provide either assignAllTeamMembers or hosts but not both

locations

object[]

Locations where the event will take place. If not provided, cal video link will be used as the location. Note: Setting a location to a conferencing app does not install the app - the app must already be installed. Via API, only Google Meet (google-meet), Microsoft Teams (office365-video), and Zoom (zoom) can be installed. Cal Video (cal-video) is installed by default. All other conferencing apps must be connected via the Cal.com web app and are not available for Platform plan customers. You can only set an event type location to an app that has already been installed or connected.

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 
*   Option 5 
*   Option 6 
*   Option 7 
*   Option 8 

Show child attributes

emailSettings

object

Email settings for this event type. Only available for organization team event types.

Show child attributes

rescheduleWithSameRoundRobinHost

boolean

Rescheduled events will be assigned to the same host as initially scheduled.

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

*   object 
*   object[] 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-event-types-get-an-event-type|Get an event type]][[docs-api-reference-v2-orgs-teams-event-types-delete-a-team-event-type|Delete a team event type]]
