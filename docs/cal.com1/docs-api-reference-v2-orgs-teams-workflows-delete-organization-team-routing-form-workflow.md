---
title: "Delete organization team routing-form workflow"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-workflows/delete-organization-team-routing-form-workflow"
tags: [cal-com, docs]
---
# Delete organization team routing-form workflow

Copy page

Required membership role: `team admin`. PBAC permission: `workflow.delete`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_WORKFLOW_WRITE` scope is required.

Copy page

DELETE

/

v2

/

organizations

/

{orgId}

/

teams

/

{teamId}

/

workflows

/

{workflowId}

/

routing-form

Try it

Delete organization team routing-form workflow

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}/routing-form
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

teamId

number

required

workflowId

number

required

orgId

number

required

#### Response

200 - undefined

Was this page helpful?

Yes No

[[docs-api-reference-v2-orgs-teams-workflows-update-organization-routing-form-team-workflow|Update organization routing form team workflow]][[docs-api-reference-v2-orgs-webhooks-get-all-webhooks|Get all webhooks]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
