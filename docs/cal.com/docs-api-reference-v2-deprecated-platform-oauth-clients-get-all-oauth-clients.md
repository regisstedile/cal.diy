---
title: "Get all OAuth clients"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-oauth-clients/get-all-oauth-clients"
tags: [cal-com, docs]
---
# Get all OAuth clients

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

GET

/

v2

/

oauth-clients

Try it

Get all OAuth clients

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/oauth-clients \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "clsx38nbl0001vkhlwin9fmt0",
      "name": "MyClient",
      "secret": "secretValue",
      "permissions": [
        "BOOKING_READ",
        "BOOKING_WRITE"
      ],
      "redirectUris": [
        "https://example.com/callback"
      ],
      "organizationId": 1,
      "createdAt": "2024-03-23T08:33:21.851Z",
      "areEmailsEnabled": true,
      "areDefaultEventTypesEnabled": true,
      "areCalendarEventsEnabled": true,
      "logo": "https://example.com/logo.png",
      "bookingRedirectUri": "https://example.com/booking-redirect",
      "bookingCancelRedirectUri": "https://example.com/booking-cancel",
      "bookingRescheduleRedirectUri": "https://example.com/booking-reschedule"
    }
  ]
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

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

[[docs-api-reference-v2-deprecated-platform-oauth-clients-create-an-oauth-client|Create an OAuth client]][[docs-api-reference-v2-deprecated-platform-oauth-clients-get-an-oauth-client|Get an OAuth client]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
