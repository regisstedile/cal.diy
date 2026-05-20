---
title: "Get all attribute options"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/get-all-attribute-options"
tags: [cal-com, docs]
---
# Get all attribute options

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

{attributeId}

/

options

Try it

Get all attribute options

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId}/options \
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
      "slug": "option-slug"
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

attributeId

string

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

[[docs-api-reference-v2-orgs-attributes-options-create-an-attribute-option|Create an attribute option]][[docs-api-reference-v2-orgs-attributes-options-delete-an-attribute-option|Delete an attribute option]]
