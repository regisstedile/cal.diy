---
title: "Get list of verified phone numbers of a team"
source: "https://cal.com/docs/api-reference/v2/teams-verified-resources/get-list-of-verified-phone-numbers-of-a-team"
tags: [cal-com, docs]
---
# Get list of verified phone numbers of a team

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

Try it

Get list of verified phone numbers of a team

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/verified-resources/phones \
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

[[docs-api-reference-v2-teams-verified-resources-get-list-of-verified-emails-of-a-team|Get list of verified emails of a team]][[docs-api-reference-v2-teams-verified-resources-get-verified-email-of-a-team-by-id|Get verified email of a team by id]]
