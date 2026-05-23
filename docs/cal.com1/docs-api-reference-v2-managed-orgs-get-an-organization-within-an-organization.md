---
title: "Get an organization within an organization"
source: "https://cal.com/docs/api-reference/v2/managed-orgs/get-an-organization-within-an-organization"
tags: [cal-com, docs]
---
# Get an organization within an organization

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

/

{managedOrganizationId}

Try it

Get an organization within an organization

cURL

```
curl --request GET \
  --url https://api.cal.com/v2/organizations/{orgId}/organizations/{managedOrganizationId} \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "<string>",
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

managedOrganizationId

number

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

[[docs-api-reference-v2-managed-orgs-get-all-organizations-within-an-organization|Get all organizations within an organization]][[docs-api-reference-v2-managed-orgs-update-an-organization-within-an-organization|Update an organization within an organization]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
