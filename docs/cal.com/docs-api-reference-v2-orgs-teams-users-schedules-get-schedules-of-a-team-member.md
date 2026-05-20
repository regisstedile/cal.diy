---
title: "Get schedules of a team member"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-users-schedules/get-schedules-of-a-team-member"
tags: [cal-com, docs]
---
# Get schedules of a team member

Copy page

Required membership role: `team admin`. PBAC permission: `availability.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_SCHEDULE_READ` scope is required.

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

users

/

{userId}

/

schedules

Try it

Get schedules of a team member

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/users/{userId}/schedules
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 254,
      "ownerId": 478,
      "name": "Catch up hours",
      "timeZone": "Europe/Rome",
      "availability": [
        {
          "days": [
            "Monday",
            "Tuesday"
          ],
          "startTime": "17:00",
          "endTime": "19:00"
        },
        {
          "days": [
            "Wednesday",
            "Thursday"
          ],
          "startTime": "16:00",
          "endTime": "20:00"
        }
      ],
      "isDefault": true,
      "overrides": [
        {
          "date": "2024-05-20",
          "startTime": "18:00",
          "endTime": "21:00"
        }
      ]
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

userId

number

required

#### Query Parameters

eventTypeId

number

Filter schedules by event type ID

Example:

`1`

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

[[docs-api-reference-v2-orgs-teams-stripe-save-stripe-credentials|Save Stripe credentials]][[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-workflows|Get organization team workflows]]
