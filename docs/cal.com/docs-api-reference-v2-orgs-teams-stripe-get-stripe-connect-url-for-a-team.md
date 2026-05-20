---
title: "Get Stripe connect URL for a team"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-stripe/get-stripe-connect-url-for-a-team"
tags: [cal-com, docs]
---
# Get Stripe connect URL for a team

Copy page

Required membership role: `team admin`. PBAC permission: `organization.manageBilling`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

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

stripe

/

connect

Try it

Get Stripe connect URL for a team

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/stripe/connect \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "authUrl": "<string>"
  }
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

data

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-schedules-get-all-team-member-schedules|Get all team member schedules]][[docs-api-reference-v2-orgs-teams-stripe-check-team-stripe-connection|Check team Stripe connection]]
