---
title: "Delete an out-of-office entry for a user"
source: "https://cal.com/docs/api-reference/v2/orgs-users-ooo/delete-an-out-of-office-entry-for-a-user"
tags: [cal-com, docs]
---
# Delete an out-of-office entry for a user

Copy page

If accessed using an OAuth access token, the `ORG_SCHEDULE_WRITE` scope is required.

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

ooo

/

{oooId}

Try it

Delete an out-of-office entry for a user

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/ooo/{oooId}
```

200

```
{
  "status": "success",
  "data": {
    "userId": 2,
    "id": 2,
    "uuid": "e84be5a3-4696-49e3-acc7-b2f3999c3b94",
    "start": "2023-05-01T00:00:00.000Z",
    "end": "2023-05-10T23:59:59.999Z",
    "toUserId": 2,
    "notes": "Vacation in Hawaii",
    "reason": "vacation"
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

oooId

number

required

userId

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

[[docs-api-reference-v2-orgs-users-ooo-update-an-out-of-office-entry-for-a-user|Update an out-of-office entry for a user]][[docs-api-reference-v2-orgs-users-ooo-get-all-out-of-office-entries-for-organization-users|Get all out-of-office entries for organization users]]
