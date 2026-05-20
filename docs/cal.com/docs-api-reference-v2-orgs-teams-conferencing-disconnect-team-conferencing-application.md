---
title: "Disconnect team conferencing application"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/disconnect-team-conferencing-application"
tags: [cal-com, docs]
---
# Disconnect team conferencing application

Copy page

Required membership role: `team admin`. PBAC permission: `team.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_APPS_WRITE` scope is required.

Copy page

DELETE

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

disconnect

Try it

Disconnect team conferencing application

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/{app}/disconnect \
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

`msteams`

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

[[docs-api-reference-v2-orgs-teams-conferencing-get-team-default-conferencing-application|Get team default conferencing application]][[docs-api-reference-v2-orgs-teams-conferencing-save-conferencing-app-oauth-credentials|Save conferencing app OAuth credentials]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
