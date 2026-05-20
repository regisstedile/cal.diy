---
title: "Get organization team routing form workflows"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-workflows/get-organization-team-routing-form-workflows"
tags: [cal-com, docs]
---
# Get organization team routing form workflows

Copy page

Required membership role: `team admin`. PBAC permission: `workflow.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_WORKFLOW_READ` scope is required.

Copy page

GET

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

routing-form

Try it

Get organization team routing form workflows

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/workflows/routing-form?take=250'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 101,
      "name": "Platform Test Workflow",
      "type": "routing-form",
      "activation": {
        "isActiveOnAllRoutingForms": false,
        "activeOnRoutingFormIds": [
          "5cacdec7-1234-6e1b-78d9-7bcda8a1b332"
        ]
      },
      "trigger": {
        "type": "formSubmitted",
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

orgId

number

required

teamId

number

required

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

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

List of workflows

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-workflows-create-organization-team-workflow-for-event-types|Create organization team workflow for event-types]][[docs-api-reference-v2-orgs-teams-workflows-create-organization-team-workflow-for-routing-forms|Create organization team workflow for routing-forms]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
