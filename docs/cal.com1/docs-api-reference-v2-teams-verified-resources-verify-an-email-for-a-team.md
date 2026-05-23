---
title: "Verify an email for a team"
source: "https://cal.com/docs/api-reference/v2/teams-verified-resources/verify-an-email-for-a-team"
tags: [cal-com, docs]
---
# Verify an email for a team

Copy page

Use code to verify an email. If accessed using an OAuth access token, the `TEAM_VERIFIED_RESOURCES_WRITE` scope is required.

Copy page

POST

/

v2

/

teams

/

{teamId}

/

verified-resources

/

emails

/

verification-code

/

verify

Try it

Verify an email for a team

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams/{teamId}/verified-resources/emails/verification-code/verify \
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
    "teamId": 89,
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

teamId

number

required

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

[[docs-api-reference-v2-teams-verified-resources-request-phone-number-verification-code|Request phone number verification code]][[docs-api-reference-v2-teams-verified-resources-verify-a-phone-number-for-an-org-team|Verify a phone number for an org team]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
