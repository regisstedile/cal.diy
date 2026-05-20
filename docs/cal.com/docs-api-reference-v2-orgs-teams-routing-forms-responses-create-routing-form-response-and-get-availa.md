---
title: "Create routing form response and get available slots"
source: "https://cal.com/docs/api-reference/v2/orgs-teams-routing-forms-responses/create-routing-form-response-and-get-available-slots"
tags: [cal-com, docs]
---
# Create routing form response and get available slots

Copy page

Required membership role: `team member`. PBAC permission: `routingForm.create`. Learn more about API access control at [[docs-api-reference-v2-access-control|https://cal.com/docs/api-reference/v2/access-control]]. If accessed using an OAuth access token, the `TEAM_ROUTING_FORM_WRITE` scope is required.

Copy page

POST

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

routing-forms

/

{routingFormId}

/

responses

Try it

Create routing form response and get available slots

cURL

```
curl --request POST \
  --url https://api.cal.com/v2/organizations/{orgId}/teams/{teamId}/routing-forms/{routingFormId}/responses \
  --header 'Authorization: <authorization>'
```

201

```
{
  "status": "success",
  "data": {
    "eventTypeId": 123,
    "routing": {
      "eventTypeId": 123,
      "routing": {
        "teamMemberIds": [
          101,
          102
        ],
        "teamMemberEmail": "john.doe@example.com",
        "skipContactOwner": true
      }
    },
    "routingCustomMessage": "This is a custom message.",
    "routingExternalRedirectUrl": "https://example.com/",
    "slots": {}
  }
}
```

#### Headers

Authorization

string

required

value must be `Bearer <token>` where `<token>` is api key prefixed with cal_

#### Path Parameters

orgId

number

required

teamId

number

required

routingFormId

string

required

#### Query Parameters

start

string

required

`Time starting from which available slots should be checked.  Must be in UTC timezone as ISO 8601 datestring.    You can pass date without hours which defaults to start of day or specify hours:  2024-08-13 (will have hours 00:00:00 aka at very beginning of the date) or you can specify hours manually like 2024-08-13T09:00:00Z`

Example:

`"2050-09-05"`

end

string

required

`Time until which available slots should be checked.    Must be in UTC timezone as ISO 8601 datestring.    You can pass date without hours which defaults to end of day or specify hours:  2024-08-20 (will have hours 23:59:59 aka at the very end of the date) or you can specify hours manually like 2024-08-20T18:00:00Z`

Example:

`"2050-09-06"`

timeZone

string

Time zone in which the available slots should be returned. Defaults to UTC.

Example:

`"Europe/Rome"`

duration

number

If event type has multiple possible durations then you can specify the desired duration here. Also, if you are fetching slots for a dynamic event then you can specify the duration her which defaults to 30, meaning that returned slots will be each 30 minutes long.

Example:

`"60"`

format

enum<string>

Format of slot times in response. Use 'range' to get start and end times.

Available options:

`range`,

`time`

Example:

`"range"`

bookingUidToReschedule

string

The unique identifier of the booking being rescheduled. When provided will ensure that the original booking time appears within the returned available slots when rescheduling.

Example:

`"abc123def456"`

queueResponse

boolean

Whether to queue the form response.

Example:

`true`

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

[[docs-api-reference-v2-orgs-teams-routing-forms-responses-get-organization-team-routing-form-responses|Get organization team routing form responses]][[docs-api-reference-v2-orgs-teams-routing-forms-responses-update-routing-form-response|Update routing form response]]
