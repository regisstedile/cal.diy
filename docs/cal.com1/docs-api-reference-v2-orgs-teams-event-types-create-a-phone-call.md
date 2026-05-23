---
title: "Create a phone call"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-event-types/create-a-phone-call"
tags: [cal-com, docs]
---
# Create a phone call

Copy page

Required membership role: `team admin`. PBAC permission: `eventType.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

Copy page

POST

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

/

{eventTypeId}

/

create-phone-call

Try it

Create a phone call

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/event-types/{eventTypeId}/create-phone-call \
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

eventTypeId

number

required

orgId

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

[[docs-api-reference-v2-orgs-teams-event-types-delete-a-team-event-type|Delete a team event type]][[docs-api-reference-v2-orgs-teams-event-types-get-all-team-event-types|Get all team event types]]
