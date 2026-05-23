---
title: "Delete a selected calendar"
source: "https://cal.com/docs/api-reference/v2/selected-calendars/delete-a-selected-calendar"
tags: [cal-com, docs]
---
# Delete a selected calendar

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

DELETE

/

v2

/

selected-calendars

Try it

Delete a selected calendar

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/selected-calendars \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "userId": 123,
    "integration": "<string>",
    "externalId": "<string>",
    "credentialId": 123
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Query Parameters

integration

string

required

externalId

string

required

credentialId

string

required

delegationCredentialId

string

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

[[docs-api-reference-v2-selected-calendars-add-a-selected-calendar|Add a selected calendar]][[docs-api-reference-v2-destination-calendars-update-destination-calendars|Update destination calendars]]
