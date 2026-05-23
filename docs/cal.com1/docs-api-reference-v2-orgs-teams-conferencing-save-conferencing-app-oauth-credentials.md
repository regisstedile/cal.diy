---
title: "Save conferencing app OAuth credentials"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/save-conferencing-app-oauth-credentials"
tags: [cal-com, docs]
---
# Save conferencing app OAuth credentials

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

callback

Try it

Save conferencing app OAuth credentials

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/{app}/oauth/callback \
  --header 'Authorization: Bearer <token>'
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

app

string

required

#### Query Parameters

state

string

required

code

string

required

#### Response

200 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-conferencing-disconnect-team-conferencing-application|Disconnect team conferencing application]][[docs-api-reference-v2-orgs-teams-event-types-create-an-event-type|Create an event type]]
