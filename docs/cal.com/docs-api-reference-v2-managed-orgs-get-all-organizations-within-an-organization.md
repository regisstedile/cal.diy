---
title: "Get all organizations within an organization"
source: "https://cal.com/docs/api-reference/v2/managed-orgs/get-all-organizations-within-an-organization"
tags: [cal-com, docs]
---
# Get all organizations within an organization

Copy page

For platform, the plan must be ‘SCALE’ or higher to access this endpoint. Required membership role: `org admin`. PBAC permission: `organization.read`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

organizations

Try it

Get all organizations within an organization

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/organizations?take=250' \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 123,
      "name": "<string>",
      "slug": "<string>",
      "metadata": {
        "key": "value"
      }
    }
  ],
  "pagination": {
    "totalItems": 123,
    "remainingItems": 103,
    "returnedItems": 10,
    "itemsPerPage": 10,
    "currentPage": 2,
    "totalPages": 13,
    "hasNextPage": true,
    "hasPreviousPage": true
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

#### Query Parameters

take

number

default:250

Maximum number of items to return

Required range: `1 <= x <= 250`

Example:

`25`

skip

number

default:0

Number of items to skip

Required range: `x >= 0`

Example:

`0`

slug

string

The slug of the managed organization

Example:

`"organization-slug"`

metadataKey

string

The key of the metadata - it is case sensitive so provide exactly as stored. If you provide it then you must also provide metadataValue

Example:

`"metadata-key"`

metadataValue

string

The value of the metadata - it is case sensitive so provide exactly as stored. If you provide it then you must also provide metadataKey

Example:

`"metadata-value"`

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

pagination

object

required

Show child attributes

Was this page helpful?

Yes No

[[docs-api-reference-v2-managed-orgs-create-an-organization-within-an-organization|Create an organization within an organization]][[docs-api-reference-v2-managed-orgs-get-an-organization-within-an-organization|Get an organization within an organization]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
