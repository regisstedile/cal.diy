---
title: "Create a user"
source: "https://cal.com/docs/api-reference/v2/orgs-users/create-a-user"
tags: [cal-com, docs]
---
# Create a user

Copy page

Required membership role: `org admin`. PBAC permission: `organization.invite`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `ORG_MEMBERSHIP_WRITE` scope is required.

Copy page

POST

/

v2

/

organizations

/

{orgId}

/

users

Try it

Create a user

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/users \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "username": "user123",
  "weekday": "Monday",
  "brandColor": "#FFFFFF",
  "bio": "I am a bio",
  "metadata": {
    "key": "value"
  },
  "darkBrandColor": "#000000",
  "hideBranding": false,
  "timeZone": "America/New_York",
  "theme": "dark",
  "appTheme": "light",
  "timeFormat": 24,
  "defaultScheduleId": 1,
  "locale": "en",
  "avatarUrl": "https://example.com/avatar.jpg",
  "organizationRole": "MEMBER",
  "autoAccept": true,
  "skipNotificationEmail": false
}
'
```

201

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

#### Body

application/json

email

string

required

User email address

Example:

`"user@example.com"`

username

string

Username

Example:

`"user123"`

weekday

string

Preferred weekday

Example:

`"Monday"`

brandColor

string

Brand color in HEX format

Example:

`"#FFFFFF"`

bio

string

Bio

Example:

`"I am a bio"`

metadata

object

You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.

Example:

`{ "key": "value" }`

darkBrandColor

string

Dark brand color in HEX format

Example:

`"#000000"`

hideBranding

boolean

Hide branding

Example:

`false`

timeZone

string

Time zone

Example:

`"America/New_York"`

theme

string | null

Theme

Example:

`"dark"`

appTheme

string | null

Application theme

Example:

`"light"`

timeFormat

number

Time format

Example:

`24`

defaultScheduleId

number

Default schedule ID

Required range: `x >= 0`

Example:

`1`

locale

string | null

default:en

Locale

Example:

`"en"`

avatarUrl

string

Avatar URL

Example:

`"https://example.com/avatar.jpg"`

organizationRole

enum<string>

default:MEMBER

Available options:

`MEMBER`,

`ADMIN`,

`OWNER`

autoAccept

boolean

default:true

Must be true to ensure the organization membership is created in accepted state. If false, the user will have a pending membership and will not be able to access the organization.

skipNotificationEmail

boolean

default:false

If true, the signup notification email will not be sent to the new user.

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

[[docs-api-reference-v2-orgs-users-get-all-users|Get all users]][[docs-api-reference-v2-orgs-users-update-a-user|Update a user]]
