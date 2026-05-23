---
title: "Get a schedule"
source: "https://cal.com/docs/api-reference/v2/orgs-users-schedules/get-a-schedule"
tags: [cal-com, docs]
---
# Get a schedule

Copy page

Required membership role: `org admin`. PBAC permission: `availability.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_SCHEDULE_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

users

/

{userId}

/

schedules

/

{scheduleId}

Try it

Get a schedule

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/schedules/{scheduleId}
```

200

```
{
  "status": "success",
  "data": {
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

userId

number

required

scheduleId

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

[[docs-api-reference-v2-orgs-users-schedules-get-all-schedules|Get all schedules]][[docs-api-reference-v2-orgs-users-schedules-update-a-schedule|Update a schedule]]
