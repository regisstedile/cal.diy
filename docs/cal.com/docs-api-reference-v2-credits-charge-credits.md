---
title: "Charge credits"
source: "https://cal.com/docs/api-reference/v2/credits/charge-credits"
tags: [cal-com, docs]
---
# Charge credits

Copy page

Charge credits for a completed AI agent interaction. Uses externalRef for idempotency to prevent double-charging.

Copy page

POST

/

v2

/

credits

/

charge

Try it

Charge credits

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/credits/charge \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "credits": 5,
  "creditFor": "AI_AGENT",
  "externalRef": "agent-thread-123-1711432800000"
}
'
```

200

`{}`

#### Authorizations

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

credits

number

required

Number of credits to charge

Required range: `x >= 1`

Example:

`5`

creditFor

enum<string>

required

What the credits are being charged for

Available options:

`SMS`,

`CAL_AI_PHONE_CALL`,

`AI_AGENT`

Example:

`"AI_AGENT"`

externalRef

string

Unique external reference for idempotency

Example:

`"agent-thread-123-1711432800000"`

#### Response

200 - application/json

The response is of type `object`.

Was this page helpful?

Yes No

[[docs-api-reference-v2-credits-check-available-credits|Check available credits]][[docs-api-reference-v2-calendars-save-an-ics-feed|Save an ICS feed]]
