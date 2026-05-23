---
title: "Get all out-of-office entries for organization users"
source: "https://cal.com/docs/api-reference/v2/orgs-users-ooo/get-all-out-of-office-entries-for-organization-users"
tags: [cal-com, docs]
---
# Get all out-of-office entries for organization users

Copy page

If accessed using an OAuth access token, the `ORG_SCHEDULE_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

ooo

Try it

Get all out-of-office entries for organization users

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/ooo
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

email

string

Filter ooo entries by the user email address. user must be within your organization.

Example:

`"example@domain.com"`

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

[[docs-api-reference-v2-orgs-users-ooo-delete-an-out-of-office-entry-for-a-user|Delete an out-of-office entry for a user]][[docs-api-reference-v2-orgs-users-schedules-create-a-schedule|Create a schedule]]
