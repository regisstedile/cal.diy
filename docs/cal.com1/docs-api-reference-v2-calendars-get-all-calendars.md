---
title: "Get all calendars"
source: "https://cal.com/docs/api-reference/v2/calendars/get-all-calendars"
tags: [cal-com, docs]
---
# Get all calendars

Copy page

If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

calendars

Try it

Get all calendars

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "connectedCalendars": [
      {
        "integration": {
          "name": "<string>",
          "description": "<string>",
          "type": "<string>",
          "variant": "<string>",
          "categories": [
            "<string>"
          ],
          "logo": "<string>",
          "publisher": "<string>",
          "slug": "<string>",
          "url": "<string>",
          "email": "<string>",
          "locationOption": {
            "label": "Google Meet",
            "value": "integrations:google:meet",
            "icon": "<string>",
            "disabled": false
          },
          "appData": {},
          "dirName": "<string>",
          "__template": "<string>",
          "installed": true,
          "title": "<string>",
          "category": "<string>"
        },
        "credentialId": 123,
        "delegationCredentialId": "<string>",
        "primary": {
          "externalId": "<string>",
          "primary": true,
          "readOnly": true,
          "isSelected": true,
          "credentialId": 123,
          "integration": "<string>",
          "name": "<string>",
          "email": "<string>",
          "delegationCredentialId": "<string>"
        },
        "calendars": [
          {
            "externalId": "<string>",
            "readOnly": true,
            "isSelected": true,
            "credentialId": 123,
            "integration": "<string>",
            "name": "<string>",
            "primary": true,
            "email": "<string>",
            "delegationCredentialId": "<string>"
          }
        ]
      }
    ],
    "destinationCalendar": {
      "id": 123,
      "integration": "<string>",
      "externalId": "<string>",
      "primaryEmail": "<string>",
      "userId": 123,
      "eventTypeId": 123,
      "credentialId": 123,
      "delegationCredentialId": "<string>",
      "name": "<string>",
      "primary": true,
      "readOnly": true,
      "email": "<string>",
      "integrationTitle": "<string>"
    }
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

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

[[docs-api-reference-v2-calendars-get-busy-times|Get busy times]][[docs-api-reference-v2-calendars-get-oauth-connect-url|Get OAuth connect URL]]
