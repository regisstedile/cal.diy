---
title: "Get list of verified phone numbers of an org team"
source: "https://cal.com/docs/api-reference/v2/organization-team-verified-resources/get-list-of-verified-phone-numbers-of-an-org-team"
tags: [cal-com, docs]
---
# Get list of verified phone numbers of an org team

Copy page

Required membership role: `team admin`. PBAC permission: `team.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_VERIFIED_RESOURCES_READ` scope is required.

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

verified-resources

/

phones

Try it

Get list of verified phone numbers of an org team

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/verified-resources/phones?take=250' \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 789,
      "phoneNumber": "+37255556666",
      "teamId": 89,
      "userId": 45
    }
  ]
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

orgId

number

required

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-organization-team-verified-resources-get-list-of-verified-emails-of-an-org-team|Get list of verified emails of an org team]][[docs-api-reference-v2-organization-team-verified-resources-get-verified-email-of-an-org-team-by-id|Get verified email of an org team by id]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
