---
title: "Get list of verified emails"
source: "https://cal.com/docs/api-reference/v2/verified-resources/get-list-of-verified-emails"
tags: [cal-com, docs]
---
# Get list of verified emails

Copy page

If accessed using an OAuth access token, the `VERIFIED_RESOURCES_READ` scope is required.

Copy page

GET

/

v2

/

verified-resources

/

emails

Try it

Get list of verified emails

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/verified-resources/emails \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 789,
      "email": "user@example.com",
      "userId": 45
    }
  ]
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-verified-resources-verify-a-phone-number|Verify a phone number]][[docs-api-reference-v2-verified-resources-get-list-of-verified-phone-numbers|Get list of verified phone numbers]]
