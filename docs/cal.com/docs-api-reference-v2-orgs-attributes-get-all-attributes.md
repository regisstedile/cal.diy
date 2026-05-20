---
title: "Get all attributes"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes/get-all-attributes"
tags: [cal-com, docs]
---
# Get all attributes

Copy page

Required membership role: `org member`. PBAC permission: `organization.attributes.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

attributes

Try it

Get all attributes

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "attr_123",
      "teamId": 1,
      "type": "TEXT",
      "name": "Attribute Name",
      "slug": "attribute-name",
      "enabled": true,
      "usersCanEditRelation": true
    }
  ]
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

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

[[docs-api-reference-v2-teams-verified-resources-get-verified-phone-number-of-a-team-by-id|Get verified phone number of a team by id]][[docs-api-reference-v2-orgs-attributes-create-an-attribute|Create an attribute]]
