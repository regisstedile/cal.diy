---
title: "Create a webhook"
source: "https://cal.com/docs/api-reference/v2/orgs-webhooks/create-a-webhook"
tags: [cal-com, docs]
---
# Create a webhook

Copy page

Required membership role: `org admin`. PBAC permission: `webhook.create`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_WEBHOOK_WRITE` scope is required.

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

webhooks

Try it

Create a webhook

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/webhooks \
  --header 'Content-Type: application/json' \
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
    "teamId": 123,
    "id": 123,
    "subscriberUrl": "<string>",
    "active": true,
    "secret": "<string>"
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

orgId

number

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

[[docs-api-reference-v2-orgs-webhooks-get-all-webhooks|Get all webhooks]][[docs-api-reference-v2-orgs-webhooks-get-a-webhook|Get a webhook]]
