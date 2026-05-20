---
title: "Delete an attribute"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes/delete-an-attribute"
tags: [cal-com, docs]
---
# Delete an attribute

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

Try it

Delete an attribute

cURL

```
curl --request DELETE \
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

[[docs-api-reference-v2-orgs-attributes-update-an-attribute|Update an attribute]][[docs-api-reference-v2-orgs-attributes-options-create-an-attribute-option|Create an attribute option]]
