---
title: "Delete a webhook"
source: "https://cal.com/docs/api-reference/v2/orgs-webhooks/delete-a-webhook"
tags: [cal-com, docs]
---
# Delete a webhook

Copy page

Required membership role: `org admin`. PBAC permission: `webhook.delete`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_WEBHOOK_WRITE` scope is required.

Copy page

DELETE

/

v2

/

organizations

/

{orgId}

/

webhooks

/

{webhookId}

Try it

Delete a webhook

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/webhooks/{webhookId}
```

200

```
{
  "status": "success",
  "data": {
    "payloadTemplate": "{\"content\":\"A new event has been scheduled\",\"type\":\"{{type}}\",\"name\":\"{{title}}\",\"organizer\":\"{{organizer.name}}\",\"booker\":\"{{attendees.0.name}}\"}",
    "triggers": [
      "BOOKING_CREATED"
    ],
    "teamId": 123,
    "id": 123,
    "subscriberUrl": "<string>",
    "active": true,
    "secret": "<string>"
  }
}
```

#### Headers

Authorization

string

For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

x-cal-secret-key

string

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

webhookId

string

required

orgId

number

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

[[docs-api-reference-v2-orgs-webhooks-get-a-webhook|Get a webhook]][[docs-api-reference-v2-orgs-webhooks-update-a-webhook|Update a webhook]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
