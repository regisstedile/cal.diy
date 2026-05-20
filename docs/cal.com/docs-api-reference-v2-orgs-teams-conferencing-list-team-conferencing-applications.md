---
title: "List team conferencing applications"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/list-team-conferencing-applications"
tags: [cal-com, docs]
---
# List team conferencing applications

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

Try it

List team conferencing applications

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 123,
      "type": "google_video",
      "userId": 123,
      "invalid": true
    }
  ]
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

data

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-conferencing-get-oauth-conferencing-apps-auth-url-for-a-team|Get OAuth conferencing app's auth URL for a team]][[docs-api-reference-v2-orgs-teams-conferencing-set-team-default-conferencing-application|Set team default conferencing application]]
