---
title: "Delete a schedule"
source: "https://cal.com/docs/api-reference/v2/schedules/delete-a-schedule"
tags: [cal-com, docs]
---
# Delete a schedule

Copy page

Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.

If accessed using an OAuth access token, the `SCHEDULE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

schedules

/

{scheduleId}

Try it

Delete a schedule

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/schedules/{scheduleId} \
  --header 'Authorization: <authorization>' \
  --header 'cal-api-version: 2024-06-11'
```

200

```
{
  "status": "success"
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

Was this page helpful?

Yes No

[[docs-api-reference-v2-schedules-update-a-schedule|Update a schedule]][[docs-api-reference-v2-slots-get-available-time-slots-for-an-event-type|Get available time slots for an event type]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
