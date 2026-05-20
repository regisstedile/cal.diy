---
title: "Create team invite link"
source: "https://cal.com/docs/api-reference/v2/teams-invite/create-team-invite-link"
tags: [cal-com, docs]
---
# Create team invite link

Copy page

If accessed using an OAuth access token, the `TEAM_MEMBERSHIP_WRITE` scope is required.

Copy page

POST

/

v2

/

teams

/

{teamId}

/

invite

Try it

Create team invite link

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams/{teamId}/invite \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "token": "f6a5c8b1d2e34c7f90a1b2c3d4e5f6a5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2",
    "inviteLink": "http://app.cal.com/signup?token=f6a5c8b1d2e34c7f90a1b2c3d4e5f6a5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2&callbackUrl=/getting-started"
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

[[docs-api-reference-v2-teams-event-types-webhooks-delete-a-webhook-for-a-team-event-type|Delete a webhook for a team event type]][[docs-api-reference-v2-teams-memberships-create-a-membership|Create a membership]]
