---
title: "Get all users"
source: "https://cal.com/docs/api-reference/v2/orgs-users/get-all-users"
tags: [cal-com, docs]
---
# Get all users

Copy page

Required membership role: `org admin`. PBAC permission: `organization.listMembers`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_MEMBERSHIP_READ` scope is required.

Copy page

GET

/

v2

/

organizations

/

{orgId}

/

users

Try it

Get all users

cURL

```
curl --request GET \
  --url 'https://api.cal.com/v2/organizations/{orgId}/users?attributeQueryOperator=AND'
```

200

```
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "email": "john@example.com",
      "timeZone": "America/New_York",
      "weekStart": "Monday",
      "hideBranding": false,
      "createdDate": "2022-01-01T00:00:00Z",
      "profile": {
        "id": 1,
        "organizationId": 1,
        "userId": 1,
        "username": "john_doe"
      },
      "username": "john_doe",
      "name": "John Doe",
      "emailVerified": "2022-01-01T00:00:00Z",
      "bio": "I am a software developer",
      "avatarUrl": "https://example.com/avatar.jpg",
      "appTheme": "light",
      "theme": "default",
      "defaultScheduleId": 1,
      "locale": "en-US",
      "timeFormat": 12,
      "brandColor": "#ffffff",
      "darkBrandColor": "#000000",
      "allowDynamicBooking": true,
      "verified": true,
      "invitedTo": 1,
      "metadata": {
        "key": "value"
      }
    }
  ]
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

#### Query Parameters

take

number

The number of items to return

Required range: `1 <= x <= 1000`

Example:

`10`

skip

number

The number of items to skip

Required range: `x >= 0`

Example:

`0`

emails

string[]

The email address or an array of email addresses to filter by

Example:

`["user1@example.com", "user2@example.com"]`

assignedOptionIds

string[]

Filter by assigned attribute option ids. ids must be separated by a comma.

Example:

`"?assignedOptionIds=aaaaaaaa-bbbb-cccc-dddd-eeeeee1eee,aaaaaaaa-bbbb-cccc-dddd-eeeeee2eee"`

attributeQueryOperator

enum<string>

default:AND

Query operator used to filter assigned options, AND by default.

Available options:

`OR`,

`AND`,

`NONE`

Example:

`"NONE"`

teamIds

number[]

Filter by teamIds. Team ids must be separated by a comma.

Example:

`"?teamIds=100,200"`

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

[[docs-api-reference-v2-orgs-schedules-get-all-schedules|Get all schedules]][[docs-api-reference-v2-orgs-users-create-a-user|Create a user]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=calcom)
