---
title: "Save delegation credentials for your organization"
source: "https://cal.com/docs/api-reference/v2/orgs-delegation-credentials/save-delegation-credentials-for-your-organization"
tags: [cal-com, docs]
---
# Save delegation credentials for your organization

Copy page

Required membership role: `org admin`. PBAC permission: `organization.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

delegation-credentials

Try it

Save delegation credentials for your organization

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/delegation-credentials \
  --header 'Content-Type: application/json' \
  --data '
{
  "workspacePlatformSlug": "<string>",
  "domain": "<string>",
  "serviceAccountKey": [
    {
      "private_key": "<string>",
      "client_email": "<string>",
      "client_id": "<string>"
    }
  ]
}
'
```

201

```
{
  "status": "success",
  "data": {
    "id": "<string>",
    "enabled": true,
    "domain": "<string>",
    "organizationId": 123,
    "workspacePlatform": {
      "name": "<string>",
      "slug": "<string>"
    },
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
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

orgId

number

required

#### Body

application/json

workspacePlatformSlug

string

required

domain

string

required

serviceAccountKey

object[]

required

*   Option 1 
*   Option 2 

Show child attributes

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

[[docs-api-reference-v2-orgs-bookings-report-an-organization-booking|Report an organization booking]][[docs-api-reference-v2-orgs-delegation-credentials-update-delegation-credentials-of-your-organization|Update delegation credentials of your organization]]
