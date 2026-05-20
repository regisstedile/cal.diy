---
title: "Create an attribute"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes/create-an-attribute"
tags: [cal-com, docs]
---
# Create an attribute

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

Try it

Create an attribute

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "slug": "<string>",
  "type": "TEXT",
  "options": [
    {
      "value": "<string>",
      "slug": "<string>"
    }
  ],
  "enabled": true
}
'
```

201

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

#### Body

application/json

name

string

required

slug

string

required

type

enum<string>

required

Available options:

`TEXT`,

`NUMBER`,

`SINGLE_SELECT`,

`MULTI_SELECT`

options

object[]

required

Show child attributes

enabled

boolean

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

[[docs-api-reference-v2-orgs-attributes-get-all-attributes|Get all attributes]][[docs-api-reference-v2-orgs-attributes-get-an-attribute|Get an attribute]]
