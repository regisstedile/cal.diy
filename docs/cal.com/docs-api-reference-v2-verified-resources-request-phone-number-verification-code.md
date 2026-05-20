---
title: "Request phone number verification code"
source: "https://cal.com/docs/api-reference/v2/verified-resources/request-phone-number-verification-code"
tags: [cal-com, docs]
---
# Request phone number verification code

Copy page

Sends a verification code to the phone number. If accessed using an OAuth access token, the `VERIFIED_RESOURCES_WRITE` scope is required.

Copy page

POST

/

v2

/

verified-resources

/

phones

/

verification-code

/

request

Try it

Request phone number verification code

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/verified-resources/phones/verification-code/request \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "phone": "+372 5555 6666"
}
'
```

200

```
{
  "status": "success"
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_, managed user access token, or OAuth access token

#### Body

application/json

phone

string

required

Phone number to verify.

Example:

`"+372 5555 6666"`

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

Was this page helpful?

Yes No

[[docs-api-reference-v2-verified-resources-request-email-verification-code|Request email verification code]][[docs-api-reference-v2-verified-resources-verify-an-email|Verify an email]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
