---
title: "Exchange authorization code or refresh token for tokens"
source: "https://cal.com/docs/api-reference/v2/oauth2/exchange-authorization-code-or-refresh-token-for-tokens"
tags: [cal-com, docs]
---
Exchange authorization code or refresh token for tokens

OAuth2

RFC 6749-compliant token endpoint. Pass client_id in the request body (Section 2.3.1). Use grant_type ‘authorization_code’ to exchange an auth code for tokens, or ‘refresh_token’ to refresh an access token. Accepts both application/x-www-form-urlencoded (standard per RFC 6749 Section 4.1.3) and application/json content types.

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

Token request body. client_id is required. Accepts application/x-www-form-urlencoded (RFC 6749 standard) or application/json. Use grant_type 'authorization_code' with client_secret (confidential) or code_verifier (public/PKCE), or grant_type 'refresh_token' with client_secret (confidential) or just the refresh_token (public).

*   Option 1

*   Option 2

*   Option 3

*   Option 4

client_id

string

required

The client identifier

Example:

`"my-client-id"`

grant_type

enum<string>

required

The grant type — must be 'authorization_code'

Available options

:

`authorization_code`

Example:

`"authorization_code"`

code

string

required

The authorization code received from the authorize endpoint

Example:

`"abc123"`

redirect_uri

string

required

The redirect URI used in the authorization request

Example:

`"https://example.com/callback"`

client_secret

string

required

The client secret for confidential clients

#### Response

200 - application/json

access_token

string

required

The access token

Example:

`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`

token_type

string

required

The token type

Example:

`"bearer"`

refresh_token

string

required

The refresh token

Example:

`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`

expires_in

number

required

The number of seconds until the access token expires

Example:

`1800`

scope

string

required

The granted scopes (space-delimited per RFC 6749)

Example:

`"BOOKING_READ BOOKING_WRITE"`

Was this page helpful?

[[docs-api-reference-v2-oauth2-get-oauth2-client|Get OAuth2 client]][[docs-api-reference-v2-verified-resources-request-email-verification-code|Request email verification code]]
