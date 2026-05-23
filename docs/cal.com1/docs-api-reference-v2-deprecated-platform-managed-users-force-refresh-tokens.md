---
title: "Force refresh tokens"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-managed-users/force-refresh-tokens"
tags: [cal-com, docs]
---
# Force refresh tokens

Copy page

These endpoints are deprecated and will be removed in the future.

 If you have lost managed user access or refresh token, then you can get new ones by using OAuth credentials. Access token is valid for 60 minutes and refresh token for 1 year. Make sure to store them in your database, for example, in your User database model `calAccessToken` and `calRefreshToken` fields. Response also contains `accessTokenExpiresAt` and `refreshTokenExpiresAt` fields, but if you decode the jwt token the payload will contain `clientId` (OAuth client ID), `ownerId` (user to whom token belongs ID), `iat` (issued at time) and `expiresAt` (when does the token expire) fields.

Copy page

POST

/

v2

/

oauth-clients

/

{clientId}

/

users

/

{userId}

/

force-refresh

Try it

Force refresh tokens

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/users/{userId}/force-refresh \
  --header 'Authorization: Bearer <token>' \
  --header 'x-cal-secret-key: <x-cal-secret-key>'
```

200

```
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "accessTokenExpiresAt": 123,
    "refreshTokenExpiresAt": 123
  }
}
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

x-cal-secret-key

string

required

OAuth client secret key

#### Path Parameters

userId

number

required

clientId

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

[[docs-api-reference-v2-deprecated-platform-managed-users-delete-a-managed-user|Delete a managed user]][[docs-api-reference-v2-deprecated-platform-managed-users-refresh-managed-user-tokens|Refresh managed user tokens]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
