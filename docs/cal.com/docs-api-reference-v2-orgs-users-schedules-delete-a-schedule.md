---
title: "Delete a schedule"
source: "https://cal.com/docs/api-reference/v2/orgs-users-schedules/delete-a-schedule"
tags: [cal-com, docs]
---
# Delete a schedule

Copy page

Required membership role: `org admin`. PBAC permission: `availability.delete`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_SCHEDULE_WRITE` scope is required.

Copy page

DELETE

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

Delete a schedule

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/schedules/{scheduleId}
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

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-users-schedules-update-a-schedule|Update a schedule]][[docs-api-reference-v2-orgs-teams-get-all-teams|Get all teams]]
