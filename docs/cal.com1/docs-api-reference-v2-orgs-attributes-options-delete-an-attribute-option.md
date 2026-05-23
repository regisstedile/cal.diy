---
title: "Delete an attribute option"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/delete-an-attribute-option"
tags: [cal-com, docs]
---
# Delete an attribute option

Copy page

Required membership role: `org admin`. PBAC permission: `organization.attributes.delete`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

DELETE

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

Delete an attribute option

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId}/options/{optionId} \
  --header 'Authorization: <authorization>'
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

[[docs-api-reference-v2-orgs-attributes-options-get-all-attribute-options|Get all attribute options]][[docs-api-reference-v2-orgs-attributes-options-update-an-attribute-option|Update an attribute option]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
