---
title: "Update routing form response"
source: "https://cal.com/docs/api-reference/v2/orgs-routing-forms/update-routing-form-response"
tags: [cal-com, docs]
---
# Update routing form response

Copy page

Required membership role: `org admin`. PBAC permission: `routingForm.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_ROUTING_FORM_WRITE` scope is required.

Copy page

PATCH

/

v2

/

organizations

/

{orgId}

/

routing-forms

/

{routingFormId}

/

responses

/

{responseId}

Try it

Update routing form response

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/routing-forms/{routingFormId}/responses/{responseId} \
  --header 'Authorization: <authorization>' \
  --header 'Content-Type: application/json' \
  --data '{
  "response": {}
}'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "formId": "<string>",
    "formFillerId": "<string>",
    "routedToBookingUid": "<string>",
    "response": {
      "f00b26df-f54b-4985-8d98-17c5482c6a24": {
        "label": "participant",
        "value": "mamut"
      }
    },
    "createdAt": "2023-11-07T05:31:56Z"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

orgId

number

required

routingFormId

string

required

responseId

number

required

#### Body

application/json

response

object

The updated response data

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

[[docs-api-reference-v2-orgs-routing-forms-create-routing-form-response-and-get-available-slots|Create routing form response and get available slots]][[docs-api-reference-v2-orgs-schedules-get-all-schedules|Get all schedules]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
