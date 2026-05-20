---
title: "Assign an attribute to a user"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/assign-an-attribute-to-a-user"
tags: [cal-com, docs]
---
# Assign an attribute to a user

Copy page

Required membership role: `org admin`. PBAC permission: `organization.attributes.editUsers`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

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

options

/

{userId}

Try it

Assign an attribute to a user

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/options/{userId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "attributeId": "<string>",
  "value": "<string>",
  "attributeOptionId": "<string>"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": "<string>",
    "memberId": 123,
    "attributeOptionId": "<string>"
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

userId

number

required

#### Body

application/json

attributeId

string

required

value

string

attributeOptionId

string

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

[[docs-api-reference-v2-orgs-attributes-options-get-all-assigned-attribute-options-by-attribute-slug|Get all assigned attribute options by attribute slug]][[docs-api-reference-v2-orgs-attributes-options-get-all-attribute-options-for-a-user|Get all attribute options for a user]]
