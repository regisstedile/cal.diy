---
title: "Verify an email"
source: "https://cal.com/docs/api-reference/v2/verified-resources/verify-an-email"
tags: [cal-com, docs]
---
# Verify an email

Copy page

Use code to verify an email. If accessed using an OAuth access token, the `VERIFIED_RESOURCES_WRITE` scope is required.

Copy page

POST

/

v2

/

verified-resources

/

emails

/

verification-code

/

verify

Try it

Verify an email

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/verified-resources/emails/verification-code/verify \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "example@acme.com",
  "code": "1ABG2C"
}
'
```

200

```
{
  "status": "success",
  "data": {
    "id": 789,
    "email": "user@example.com",
    "userId": 45
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Body

application/json

email

string

required

Email to verify.

Example:

`"example@acme.com"`

code

string

required

verification code sent to the email to verify

Example:

`"1ABG2C"`

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

[[docs-api-reference-v2-verified-resources-request-phone-number-verification-code|Request phone number verification code]][[docs-api-reference-v2-verified-resources-verify-a-phone-number|Verify a phone number]]
