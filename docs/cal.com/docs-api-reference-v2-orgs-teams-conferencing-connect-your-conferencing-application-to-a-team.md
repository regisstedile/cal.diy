---
title: "Connect your conferencing application to a team"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-conferencing/connect-your-conferencing-application-to-a-team"
tags: [cal-com, docs]
---
# Connect your conferencing application to a team

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

connect

Try it

Connect your conferencing application to a team

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/conferencing/{app}/connect \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "type": "google_video",
    "userId": 123,
    "invalid": true
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

app

enum<string>

required

Conferencing application type

Available options:

`google-meet`

#### Response

200 - application/json

status

enum<string>

required

Available options:

`success`,

`error`

data

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-bookings-get-booking-references|Get booking references]][[docs-api-reference-v2-orgs-teams-conferencing-get-oauth-conferencing-apps-auth-url-for-a-team|Get OAuth conferencing app's auth URL for a team]]
