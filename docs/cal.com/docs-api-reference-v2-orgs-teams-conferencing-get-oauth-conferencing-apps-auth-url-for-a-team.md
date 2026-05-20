---
title: "Get OAuth conferencing app's auth URL for a team"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/get-oauth-conferencing-apps-auth-url-for-a-team"
tags: [cal-com, docs]
---
# Get OAuth conferencing app's auth URL for a team

Copy page

Required membership role: `team admin`. PBAC permission: `team.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_APPS_WRITE` scope is required.

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

{app}

/

oauth

/

auth-url

Try it

Get OAuth conferencing app's auth URL for a team

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/{app}/oauth/auth-url \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success"
}
```

#### Headers

Authorization

string

required

#### Path Parameters

teamId

number

required

orgId

number

required

app

enum<string>

required

Conferencing application type

Available options:

`zoom`,

`msteams`

#### Query Parameters

returnTo

string

required

onErrorReturnTo

string

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

[[docs-api-reference-v2-orgs-teams-conferencing-connect-your-conferencing-application-to-a-team|Connect your conferencing application to a team]][[docs-api-reference-v2-orgs-teams-conferencing-list-team-conferencing-applications|List team conferencing applications]]
