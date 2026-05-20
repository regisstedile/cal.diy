---
title: "Get booking references"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-bookings/get-booking-references"
tags: [cal-com, docs]
---
# Get booking references

Copy page

Required membership role: `team admin`. PBAC permission: `booking.readTeamBookings`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_BOOKING_READ` scope is required.

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

bookings

/

{bookingUid}

/

references

Try it

Get booking references

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/bookings/{bookingUid}/references
```

200

```
{
  "status": "success",
  "data": [
    {
      "type": "<string>",
      "eventUid": "<string>",
      "destinationCalendarId": "<string>",
      "id": 123
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

bookingUid

string

required

teamId

number

required

orgId

number

required

#### Query Parameters

type

enum<string>

Filter booking references by type

Available options:

`google_calendar`,

`office365_calendar`,

`daily_video`,

`google_video`,

`office365_video`,

`zoom_video`

Example:

`"google_calendar"`

#### Response

200 - application/json

status

enum<string>

required

The status of the request, always 'success' for successful responses

Available options:

`success`,

`error`

Example:

`"success"`

data

object[]

required

Booking References

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-bookings-get-organization-team-bookings|Get organization team bookings]][[docs-api-reference-v2-orgs-teams-conferencing-connect-your-conferencing-application-to-a-team|Connect your conferencing application to a team]]
