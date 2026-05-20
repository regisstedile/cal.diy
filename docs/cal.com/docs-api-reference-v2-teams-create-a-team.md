---
title: "Create a team"
source: "https://cal.com/docs/api-reference/v2/teams/create-a-team"
tags: [cal-com, docs]
---
# Create a team

Copy page

If accessed using an OAuth access token, the `TEAM_PROFILE_WRITE` scope is required.

Copy page

POST

/

v2

/

teams

Try it

Create a team

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams \
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
  "hideBranding": false,
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
  "timeZone": "Europe/London",
  "weekStart": "Sunday",
  "autoAcceptCreator": true
}
'
```

201

```
{
  "status": "success",
  "data": {
    "message": "<string>",
    "paymentLink": "<string>",
    "pendingTeam": {
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
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Body

application/json

name

string

required

Name of the team

Minimum string length: `1`

Example:

`"CalTeam"`

slug

string

Team slug in kebab-case - if not provided will be generated automatically based on name.

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

default:false

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

default:Europe/London

Timezone is used to create teams's default schedule from Monday to Friday from 9AM to 5PM. It will default to Europe/London if not passed.

Example:

`"America/New_York"`

weekStart

string

default:Sunday

Example:

`"Monday"`

autoAcceptCreator

boolean

default:true

If you are a platform customer, don't pass 'false', because then team creator won't be able to create team event types.

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

Either an Output object or a TeamOutputDto.

*   Option 1 
*   Option 2 

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-stripe-check-stripe-connection|Check Stripe connection]][[docs-api-reference-v2-teams-get-teams|Get teams]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
