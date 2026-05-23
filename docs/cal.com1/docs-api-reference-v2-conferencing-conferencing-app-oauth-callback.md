---
title: "Conferencing app OAuth callback"
source: "https://cal.com/docs/api-reference/v2/conferencing/conferencing-app-oauth-callback"
tags: [cal-com, docs]
---
# Conferencing app OAuth callback

Copy page

Copy page

GET

/

v2

/

conferencing

/

{app}

/

oauth

/

callback

Try it

Conferencing app OAuth callback

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/conferencing/{app}/oauth/callback \
  --header 'Authorization: Bearer <token>'
```

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

app

enum<string>

required

Conferencing application type

Available options:

`zoom`,

`msteams`

#### Query Parameters

state

string

required

code

string

required

#### Response

200 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-conferencing-get-oauth-conferencing-app-auth-url|Get OAuth conferencing app auth URL]][[docs-api-reference-v2-conferencing-list-your-conferencing-applications|List your conferencing applications]]
