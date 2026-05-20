---
title: "Add a selected calendar"
source: "https://cal.com/docs/api-reference/v2/selected-calendars/add-a-selected-calendar"
tags: [cal-com, docs]
---
# Add a selected calendar

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

POST

/

v2

/

selected-calendars

Try it

Add a selected calendar

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/selected-calendars \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "integration": "<string>",
  "externalId": "<string>",
  "credentialId": 123,
  "delegationCredentialId": "<string>"
}
'
```

201

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

#### Body

application/json

integration

string

required

externalId

string

required

credentialId

number

required

delegationCredentialId

string

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

[[docs-api-reference-v2-cal-unified-calendars-update-meeting-details-in-calendar|Update meeting details in calendar]][[docs-api-reference-v2-selected-calendars-delete-a-selected-calendar|Delete a selected calendar]]
