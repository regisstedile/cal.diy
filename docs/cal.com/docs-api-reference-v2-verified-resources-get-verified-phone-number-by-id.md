---
title: "Get verified phone number by id"
source: "https://cal.com/docs/api-reference/v2/verified-resources/get-verified-phone-number-by-id"
tags: [cal-com, docs]
---
# Get verified phone number by id

Copy page

If accessed using an OAuth access token, the `VERIFIED_RESOURCES_READ` scope is required.

Copy page

GET

/

v2

/

verified-resources

/

phones

/

{id}

Try it

Get verified phone number by id

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/verified-resources/phones/{id} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 789,
    "phoneNumber": "+37255556666",
    "userId": 45
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Path Parameters

id

number

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

[[docs-api-reference-v2-verified-resources-get-verified-email-by-id|Get verified email by id]][[docs-api-reference-v2-managed-orgs-create-an-organization-within-an-organization|Create an organization within an organization]]
