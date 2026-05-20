---
title: "Get team default conferencing application"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/get-team-default-conferencing-application"
tags: [cal-com, docs]
---
# Get team default conferencing application

Copy page

Required membership role: `team admin`. PBAC permission: `team.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_APPS_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

teams

/

{teamId}

/

conferencing

/

default

Try it

Get team default conferencing application

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/default \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": {
    "appSlug": "<string>",
    "appLink": "<string>"
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

teamId

number

required

orgId

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

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-conferencing-set-team-default-conferencing-application|Set team default conferencing application]][[docs-api-reference-v2-orgs-teams-conferencing-disconnect-team-conferencing-application|Disconnect team conferencing application]]
