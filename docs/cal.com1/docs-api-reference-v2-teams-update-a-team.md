---
title: "Update a team"
source: "https://cal.com/docs/api-reference/v2/teams/update-a-team"
tags: [cal-com, docs]
---
# Update a team

Copy page

If accessed using an OAuth access token, the `TEAM_PROFILE_WRITE` scope is required.

Copy page

PATCH

/

v2

/

teams

/

{teamId}

Try it

Update a team

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/teams/{teamId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "CalTeam",
  "slug": "caltel",
  "logoUrl": "https://i.cal.com/api/avatar/b0b58752-68ad-4c0d-8024-4fa382a77752.png",
  "calVideoLogo": "<string>",
  "appLogo": "<string>",
  "appIconLogo": "<string>",
  "bio": "<string>",
  "hideBranding": true,
  "isPrivate": true,
  "hideBookATeamMember": true,
  "metadata": {
    "key": "value"
  },
  "theme": "<string>",
  "brandColor": "<string>",
  "darkBrandColor": "<string>",
  "bannerUrl": "https://i.cal.com/api/avatar/949be534-7a88-4185-967c-c020b0c0bef3.png",
  "timeFormat": 123,
  "timeZone": "America/New_York",
  "weekStart": "Monday",
  "bookingLimits": "<string>",
  "includeManagedEventsInLimits": true
}
'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "<string>",
    "isOrganization": true,
    "parentId": 123,
    "slug": "<string>",
    "logoUrl": "<string>",
    "calVideoLogo": "<string>",
    "appLogo": "<string>",
    "appIconLogo": "<string>",
    "bio": "<string>",
    "hideBranding": true,
    "isPrivate": true,
    "hideBookATeamMember": true,
    "metadata": {
      "key": "value"
    },
    "theme": "<string>",
    "brandColor": "<string>",
    "darkBrandColor": "<string>",
    "bannerUrl": "<string>",
    "timeFormat": 123,
    "timeZone": "Europe/London",
    "weekStart": "Sunday"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

teamId

number

required

#### Body

application/json

name

string

Name of the team

Minimum string length: `1`

Example:

`"CalTeam"`

slug

string

Team slug

Example:

`"caltel"`

logoUrl

string

URL of the teams logo image

Example:

`"https://i.cal.com/api/avatar/b0b58752-68ad-4c0d-8024-4fa382a77752.png"`

calVideoLogo

string

appLogo

string

appIconLogo

string

bio

string

hideBranding

boolean

isPrivate

boolean

hideBookATeamMember

boolean

metadata

object

You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters. Values can be strings (up to 500 characters), numbers, or booleans.

Example:

`{ "key": "value" }`

theme

string

brandColor

string

darkBrandColor

string

bannerUrl

string

URL of the teams banner image which is shown on booker

Example:

`"https://i.cal.com/api/avatar/949be534-7a88-4185-967c-c020b0c0bef3.png"`

timeFormat

number

timeZone

string

Timezone is used to create teams's default schedule from Monday to Friday from 9AM to 5PM. It will default to Europe/London if not passed.

Example:

`"America/New_York"`

weekStart

string

Example:

`"Monday"`

bookingLimits

string

includeManagedEventsInLimits

boolean

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

[[docs-api-reference-v2-teams-get-a-team|Get a team]][[docs-api-reference-v2-teams-delete-a-team|Delete a team]]
