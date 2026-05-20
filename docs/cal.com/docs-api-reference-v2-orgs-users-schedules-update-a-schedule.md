---
title: "Update a schedule"
source: "https://cal.com/docs/api-reference/v2/orgs-users-schedules/update-a-schedule"
tags: [cal-com, docs]
---
# Update a schedule

Copy page

Required membership role: `org admin`. PBAC permission: `availability.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_SCHEDULE_WRITE` scope is required.

Copy page

PATCH

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

Update a schedule

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/schedules/{scheduleId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "One-on-one coaching",
  "timeZone": "Europe/Rome",
  "availability": [
    {
      "days": [
        "Monday",
        "Tuesday"
      ],
      "startTime": "09:00",
      "endTime": "10:00"
    }
  ],
  "isDefault": true,
  "overrides": [
    {
      "date": "2024-05-20",
      "startTime": "12:00",
      "endTime": "14:00"
    }
  ]
}
'
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

#### Body

application/json

name

string

Example:

`"One-on-one coaching"`

timeZone

string

Example:

`"Europe/Rome"`

availability

object[]

Show child attributes

Example:

`[  {    "days": ["Monday", "Tuesday"],    "startTime": "09:00",    "endTime": "10:00"  }]`

isDefault

boolean

Example:

`true`

overrides

object[]

Show child attributes

Example:

`[  {    "date": "2024-05-20",    "startTime": "12:00",    "endTime": "14:00"  }]`

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

[[docs-api-reference-v2-orgs-users-schedules-get-a-schedule|Get a schedule]][[docs-api-reference-v2-orgs-users-schedules-delete-a-schedule|Delete a schedule]]
