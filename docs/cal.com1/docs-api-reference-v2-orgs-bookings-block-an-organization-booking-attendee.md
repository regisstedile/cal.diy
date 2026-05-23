---
title: "Block an organization booking attendee"
source: "https://cal.com/docs/api-reference/v2/orgs-bookings/block-an-organization-booking-attendee"
tags: [cal-com, docs]
---
# Block an organization booking attendee

Copy page

Add the email or domain of a booking attendee to the organization blocklist. All matching upcoming bookings in the organization are silently cancelled. If accessed using an OAuth access token, the `ORG_BOOKING_WRITE` scope is required.

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

block

Try it

Block an organization booking attendee

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/bookings/block \
  --header 'Content-Type: application/json' \
  --data '
{
  "bookingUid": "booking-uid-123",
  "blockType": "EMAIL"
}
'
```

200

```
{
  "status": "success",
  "data": {
    "success": true,
    "message": "Added to blocklist and 3 bookings cancelled",
    "bookingUid": "booking-uid-123",
    "cancelledCount": 3,
    "blockedValue": "spammer@example.com"
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

The UID of the booking whose attendee should be blocked

Example:

`"booking-uid-123"`

blockType

enum<string>

required

Whether to block by email or domain. EMAIL blocks the specific booker email. DOMAIN blocks all emails from the same domain.

Available options:

`EMAIL`,

`DOMAIN`

Example:

`"EMAIL"`

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

[[docs-api-reference-v2-orgs-bookings-get-organization-bookings|Get organization bookings]][[docs-api-reference-v2-orgs-bookings-report-an-organization-booking|Report an organization booking]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
