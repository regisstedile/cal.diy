---
title: "Get a schedule"
source: "https://cal.com/docs/api-reference/v2/schedules/get-a-schedule"
tags: [cal-com, docs]
---
# Get a schedule

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

If accessed using an OAuth access token, the `SCHEDULE_READ` scope is required.

Copy page

GET

/

v2

/

schedules

/

{scheduleId}

Try it

Get a schedule

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/schedules/{scheduleId} \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: <cal-api-version>'
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

[[docs-api-reference-v2-schedules-get-default-schedule|Get default schedule]][[docs-api-reference-v2-schedules-update-a-schedule|Update a schedule]]
