---
title: "Delete a user"
source: "https://cal.com/docs/api-reference/v2/orgs-users/delete-a-user"
tags: [cal-com, docs]
---
# Delete a user

Copy page

Required membership role: `org admin`. PBAC permission: `organization.remove`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_MEMBERSHIP_WRITE` scope is required.

Copy page

DELETE

/

v2

/

organizations

/

{orgId}

/

users

/

{userId}

Try it

Delete a user

cURL

```
curl --request DELETE \
  --url https://api.cal.com/v2/organizations/{orgId}/users/{userId}
```

200

```
{
  "status": "success",
  "data": {
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

userId

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

[[docs-api-reference-v2-orgs-users-update-a-user|Update a user]][[docs-api-reference-v2-orgs-users-bookings-get-all-bookings-for-an-organization-user|Get all bookings for an organization user]]
