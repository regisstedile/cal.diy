---
title: "Check team Stripe connection"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-stripe/check-team-stripe-connection"
tags: [cal-com, docs]
---
# Check team Stripe connection

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

check

Try it

Check team Stripe connection

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/stripe/check \
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

[[docs-api-reference-v2-orgs-teams-stripe-get-stripe-connect-url-for-a-team|Get Stripe connect URL for a team]][[docs-api-reference-v2-orgs-teams-stripe-save-stripe-credentials|Save Stripe credentials]]
