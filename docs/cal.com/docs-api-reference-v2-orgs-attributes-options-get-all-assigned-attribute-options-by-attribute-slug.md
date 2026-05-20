---
title: "Get all assigned attribute options by attribute slug"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/get-all-assigned-attribute-options-by-attribute-slug"
tags: [cal-com, docs]
---
# Get all assigned attribute options by attribute slug

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

slugs

/

{attributeSlug}

/

options

/

assigned

Try it

Get all assigned attribute options by attribute slug

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/slugs/{attributeSlug}/options/assigned \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": "attr_option_id",
      "attributeId": "attr_id",
      "value": "option_value",
      "slug": "option-slug",
      "assignedUserIds": [
        124,
        224
      ]
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

attributeSlug

string

required

#### Query Parameters

skip

number

Number of responses to skip

take

number

Number of responses to take

assignedOptionIds

string[]

Filter by assigned attribute option ids. ids must be separated by a comma.

Example:

`"?assignedOptionIds=aaaaaaaa-bbbb-cccc-dddd-eeeeee1eee,aaaaaaaa-bbbb-cccc-dddd-eeeeee2eee"`

teamIds

number[]

Filter by teamIds. Team ids must be separated by a comma.

Example:

`"?teamIds=100,200"`

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

[[docs-api-reference-v2-orgs-attributes-options-get-all-assigned-attribute-options-by-attribute-id|Get all assigned attribute options by attribute ID]][[docs-api-reference-v2-orgs-attributes-options-assign-an-attribute-to-a-user|Assign an attribute to a user]]
