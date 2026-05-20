---
title: "Get all team member schedules"
source: "https://cal.com/docs/api-reference/v2/teams-schedules/get-all-team-member-schedules"
tags: [cal-com, docs]
---
# Get all team member schedules

Copy page

If accessed using an OAuth access token, the `TEAM_SCHEDULE_READ` scope is required.

Copy page

GET

/

v2

/

teams

/

{teamId}

/

schedules

Try it

Get all team member schedules

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/schedules \
  --header 'Authorization: <authorization>'
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

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

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

[[docs-api-reference-v2-teams-memberships-delete-a-membership|Delete a membership]][[docs-api-reference-v2-teams-users-ooo-get-all-out-of-office-entries-for-a-team-member|Get all out-of-office entries for a team member]]
