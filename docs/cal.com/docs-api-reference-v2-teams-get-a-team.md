---
title: "Get a team"
source: "https://cal.com/docs/api-reference/v2/teams/get-a-team"
tags: [cal-com, docs]
---
# Get a team

Copy page

If accessed using an OAuth access token, the `TEAM_PROFILE_READ` scope is required.

Copy page

GET

/

v2

/

teams

/

{teamId}

Try it

Get a team

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId} \
  --header 'Authorization: <authorization>'
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

[[docs-api-reference-v2-teams-get-teams|Get teams]][[docs-api-reference-v2-teams-update-a-team|Update a team]]
