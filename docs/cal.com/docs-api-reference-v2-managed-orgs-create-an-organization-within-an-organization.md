---
title: "Create an organization within an organization"
source: "https://cal.com/docs/api-reference/v2/managed-orgs/create-an-organization-within-an-organization"
tags: [cal-com, docs]
---
# Create an organization within an organization

Copy page

For platform, the plan must be ‘SCALE’ or higher to access this endpoint. Required membership role: `org admin`. PBAC permission: `organization.create`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

organizations

Try it

Create an organization within an organization

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/organizations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "CalTeam",
  "apiKeyDaysValid": 30,
  "apiKeyNeverExpires": true,
  "slug": "cal-tel",
  "metadata": {
    "key": "value"
  }
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "<string>",
    "apiKey": "<string>",
    "slug": "<string>",
    "metadata": {
      "key": "value"
    }
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

For platform customers - OAuth client secret key

x-cal-client-id

string

For platform customers - OAuth client ID

#### Path Parameters

orgId

number

required

#### Body

application/json

name

string

required

Name of the organization

Minimum string length: `1`

Example:

`"CalTeam"`

apiKeyDaysValid

number

default:30

For how many days is managed organization api key valid. Defaults to 30 days.

Required range: `x >= 1`

Example:

`60`

apiKeyNeverExpires

boolean

If true, organization api key never expires.

Example:

`true`

slug

string

Organization slug in kebab-case - if not provided will be generated automatically based on name.

Example:

`"cal-tel"`

metadata

object

You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters. Values can be strings (up to 500 characters), numbers, or booleans.

Example:

`{ "key": "value" }`

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

[[docs-api-reference-v2-verified-resources-get-verified-phone-number-by-id|Get verified phone number by id]][[docs-api-reference-v2-managed-orgs-get-all-organizations-within-an-organization|Get all organizations within an organization]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
