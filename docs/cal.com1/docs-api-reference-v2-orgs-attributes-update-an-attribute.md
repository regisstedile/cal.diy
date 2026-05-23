---
title: "Update an attribute"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes/update-an-attribute"
tags: [cal-com, docs]
---
# Update an attribute

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

Try it

Update an attribute

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/{attributeId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "slug": "<string>",
  "type": "TEXT",
  "enabled": true
}
'
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

#### Body

application/json

name

string

slug

string

type

enum<string>

Available options:

`TEXT`,

`NUMBER`,

`SINGLE_SELECT`,

`MULTI_SELECT`

enabled

boolean

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

[[docs-api-reference-v2-orgs-attributes-get-an-attribute|Get an attribute]][[docs-api-reference-v2-orgs-attributes-delete-an-attribute|Delete an attribute]]
