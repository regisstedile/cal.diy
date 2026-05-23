---
title: "Register an app push subscription"
source: "https://cal.com/docs/api-reference/v2/notifications/register-an-app-push-subscription"
tags: [cal-com, docs]
---
# Register an app push subscription

Copy page

Copy page

POST

/

v2

/

notifications

/

subscriptions

/

app-push

Try it

Register an app push subscription

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/notifications/subscriptions/app-push \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "platform": "IOS",
  "deviceId": "device-uuid-123"
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": 123,
    "userId": 123,
    "type": "<string>",
    "platform": "<string>",
    "identifier": "<string>",
    "deviceId": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
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

Expo Push Token

Pattern: `EXPO_PUSH_TOKEN_REGEX`

Example:

`"ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"`

platform

enum<string>

required

Mobile platform

Available options:

`IOS`,

`ANDROID`

Example:

`"IOS"`

deviceId

string

required

Unique device identifier

Example:

`"device-uuid-123"`

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

[[docs-api-reference-v2-out-of-office-delete-an-out-of-office-entry-for-the-authenticated-user|Delete an out-of-office entry for the authenticated user]][[docs-api-reference-v2-notifications-remove-an-app-push-subscription|Remove an app push subscription]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
