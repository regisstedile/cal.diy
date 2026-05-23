---
title: "Delete an out-of-office entry for the authenticated user"
source: "https://cal.com/docs/api-reference/v2/out-of-office/delete-an-out-of-office-entry-for-the-authenticated-user"
tags: [cal-com, docs]
---
# Delete an out-of-office entry for the authenticated user

Copy page

If accessed using an OAuth access token, the `SCHEDULE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

me

/

ooo

/

{oooId}

Try it

Delete an out-of-office entry for the authenticated user

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/me/ooo/{oooId} \
  --header 'Authorization: <authorization>'
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

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

oooId

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

[[docs-api-reference-v2-out-of-office-update-an-out-of-office-entry-for-the-authenticated-user|Update an out-of-office entry for the authenticated user]][[docs-api-reference-v2-notifications-register-an-app-push-subscription|Register an app push subscription]]
