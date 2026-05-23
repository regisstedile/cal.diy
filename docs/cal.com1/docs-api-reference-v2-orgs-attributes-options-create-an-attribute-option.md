---
title: "Create an attribute option"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/create-an-attribute-option"
tags: [cal-com, docs]
---
# Create an attribute option

Copy page

Required membership role: `org admin`. PBAC permission: `organization.attributes.create`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

POST

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

Create an attribute option

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId}/options \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "slug": "<string>"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": "attr_option_id",
    "attributeId": "attr_id",
    "value": "option_value",
    "slug": "option-slug"
  }
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

#### Body

application/json

value

string

required

slug

string

required

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

[[docs-api-reference-v2-orgs-attributes-delete-an-attribute|Delete an attribute]][[docs-api-reference-v2-orgs-attributes-options-get-all-attribute-options|Get all attribute options]]
