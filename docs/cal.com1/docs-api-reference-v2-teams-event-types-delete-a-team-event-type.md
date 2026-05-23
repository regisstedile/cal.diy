---
title: "Delete a team event type"
source: "https://cal.com/docs/api-reference/v2/teams-event-types/delete-a-team-event-type"
tags: [cal-com, docs]
---
# Delete a team event type

Copy page

If accessed using an OAuth access token, the `TEAM_EVENT_TYPE_WRITE` scope is required.

Copy page

DELETE

/

v2

/

teams

/

{teamId}

/

event-types

/

{eventTypeId}

Try it

Delete a team event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/teams/{teamId}/event-types/{eventTypeId} \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Team Meeting"
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

teamId

number

required

eventTypeId

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

[[docs-api-reference-v2-teams-event-types-update-a-team-event-type|Update a team event type]][[docs-api-reference-v2-teams-event-types-create-a-phone-call|Create a phone call]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
