---
title: "Update an attribute option"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/update-an-attribute-option"
tags: [cal-com, docs]
---
# Update an attribute option

Copy page

Required membership role: `org admin`. PBAC permission: `organization.attributes.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

PATCH

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

/

{optionId}

Try it

Update an attribute option

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId}/options/{optionId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "slug": "<string>"
}
'
```

200

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

optionId

string

required

#### Body

application/json

value

string

slug

string

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

[[docs-api-reference-v2-orgs-attributes-options-delete-an-attribute-option|Delete an attribute option]][[docs-api-reference-v2-orgs-attributes-options-get-all-assigned-attribute-options-by-attribute-id|Get all assigned attribute options by attribute ID]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
