---
title: "Get organization team routing form workflow"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-workflows/get-organization-team-routing-form-workflow"
tags: [cal-com, docs]
---
# Get organization team routing form workflow

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

{workflowId}

/

routing-form

Try it

Get organization team routing form workflow

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}/routing-form
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

teamId

number

required

workflowId

number

required

orgId

number

required

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

[[docs-api-reference-v2-orgs-teams-workflows-delete-organization-team-workflow|Delete organization team workflow]][[docs-api-reference-v2-orgs-teams-workflows-update-organization-routing-form-team-workflow|Update organization routing form team workflow]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
