---
title: "Update destination calendars"
source: "https://cal.com/docs/api-reference/v2/destination-calendars/update-destination-calendars"
tags: [cal-com, docs]
---
# Update destination calendars

Copy page

If accessed using an OAuth access token, the `APPS_WRITE` scope is required.

Copy page

PUT

/

v2

/

destination-calendars

Try it

Update destination calendars

cURL

```
curl --request PUT \
  --url https://api.cal.com/v2/destination-calendars \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "integration": "apple_calendar",
  "externalId": "https://caldav.icloud.com/26962146906/calendars/1644422A-1945-4438-BBC0-4F0Q23A57R7S/",
  "delegationCredentialId": "<string>"
}
'
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

#### Body

application/json

integration

enum<string>

required

The calendar service you want to integrate, as returned by the /calendars endpoint

Available options:

`apple_calendar`,

`google_calendar`,

`office365_calendar`

Example:

`"apple_calendar"`

externalId

string

required

Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint

Example:

`"https://caldav.icloud.com/26962146906/calendars/1644422A-1945-4438-BBC0-4F0Q23A57R7S/"`

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

[[docs-api-reference-v2-selected-calendars-delete-a-selected-calendar|Delete a selected calendar]][[docs-api-reference-v2-conferencing-connect-your-conferencing-application|Connect your conferencing application]]
