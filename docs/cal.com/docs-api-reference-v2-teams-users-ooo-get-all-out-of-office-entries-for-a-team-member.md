---
title: "Get all out-of-office entries for a team member"
source: "https://cal.com/docs/api-reference/v2/teams-users-ooo/get-all-out-of-office-entries-for-a-team-member"
tags: [cal-com, docs]
---
# Get all out-of-office entries for a team member

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

users

/

{userId}

/

ooo

Try it

Get all out-of-office entries for a team member

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/users/{userId}/ooo \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "userId": 2,
      "id": 2,
      "uuid": "e84be5a3-4696-49e3-acc7-b2f3999c3b94",
      "start": "2023-05-01T00:00:00.000Z",
      "end": "2023-05-10T23:59:59.999Z",
      "toUserId": 2,
      "notes": "Vacation in Hawaii",
      "reason": "vacation"
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

userId

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

sortStart

enum<string>

Sort results by their start time in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortStart=asc OR ?sortStart=desc"`

sortEnd

enum<string>

Sort results by their end time in ascending or descending order.

Available options:

`asc`,

`desc`

Example:

`"?sortEnd=asc OR ?sortEnd=desc"`

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

[[docs-api-reference-v2-teams-schedules-get-all-team-member-schedules|Get all team member schedules]][[docs-api-reference-v2-teams-users-ooo-create-an-out-of-office-entry-for-a-team-member|Create an out-of-office entry for a team member]]
