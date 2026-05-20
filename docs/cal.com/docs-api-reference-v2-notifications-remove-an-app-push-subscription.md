---
title: "Remove an app push subscription"
source: "https://cal.com/docs/api-reference/v2/notifications/remove-an-app-push-subscription"
tags: [cal-com, docs]
---
# Remove an app push subscription

Copy page

Copy page

DELETE

/

v2

/

notifications

/

subscriptions

/

app-push

Try it

Remove an app push subscription

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/notifications/subscriptions/app-push \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
}
'
```

200

```
{
  "status": "success",
  "message": "App push subscription removed successfully"
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Body

application/json

token

string

required

Expo Push Token to remove

Pattern: `EXPO_PUSH_TOKEN_REGEX`

Example:

`"ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"`

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

message

string

required

Example:

`"App push subscription removed successfully"`

Was this page helpful?

Yes No

[[docs-api-reference-v2-notifications-register-an-app-push-subscription|Register an app push subscription]][[docs-api-reference-v2-credits-check-available-credits|Check available credits]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
