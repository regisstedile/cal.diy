---
title: "Get verified phone number of a team by id"
source: "https://cal.com/docs/api-reference/v2/teams-verified-resources/get-verified-phone-number-of-a-team-by-id"
tags: [cal-com, docs]
---
# Get verified phone number of a team by id

Copy page

If accessed using an OAuth access token, the `TEAM_VERIFIED_RESOURCES_READ` scope is required.

Copy page

GET

/

v2

/

teams

/

{teamId}

/

verified-resources

/

phones

/

{id}

Try it

Get verified phone number of a team by id

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/verified-resources/phones/{id} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 789,
    "phoneNumber": "+37255556666",
    "teamId": 89,
    "userId": 45
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

teamId

number

required

id

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

[[docs-api-reference-v2-teams-verified-resources-get-verified-email-of-a-team-by-id|Get verified email of a team by id]][[docs-api-reference-v2-orgs-attributes-get-all-attributes|Get all attributes]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
