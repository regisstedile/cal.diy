---
title: "Delete organization team workflow"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-workflows/delete-organization-team-workflow"
tags: [cal-com, docs]
---
# Delete organization team workflow

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

Try it

Delete organization team workflow

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/workflows/{workflowId}
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

[[docs-api-reference-v2-orgs-teams-workflows-update-organization-team-workflow|Update organization team workflow]][[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-routing-form-workflow|Get organization team routing form workflow]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
