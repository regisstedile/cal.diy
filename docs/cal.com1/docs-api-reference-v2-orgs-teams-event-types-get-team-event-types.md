---
title: "Get team event types"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types/get-team-event-types"
tags: [cal-com, docs]
---
# Get team event types

Copy page

Use the optional `sortCreatedAt` query parameter to order results by creation date (by ID). Accepts “asc” (oldest first) or “desc” (newest first). When not provided, no explicit ordering is applied.

Copy page

GET

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

Try it

Get team event types

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types
```

200

```
{
  "status": "success",
  "data": [
    {
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
  ]
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

orgId

number

required

#### Query Parameters

eventSlug

string

Slug of team event type to return.

hostsLimit

number

Specifies the maximum number of hosts to include in the response. This limit helps optimize performance. If not provided, all Hosts will be fetched.

sortCreatedAt

enum<string>

Sort event types by creation date. When not provided, no explicit ordering is applied.

Available options:

`asc`,

`desc`

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

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-event-types-create-an-event-type|Create an event type]][[docs-api-reference-v2-orgs-teams-event-types-get-an-event-type|Get an event type]]
