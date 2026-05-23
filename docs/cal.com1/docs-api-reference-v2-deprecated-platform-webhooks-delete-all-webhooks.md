---
title: "Delete all webhooks"
source: "https://cal.com/docs/api-reference/v2/deprecated:-platform-webhooks/delete-all-webhooks"
tags: [cal-com, docs]
---
# Delete all webhooks

Copy page

These endpoints are deprecated and will be removed in the future.

Copy page

DELETE

/

v2

/

oauth-clients

/

{clientId}

/

webhooks

Try it

Delete all webhooks

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/oauth-clients/{clientId}/webhooks \
  --header 'Authorization: Bearer <token>' \
  --header 'x-cal-secret-key: <x-cal-secret-key>'
```

200

```
{
  "status": "success",
  "data": "<string>"
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

string

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-deprecated-platform-webhooks-get-all-webhooks|Get all webhooks]][[docs-api-reference-v2-deprecated-platform-webhooks-update-a-webhook|Update a webhook]]
