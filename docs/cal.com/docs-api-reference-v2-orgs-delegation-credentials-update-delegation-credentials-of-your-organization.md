---
title: "Update delegation credentials of your organization"
source: "https://cal.com/docs/api-reference/v2/orgs-delegation-credentials/update-delegation-credentials-of-your-organization"
tags: [cal-com, docs]
---
# Update delegation credentials of your organization

Copy page

Required membership role: `org admin`. PBAC permission: `organization.update`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]

Copy page

PATCH

/

v2

/

organizations

/

{orgId}

/

delegation-credentials

/

{credentialId}

Try it

Update delegation credentials of your organization

cURL

```
curl --request PATCH \
  --url https://api.cal.com/v2/organizations/{orgId}/delegation-credentials/{credentialId} \
  --header 'Content-Type: application/json' \
  --data '
{
  "enabled": true,
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

200

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

credentialId

string

required

#### Body

application/json

enabled

boolean

serviceAccountKey

object[]

*   Option 1 
*   Option 2 

Show child attributes

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

[[docs-api-reference-v2-orgs-delegation-credentials-save-delegation-credentials-for-your-organization|Save delegation credentials for your organization]][[docs-api-reference-v2-orgs-delegation-credentials-delete-delegation-credentials-of-your-organization|Delete delegation credentials of your organization]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
