---
title: "Get all attribute options for a user"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/get-all-attribute-options-for-a-user"
tags: [cal-com, docs]
---
# Get all attribute options for a user

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

/

options

/

{userId}

Try it

Get all attribute options for a user

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/options/{userId} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "<string>",
      "attributeId": "<string>",
      "value": "<string>",
      "slug": "<string>"
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

userId

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-attributes-options-assign-an-attribute-to-a-user|Assign an attribute to a user]][[docs-api-reference-v2-orgs-attributes-options-unassign-an-attribute-from-a-user|Unassign an attribute from a user]]
