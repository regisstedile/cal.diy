---
title: "Get busy times"
source: "https://cal.com/docs/api-reference/v2/calendars/get-busy-times"
tags: [cal-com, docs]
---
# Get busy times

Copy page

Get busy times from a calendar. Example request URL is `https://api.cal.com/v2/calendars/busy-times?timeZone=Europe%2FMadrid&dateFrom=2024-12-18&dateTo=2024-12-18&calendarsToLoad[0][credentialId]=135&calendarsToLoad[0][externalId]=skrauciz%40gmail.com`. Note: loggedInUsersTz is deprecated, use timeZone instead. If accessed using an OAuth access token, the `APPS_READ` scope is required.

Copy page

GET

/

v2

/

calendars

/

busy-times

Try it

Get busy times

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/calendars/busy-times \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "start": "2023-11-07T05:31:56Z",
      "end": "2023-11-07T05:31:56Z",
      "source": "<string>"
    }
  ]
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Query Parameters

loggedInUsersTz

string

Deprecated: Use timeZone instead. The timezone of the user represented as a string

Example:

`"America/New_York"`

timeZone

string

The timezone for the busy times query represented as a string

Example:

`"America/New_York"`

dateFrom

string

required

The starting date for the busy times query

Example:

`"2023-10-01"`

dateTo

string

required

The ending date for the busy times query

Example:

`"2023-10-31"`

calendarsToLoad

object[]

required

An array of Calendar objects representing the calendars to be loaded. Use bracket notation in the URL, e.g.: calendarsToLoad[0][credentialId]=135&calendarsToLoad[0][externalId]=[email@example.com](mailto:email@example.com)

Show child attributes

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

[[docs-api-reference-v2-calendars-check-an-ics-feed|Check an ICS feed]][[docs-api-reference-v2-calendars-get-all-calendars|Get all calendars]]
