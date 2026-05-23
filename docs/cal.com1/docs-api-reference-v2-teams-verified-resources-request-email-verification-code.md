---
title: "Request email verification code"
source: "https://cal.com/docs/api-reference/v2/teams-verified-resources/request-email-verification-code"
tags: [cal-com, docs]
---
# Request email verification code

Copy page

Sends a verification code to the Email. If accessed using an OAuth access token, the `TEAM_VERIFIED_RESOURCES_WRITE` scope is required.

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

request

Try it

Request email verification code

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/teams/{teamId}/verified-resources/emails/verification-code/request \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "acme@example.com"
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

`"acme@example.com"`

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

[[docs-api-reference-v2-teams-users-ooo-delete-an-out-of-office-entry-for-a-team-member|Delete an out-of-office entry for a team member]][[docs-api-reference-v2-teams-verified-resources-request-phone-number-verification-code|Request phone number verification code]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
