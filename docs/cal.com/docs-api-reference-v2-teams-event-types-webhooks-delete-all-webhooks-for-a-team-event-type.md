---
title: "Delete all webhooks for a team event type"
source: "https://cal.com/docs/api-reference/v2/teams-event-types-webhooks/delete-all-webhooks-for-a-team-event-type"
tags: [cal-com, docs]
---
# Delete all webhooks for a team event type

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

/

webhooks

Try it

Delete all webhooks for a team event type

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/teams/{teamId}/event-types/{eventTypeId}/webhooks \
  --header 'Authorization: <authorization>'
```

200

```
{
  "status": "success",
  "data": "<string>"
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

eventTypeId

number

required

teamId

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

string

required

Was this page helpful?

Yes No

[[docs-api-reference-v2-teams-event-types-webhooks-get-all-webhooks-for-a-team-event-type|Get all webhooks for a team event type]][[docs-api-reference-v2-teams-event-types-webhooks-update-a-webhook-for-a-team-event-type|Update a webhook for a team event type]]
