---
title: "Update organization team workflow"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-workflows/update-organization-team-workflow"
tags: [cal-com, docs]
---
# Update organization team workflow

Copy page

Required membership role: `team admin`. PBAC permission: `workflow.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_WORKFLOW_WRITE` scope is required.

Copy page

PATCH

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

workflows

/

{workflowId}

Try it

Update organization team workflow

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Platform Test Workflow",
  "trigger": {
    "offset": {
      "value": 24,
      "unit": "hour"
    },
    "type": "beforeEvent"
  },
  "steps": [
    {
      "action": "email_address",
      "stepNumber": 1,
      "recipient": "attendee",
      "template": "reminder",
      "sender": "<string>",
      "verifiedEmailId": 31214,
      "includeCalendarEvent": true,
      "message": {
        "subject": "Reminder: Your Meeting {EVENT_NAME} - {EVENT_DATE_ddd, MMM D, YYYY h:mma} with Cal.com",
        "html": "<p>This is a reminder from {ORGANIZER} of {EVENT_NAME} to {ATTENDEE} starting here  {LOCATION} {MEETING_URL} at {START_TIME_h:mma} {TIMEZONE}.</p>"
      },
      "autoTranslateEnabled": false,
      "sourceLocale": "en",
      "id": 67244
    }
  ],
  "activation": {
    "isActiveOnAllEventTypes": false,
    "activeOnEventTypeIds": []
  }
}
'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 101,
      "name": "Platform Test Workflow",
      "type": "event-type",
      "activation": {
        "isActiveOnAllEventTypes": false,
        "activeOnEventTypeIds": [
          698191,
          698192
        ]
      },
      "trigger": {
        "type": "beforeEvent",
        "offset": {
          "value": 24,
          "unit": "hour"
        }
      },
      "steps": [
        {
          "id": 67244,
          "stepNumber": 1,
          "recipient": "const",
          "template": "reminder",
          "sender": "Cal.com Notifications",
          "message": {
            "subject": "Reminder: Your Meeting {EVENT_NAME} - {EVENT_DATE_ddd, MMM D, YYYY h:mma} with Cal.com",
            "html": "<p>Reminder for {EVENT_NAME}.</p>",
            "text": "Reminder for {EVENT_NAME}."
          },
          "action": "email_host",
          "email": "notifications@example.com",
          "phone": "<string>",
          "phoneRequired": true,
          "includeCalendarEvent": true,
          "autoTranslateEnabled": false,
          "sourceLocale": "en"
        }
      ],
      "userId": 2313,
      "teamId": 4214321,
      "createdAt": "2024-05-12T10:00:00.000Z",
      "updatedAt": "2024-05-12T11:30:00.000Z"
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

teamId

number

required

workflowId

number

required

orgId

number

required

#### Body

application/json

name

string

Name of the workflow

Example:

`"Platform Test Workflow"`

activation

object

Activation settings for the workflow

Show child attributes

trigger

object

Trigger configuration for the event-type workflow, allowed triggers are beforeEvent,eventCancelled,newEvent,afterEvent,rescheduleEvent,afterHostsCalVideoNoShow,afterGuestsCalVideoNoShow,bookingRejected,bookingRequested,bookingPaymentInitiated,bookingPaid,bookingNoShowUpdated

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 
*   Option 5 
*   Option 6 
*   Option 7 
*   Option 8 
*   Option 9 
*   Option 10 
*   Option 11 
*   Option 12 

Show child attributes

steps

object[]

Steps to execute as part of the event-type workflow, allowed steps are email_host,email_attendee,email_address,sms_attendee,sms_number,whatsapp_attendee,whatsapp_number,cal_ai_phone_call

*   Option 1 
*   Option 2 
*   Option 3 
*   Option 4 
*   Option 5 
*   Option 6 
*   Option 7 

Show child attributes

#### Response

200 - application/json

status

enum<string>

required

Indicates the status of the response

Available options:

`success`,

`error`

Example:

`"success"`

data

object[]

required

workflow

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-workflow|Get organization team workflow]][[docs-api-reference-v2-orgs-teams-workflows-delete-organization-team-workflow|Delete organization team workflow]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
