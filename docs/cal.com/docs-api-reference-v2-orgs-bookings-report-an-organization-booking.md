---
title: "Report an organization booking"
source: "https://cal.com/docs/api-reference/v2/orgs-bookings/report-an-organization-booking"
tags: [cal-com, docs]
---
# Report an organization booking

Copy page

Report a booking within the organization. A booking report is created and the reported booking along with other matching upcoming bookings are silently cancelled. If accessed using an OAuth access token, the `ORG_BOOKING_WRITE` scope is required.

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

bookings

/

report

Try it

Report an organization booking

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/bookings/report \
  --header 'Content-Type: application/json' \
  --data '
{
  "bookingUid": "booking-uid-123",
  "reason": "SPAM",
  "reportType": "EMAIL",
  "description": "<string>"
}
'
```

200

```
{
  "status": "success",
  "data": {
    "success": true,
    "message": "Booking reported and cancelled successfully",
    "bookingUid": "booking-uid-123",
    "reportedCount": 1,
    "cancelledCount": 3
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

#### Body

application/json

bookingUid

string

required

The UID of the booking to report

Example:

`"booking-uid-123"`

reason

enum<string>

required

The reason for reporting the booking

Available options:

`SPAM`,

`DONT_KNOW_PERSON`,

`OTHER`

Example:

`"SPAM"`

reportType

enum<string>

required

Whether to report by email or domain. EMAIL targets the specific booker email. DOMAIN targets all emails from the same domain.

Available options:

`EMAIL`,

`DOMAIN`

Example:

`"EMAIL"`

description

string

Additional description for the report

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

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-bookings-block-an-organization-booking-attendee|Block an organization booking attendee]][[docs-api-reference-v2-orgs-delegation-credentials-save-delegation-credentials-for-your-organization|Save delegation credentials for your organization]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
