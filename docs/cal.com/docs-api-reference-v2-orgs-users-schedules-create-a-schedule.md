---
title: "Create a schedule"
source: "https://cal.com/docs/api-reference/v2/orgs-users-schedules/create-a-schedule"
tags: [cal-com, docs]
---
# Create a schedule

Copy page

Required membership role: `org admin`. PBAC permission: `availability.create`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_SCHEDULE_WRITE` scope is required.

Copy page

POST

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

Try it

Create a schedule

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/schedules \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Catch up hours",
  "timeZone": "Europe/Rome",
  "isDefault": true,
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
  "overrides": [
    {
      "date": "2024-05-20",
      "startTime": "18:00",
      "endTime": "21:00"
    }
  ]
}
'
```

201

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

orgId

number

required

#### Body

application/json

name

string

required

Example:

`"Catch up hours"`

timeZone

string

required

Timezone is used to calculate available times when an event using the schedule is booked.

Example:

`"Europe/Rome"`

isDefault

boolean

required

Each user should have 1 default schedule. If you specified `timeZone` when creating managed user, then the default schedule will be created with that timezone. Default schedule means that if an event type is not tied to a specific schedule then the default schedule is used.

Example:

`true`

availability

object[]

Each object contains days and times when the user is available. If not passed, the default availability is Monday to Friday from 09:00 to 17:00.

Show child attributes

Example:

`[  {    "days": ["Monday", "Tuesday"],    "startTime": "17:00",    "endTime": "19:00"  },  {    "days": ["Wednesday", "Thursday"],    "startTime": "16:00",    "endTime": "20:00"  }]`

overrides

object[]

Need to change availability for a specific date? Add an override.

Show child attributes

Example:

`[  {    "date": "2024-05-20",    "startTime": "18:00",    "endTime": "21:00"  }]`

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

[[docs-api-reference-v2-orgs-users-ooo-get-all-out-of-office-entries-for-organization-users|Get all out-of-office entries for organization users]][[docs-api-reference-v2-orgs-users-schedules-get-all-schedules|Get all schedules]]
