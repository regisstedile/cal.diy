---
title: "Update an out-of-office entry for a user"
source: "https://cal.com/docs/api-reference/v2/orgs-users-ooo/update-an-out-of-office-entry-for-a-user"
tags: [cal-com, docs]
---
# Update an out-of-office entry for a user

Copy page

If accessed using an OAuth access token, the `ORG_SCHEDULE_WRITE` scope is required.

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

ooo

/

{oooId}

Try it

Update an out-of-office entry for a user

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}/ooo/{oooId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "start": "2023-05-01T00:00:00.000Z",
  "end": "2023-05-10T23:59:59.999Z",
  "notes": "Vacation in Hawaii",
  "toUserId": 2,
  "reason": "vacation"
}
'
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

userId

number

required

oooId

number

required

orgId

number

required

#### Body

application/json

start

string<date-time>

The start date and time of the out of office period in ISO 8601 format in UTC timezone.

Example:

`"2023-05-01T00:00:00.000Z"`

end

string<date-time>

The end date and time of the out of office period in ISO 8601 format in UTC timezone.

Example:

`"2023-05-10T23:59:59.999Z"`

notes

string

Optional notes for the out of office entry.

Example:

`"Vacation in Hawaii"`

toUserId

number

The ID of the user covering for the out of office period, if applicable.

Example:

`2`

reason

enum<string>

the reason for the out of office entry, if applicable

Available options:

`unspecified`,

`vacation`,

`travel`,

`sick`,

`public_holiday`

Example:

`"vacation"`

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

[[docs-api-reference-v2-orgs-users-ooo-create-an-out-of-office-entry-for-a-user|Create an out-of-office entry for a user]][[docs-api-reference-v2-orgs-users-ooo-delete-an-out-of-office-entry-for-a-user|Delete an out-of-office entry for a user]]
