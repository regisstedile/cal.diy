---
title: "Get an attribute"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes/get-an-attribute"
tags: [cal-com, docs]
---
# Get an attribute

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

Try it

Get an attribute

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": "attr_123",
    "teamId": 1,
    "type": "TEXT",
    "name": "Attribute Name",
    "slug": "attribute-name",
    "enabled": true,
    "usersCanEditRelation": true
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

[[docs-api-reference-v2-orgs-attributes-create-an-attribute|Create an attribute]][[docs-api-reference-v2-orgs-attributes-update-an-attribute|Update an attribute]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
