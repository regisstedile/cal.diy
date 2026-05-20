---
title: "Unassign an attribute from a user"
source: "https://cal.com/docs/api-reference/v2/orgs-attributes-options/unassign-an-attribute-from-a-user"
tags: [cal-com, docs]
---
# Unassign an attribute from a user

Copy page

Required membership role: `org admin`. PBAC permission: `organization.attributes.editUsers`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

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

options

/

{userId}

/

{attributeOptionId}

Try it

Unassign an attribute from a user

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/attributes/options/{userId}/{attributeOptionId} \
  --header 'Authorization: <authorization>'
```

200

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

attributeOptionId

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

[[docs-api-reference-v2-orgs-attributes-options-get-all-attribute-options-for-a-user|Get all attribute options for a user]][[docs-api-reference-v2-orgs-bookings-get-organization-bookings|Get organization bookings]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
