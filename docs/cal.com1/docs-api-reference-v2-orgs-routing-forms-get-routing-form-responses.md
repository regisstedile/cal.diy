---
title: "Get routing form responses"
source: "https://cal.com/docs/api-reference/v2/orgs-routing-forms/get-routing-form-responses"
tags: [cal-com, docs]
---
# Get routing form responses

Copy page

Required membership role: `org admin`. PBAC permission: `routingForm.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_ROUTING_FORM_READ` scope is required.

Copy page

GET

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

Try it

Get routing form responses

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/routing-forms/{routingFormId}/responses \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": [
    {
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
  ]
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

#### Query Parameters

skip

number

Number of responses to skip

take

number

Number of responses to take

sortCreatedAt

enum<string>

Sort by creation time

Available options:

`asc`,

`desc`

sortUpdatedAt

enum<string>

Sort by update time

Available options:

`asc`,

`desc`

afterCreatedAt

string<date-time>

Filter by responses created after this date

beforeCreatedAt

string<date-time>

Filter by responses created before this date

afterUpdatedAt

string<date-time>

Filter by responses created after this date

beforeUpdatedAt

string<date-time>

Filter by responses updated before this date

routedToBookingUid

string

Filter by responses routed to a specific booking

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

object[]

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-routing-forms-get-organization-routing-forms|Get organization routing forms]][[docs-api-reference-v2-orgs-routing-forms-create-routing-form-response-and-get-available-slots|Create routing form response and get available slots]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
