---
title: "Create a webhook"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-webhooks/create-a-webhook"
tags: [cal-com, docs]
---
# Create a webhook

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

POST

/

v2

/

oauth-clients

/

{clientId}

/

webhooks

Try it

Create a webhook

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/webhooks \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --header 'x-cal-secret-key: <x-cal-secret-key>' \
  --data '
{
  "active": true,
  "subscriberUrl": "<string>",
  "triggers": [
    "BOOKING_CREATED",
    "BOOKING_RESCHEDULED",
    "BOOKING_CANCELLED",
    "BOOKING_CONFIRMED",
    "BOOKING_REJECTED",
    "BOOKING_COMPLETED",
    "BOOKING_NO_SHOW",
    "BOOKING_REOPENED"
  ],
  "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
  "secret": "<string>",
  "version": "2021-10-20"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
    "triggers": [
      "BOOKING_CREATED"
    ],
    "oAuthClientId": "<string>",
    "id": 123,
    "subscriberUrl": "<string>",
    "active": true,
    "secret": "<string>"
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

x-cal-secret-key

string

required

OAuth client secret key

#### Path Parameters

clientId

string

required

#### Body

application/json

active

boolean

required

subscriberUrl

string

required

triggers

enum<string>[]

required

Available options:

`BOOKING_CREATED`,

`BOOKING_PAYMENT_INITIATED`,

`BOOKING_PAID`,

`BOOKING_RESCHEDULED`,

`BOOKING_REQUESTED`,

`BOOKING_CANCELLED`,

`BOOKING_REJECTED`,

`BOOKING_NO_SHOW_UPDATED`,

`FORM_SUBMITTED`,

`MEETING_ENDED`,

`MEETING_STARTED`,

`RECORDING_READY`,

`INSTANT_MEETING`,

`INSTANT_MEETING_ACCEPTED`,

`RECORDING_TRANSCRIPTION_GENERATED`,

`OOO_CREATED`,

`AFTER_HOSTS_CAL_VIDEO_NO_SHOW`,

`AFTER_GUESTS_CAL_VIDEO_NO_SHOW`,

`FORM_SUBMITTED_NO_EVENT`,

`ROUTING_FORM_FALLBACK_HIT`,

`DELEGATION_CREDENTIAL_ERROR`,

`WRONG_ASSIGNMENT_REPORT`

Example:

`[  "BOOKING_CREATED",  "BOOKING_RESCHEDULED",  "BOOKING_CANCELLED",  "BOOKING_CONFIRMED",  "BOOKING_REJECTED",  "BOOKING_COMPLETED",  "BOOKING_NO_SHOW",  "BOOKING_REOPENED"]`

payloadTemplate

string

The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information

Example:

`"{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}"`

secret

string

version

enum<string>

The version of the webhook

Available options:

`2021-10-20`

Example:

`"2021-10-20"`

#### Response

201 - application/json

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

[[docs-api-reference-v2-deprecated-platform-managed-users-refresh-managed-user-tokens|Refresh managed user tokens]][[docs-api-reference-v2-deprecated-platform-webhooks-get-all-webhooks|Get all webhooks]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
