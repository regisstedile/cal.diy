---
title: "Create a phone call"
source: "https://cal.com/docs/api-reference/v2/teams-event-types/create-a-phone-call"
tags: [cal-com, docs]
---
# Create a phone call

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

Copy page

POST

/

v2

/

teams

/

{teamId}

/

event-types

/

{eventTypeId}

/

create-phone-call

Try it

Create a phone call

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams/{teamId}/event-types/{eventTypeId}/create-phone-call \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "yourPhoneNumber": "<string>",
  "numberToCall": "<string>",
  "calApiKey": "<string>",
  "enabled": true,
  "templateType": "CUSTOM_TEMPLATE",
  "schedulerName": "<string>",
  "guestName": "<string>",
  "guestEmail": "<string>",
  "guestCompany": "<string>",
  "beginMessage": "<string>",
  "generalPrompt": "<string>"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "callId": "<string>",
    "agentId": "<string>"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

teamId

number

required

eventTypeId

number

required

#### Body

application/json

yourPhoneNumber

string

required

Your phone number

Pattern: `/^\+[1-9]\d{1,14}$/`

numberToCall

string

required

Number to call

Pattern: `/^\+[1-9]\d{1,14}$/`

calApiKey

string

required

CAL API Key

enabled

boolean

default:true

required

Enabled status

templateType

enum<string>

default:CUSTOM_TEMPLATE

required

Template type

Available options:

`CHECK_IN_APPOINTMENT`,

`CUSTOM_TEMPLATE`

schedulerName

string

Scheduler name

guestName

string

Guest name

guestEmail

string

Guest email

guestCompany

string

Guest company

beginMessage

string

Begin message

generalPrompt

string

General prompt

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

[[docs-api-reference-v2-teams-event-types-delete-a-team-event-type|Delete a team event type]][[docs-api-reference-v2-teams-event-types-webhooks-create-a-webhook-for-a-team-event-type|Create a webhook for a team event type]]
