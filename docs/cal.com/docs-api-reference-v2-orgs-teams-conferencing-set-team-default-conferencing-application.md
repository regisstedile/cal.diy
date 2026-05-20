---
title: "Set team default conferencing application"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/set-team-default-conferencing-application"
tags: [cal-com, docs]
---
# Set team default conferencing application

Copy page

Required membership role: `team admin`. PBAC permission: `team.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_APPS_WRITE` scope is required.

Copy page

POST

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

{app}

/

default

Try it

Set team default conferencing application

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/{app}/default \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success"
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

app

enum<string>

required

Conferencing application type

Available options:

`google-meet`,

`zoom`,

`msteams`,

`daily-video`

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

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-conferencing-list-team-conferencing-applications|List team conferencing applications]][[docs-api-reference-v2-orgs-teams-conferencing-get-team-default-conferencing-application|Get team default conferencing application]]
