---
title: "Verify a phone number for an org team"
source: "https://cal.com/docs/api-reference/v2/organization-team-verified-resources/verify-a-phone-number-for-an-org-team"
tags: [cal-com, docs]
---
# Verify a phone number for an org team

Copy page

Use code to verify a phone number. Required membership role: `team admin`. PBAC permission: `team.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_VERIFIED_RESOURCES_WRITE` scope is required.

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

teams

/

{teamId}

/

verified-resources

/

phones

/

verification-code

/

verify

Try it

Verify a phone number for an org team

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/verified-resources/phones/verification-code/verify \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "phone": "+37255556666",
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
    "phoneNumber": "+37255556666",
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

orgId

number

required

#### Body

application/json

phone

string

required

phone number to verify.

Example:

`"+37255556666"`

code

string

required

verification code sent to the phone number to verify

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

[[docs-api-reference-v2-organization-team-verified-resources-verify-an-email-for-an-org-team|Verify an email for an org team]][[docs-api-reference-v2-organization-team-verified-resources-get-list-of-verified-emails-of-an-org-team|Get list of verified emails of an org team]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
