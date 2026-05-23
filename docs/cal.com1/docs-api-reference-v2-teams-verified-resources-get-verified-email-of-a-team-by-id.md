---
title: "Get verified email of a team by id"
source: "https://cal.com/docs/api-reference/v2/teams-verified-resources/get-verified-email-of-a-team-by-id"
tags: [cal-com, docs]
---
# Get verified email of a team by id

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

emails

/

{id}

Try it

Get verified email of a team by id

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/teams/{teamId}/verified-resources/emails/{id} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 789,
    "email": "user@example.com",
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

id

number

required

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

[[docs-api-reference-v2-teams-verified-resources-get-list-of-verified-phone-numbers-of-a-team|Get list of verified phone numbers of a team]][[docs-api-reference-v2-teams-verified-resources-get-verified-phone-number-of-a-team-by-id|Get verified phone number of a team by id]]
