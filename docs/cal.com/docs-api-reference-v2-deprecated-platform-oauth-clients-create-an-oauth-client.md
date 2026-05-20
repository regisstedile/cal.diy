---
title: "Create an OAuth client"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-oauth-clients/create-an-oauth-client"
tags: [cal-com, docs]
---
# Create an OAuth client

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

POST

/

v2

/

oauth-clients

Try it

Create an OAuth client

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/oauth-clients \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "redirectUris": [
    "<string>"
  ],
  "permissions": [
    "EVENT_TYPE_READ"
  ],
  "logo": "<string>",
  "bookingRedirectUri": "<string>",
  "bookingCancelRedirectUri": "<string>",
  "bookingRescheduleRedirectUri": "<string>",
  "areEmailsEnabled": true,
  "areDefaultEventTypesEnabled": false,
  "areCalendarEventsEnabled": true
}
'
```

201

```
{
  "status": "success",
  "data": {
    "clientId": "clsx38nbl0001vkhlwin9fmt0",
    "clientSecret": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2F1dGgtY2xpZW50Iiwi"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Body

application/json

name

string

required

redirectUris

string[]

required

permissions

enum<string>[]

required

Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"]. Use ["*"] to grant all permissions.

Available options:

`EVENT_TYPE_READ`,

`EVENT_TYPE_WRITE`,

`BOOKING_READ`,

`BOOKING_WRITE`,

`SCHEDULE_READ`,

`SCHEDULE_WRITE`,

`APPS_READ`,

`APPS_WRITE`,

`PROFILE_READ`,

`PROFILE_WRITE`,

`*`

logo

string

bookingRedirectUri

string

bookingCancelRedirectUri

string

bookingRescheduleRedirectUri

string

areEmailsEnabled

boolean

areDefaultEventTypesEnabled

boolean

default:false

If true, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Set this as false if you want to create a managed user and then manually create event types for the user.

areCalendarEventsEnabled

boolean

default:true

If true and if managed user has calendar connected, calendar events will be created. Disable it if you manually create calendar events. Default to true.

#### Response

201 - application/json

Create an OAuth client

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

Example:

`{  "clientId": "clsx38nbl0001vkhlwin9fmt0",  "clientSecret": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2F1dGgtY2xpZW50Iiwi"}`

Was this page helpful?

Yes No

[[docs-api-reference-v2-managed-orgs-delete-an-organization-within-an-organization|Delete an organization within an organization]][[docs-api-reference-v2-deprecated-platform-oauth-clients-get-all-oauth-clients|Get all OAuth clients]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
