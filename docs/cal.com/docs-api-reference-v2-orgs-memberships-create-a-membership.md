---
title: "Create a membership"
source: "https://cal.com/docs/api-reference/v2/orgs-memberships/create-a-membership"
tags: [cal-com, docs]
---
# Create a membership

Copy page

Required membership role: `org admin`. PBAC permission: `organization.invite`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_MEMBERSHIP_WRITE` scope is required.

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

memberships

Try it

Create a membership

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/memberships \
  --header 'Content-Type: application/json' \
  --data '
{
  "userId": 123,
  "role": "MEMBER",
  "accepted": false,
  "disableImpersonation": false
}
'
```

201

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

#### Body

application/json

userId

number

required

role

enum<string>

default:MEMBER

required

If you are platform customer then managed users should only have MEMBER role.

Available options:

`MEMBER`,

`OWNER`,

`ADMIN`

accepted

boolean

default:false

disableImpersonation

boolean

default:false

#### Response

201 - application/json

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

[[docs-api-reference-v2-orgs-memberships-get-all-memberships|Get all memberships]][[docs-api-reference-v2-orgs-memberships-get-a-membership|Get a membership]]
