---
title: "Get a membership"
source: "https://cal.com/docs/api-reference/v2/orgs-memberships/get-a-membership"
tags: [cal-com, docs]
---
# Get a membership

Copy page

Required membership role: `org admin`. PBAC permission: `organization.listMembers`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_MEMBERSHIP_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

memberships

/

{membershipId}

Try it

Get a membership

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/memberships/{membershipId}
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "userId": 123,
    "teamId": 123,
    "accepted": true,
    "role": "MEMBER",
    "user": {
      "email": "<string>",
      "avatarUrl": "<string>",
      "username": "<string>",
      "name": "<string>",
      "bio": "<string>",
      "metadata": {
        "key": "value"
      }
    },
    "attributes": [
      {
        "id": "<string>",
        "name": "<string>",
        "type": "<string>",
        "option": "<string>",
        "optionId": "<string>"
      }
    ],
    "disableImpersonation": true
  }
}
```

#### Headers

Authorization

string

For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

orgId

number

required

membershipId

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

[[docs-api-reference-v2-orgs-memberships-create-a-membership|Create a membership]][[docs-api-reference-v2-orgs-memberships-delete-a-membership|Delete a membership]]
