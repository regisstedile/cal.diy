---
title: "Get an OAuth client"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-oauth-clients/get-an-oauth-client"
tags: [cal-com, docs]
---
# Get an OAuth client

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

GET

/

v2

/

oauth-clients

/

{clientId}

Try it

Get an OAuth client

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/oauth-clients/{clientId} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
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
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

clientId

string

required

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

[[docs-api-reference-v2-deprecated-platform-oauth-clients-get-all-oauth-clients|Get all OAuth clients]][[docs-api-reference-v2-deprecated-platform-oauth-clients-update-an-oauth-client|Update an OAuth client]]
