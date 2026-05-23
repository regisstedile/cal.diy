---
title: "Update a schedule"
source: "https://cal.com/docs/api-reference/v2/schedules/update-a-schedule"
tags: [cal-com, docs]
---
# Update a schedule

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

If accessed using an OAuth access token, the `SCHEDULE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

schedules

/

{scheduleId}

Try it

Update a schedule

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/schedules/{scheduleId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --header 'cal-api-version: <cal-api-version>' \
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

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

cal-api-version

string

default:2024-06-11

required

Must be set to 2024-06-11. If not set to this value, the endpoint will default to an older version.

#### Path Parameters

scheduleId

string

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

[[docs-api-reference-v2-schedules-get-a-schedule|Get a schedule]][[docs-api-reference-v2-schedules-delete-a-schedule|Delete a schedule]]
