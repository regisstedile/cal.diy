---
title: "OAuth"
source: "https://cal.com/docs/api-reference/v2/oauth"
tags: [cal-com, docs]
---
As an example, you can view our OAuth flow in action on Zapier. Try to connect your Cal.com account [here](https://zapier.com/apps/calcom/integrations). To enable OAuth in one of your apps, you will need a Client ID, Client Secret, Authorization URL, Access Token Request URL, and Refresh Token Request URL.

#### Get your OAuth “Continue with [Cal.com](http://cal.com/)” Badge

*   [https://app.cal.com/continue-with-calcom-coss-ui.svg](https://app.cal.com/continue-with-calcom-coss-ui.svg)
*   [https://app.cal.com/continue-with-calcom-dark-rounded.svg](https://app.cal.com/continue-with-calcom-dark-rounded.svg)
*   [https://app.cal.com/continue-with-calcom-dark-squared.svg](https://app.cal.com/continue-with-calcom-dark-squared.svg)
*   [https://app.cal.com/continue-with-calcom-light-rounded.svg](https://app.cal.com/continue-with-calcom-light-rounded.svg)
*   [https://app.cal.com/continue-with-calcom-light-squared.svg](https://app.cal.com/continue-with-calcom-light-squared.svg)
*   [https://app.cal.com/continue-with-calcom-neutral-rounded.svg](https://app.cal.com/continue-with-calcom-neutral-rounded.svg)
*   [https://app.cal.com/continue-with-calcom-light-squared.svg](https://app.cal.com/continue-with-calcom-light-squared.svg)

## 1. OAuth Client Credentials

You can create an OAuth client via the following page [https://app.cal.com/settings/developer/oauth](https://app.cal.com/settings/developer/oauth). The OAuth client will be in a “pending” state and not yet ready to use. You must select at least one scope when creating the OAuth client. You can register up to 10 redirect URIs per OAuth client.An admin from Cal.com will then review your OAuth client and you will receive an email if it was accepted or rejected. If it was accepted then your OAuth client is ready to be used.

### Available Scopes

Scopes control which API endpoints the OAuth token can access. Once a user authorizes your client with a given set of scopes, the issued access token can only be used to call endpoints covered by those scopes — any request to an endpoint outside the granted scopes will be rejected. The following scopes are available:

| Scope | Description | Endpoints |
| --- | --- | --- |
| `EVENT_TYPE_READ` | View event types | [[docs-api-reference-v2-event-types-get-all-event-types|Get all event types]], [[docs-api-reference-v2-event-types-get-an-event-type|Get an event type]], [[docs-api-reference-v2-event-types-private-links-get-all-private-links-for-an-event-type|Get event type private links]], [[docs-api-reference-v2-event-types-webhooks-get-all-webhooks|Get all event type webhooks]], [[docs-api-reference-v2-event-types-webhooks-get-a-webhook|Get an event type webhook]] |
| `EVENT_TYPE_WRITE` | Create, edit, and delete event types | [[docs-api-reference-v2-event-types-create-an-event-type|Create an event type]], [[docs-api-reference-v2-event-types-update-an-event-type|Update an event type]], [[docs-api-reference-v2-event-types-delete-an-event-type|Delete an event type]], [[docs-api-reference-v2-event-types-private-links-create-a-private-link-for-an-event-type|Create a private link]], [[docs-api-reference-v2-event-types-private-links-update-a-private-link-for-an-event-type|Update a private link]], [[docs-api-reference-v2-event-types-private-links-delete-a-private-link-for-an-event-type|Delete a private link]], [[docs-api-reference-v2-event-types-webhooks-create-a-webhook|Create an event type webhook]], [[docs-api-reference-v2-event-types-webhooks-update-a-webhook|Update an event type webhook]], [[docs-api-reference-v2-event-types-webhooks-delete-a-webhook|Delete an event type webhook]], [[docs-api-reference-v2-event-types-webhooks-delete-all-webhooks|Delete all event type webhooks]] |
| `BOOKING_READ` | View bookings | [[docs-api-reference-v2-bookings-get-all-bookings|Get all bookings]], [[docs-api-reference-v2-bookings-get-all-the-recordings-for-the-booking|Get booking recordings]], [[docs-api-reference-v2-bookings-get-cal-video-real-time-transcript-download-links-for-the-booking|Get transcript download links]], [[docs-api-reference-v2-bookings-get-add-to-calendar-links-for-a-booking|Get calendar links]], [[docs-api-reference-v2-bookings-get-booking-references|Get booking references]], [[docs-api-reference-v2-bookings-get-video-meeting-sessions-only-supported-for-cal-video|Get conferencing sessions]], [[docs-api-reference-v2-bookings-attendees-get-all-attendees-for-a-booking|Get all attendees for a booking]], [[docs-api-reference-v2-bookings-attendees-get-a-specific-attendee-for-a-booking|Get a specific attendee]] |
| `BOOKING_WRITE` | Create, edit, and delete bookings | [[docs-api-reference-v2-bookings-guests-add-guests-to-an-existing-booking|Add guests to a booking]], [[docs-api-reference-v2-bookings-attendees-add-an-attendee-to-a-booking|Add an attendee to a booking]], [[docs-api-reference-v2-bookings-update-booking-location-for-an-existing-booking|Update booking location]], [[docs-api-reference-v2-bookings-mark-a-booking-absence|Mark a booking absence]], [[docs-api-reference-v2-bookings-request-to-reschedule-a-booking|Request to reschedule a booking]], [[docs-api-reference-v2-bookings-reassign-a-booking-to-auto-selected-host|Reassign to auto-selected host]], [[docs-api-reference-v2-bookings-reassign-a-booking-to-a-specific-host|Reassign to a specific host]], [[docs-api-reference-v2-bookings-confirm-a-booking|Confirm a booking]], [[docs-api-reference-v2-bookings-decline-a-booking|Decline a booking]] |
| `SCHEDULE_READ` | View availability | [[docs-api-reference-v2-schedules-get-all-schedules|Get all schedules]], [[docs-api-reference-v2-schedules-get-a-schedule|Get a schedule]], [[docs-api-reference-v2-schedules-get-default-schedule|Get default schedule]], [[docs-api-reference-v2-out-of-office-get-all-out-of-office-entries-for-the-authenticated-user|Get all out-of-office entries]] |
| `SCHEDULE_WRITE` | Create, edit, and delete availability | [[docs-api-reference-v2-schedules-create-a-schedule|Create a schedule]], [[docs-api-reference-v2-schedules-update-a-schedule|Update a schedule]], [[docs-api-reference-v2-schedules-delete-a-schedule|Delete a schedule]], [[docs-api-reference-v2-out-of-office-create-an-out-of-office-entry-for-the-authenticated-user|Create an out-of-office entry]], [[docs-api-reference-v2-out-of-office-update-an-out-of-office-entry-for-the-authenticated-user|Update an out-of-office entry]], [[docs-api-reference-v2-out-of-office-delete-an-out-of-office-entry-for-the-authenticated-user|Delete an out-of-office entry]] |
| `APPS_READ` | View connected apps | [[docs-api-reference-v2-calendars-get-all-calendars|Get all calendars]], [[docs-api-reference-v2-calendars-get-busy-times|Get busy times]], [[docs-api-reference-v2-calendars-check-an-ics-feed|Check an ICS feed]], [[docs-api-reference-v2-calendars-check-a-calendar-connection|Check a calendar connection]], [[docs-api-reference-v2-conferencing-list-your-conferencing-applications|List conferencing apps]], [[docs-api-reference-v2-conferencing-get-your-default-conferencing-application|Get default conferencing app]], [[docs-api-reference-v2-cal-unified-calendars-get-meeting-details-from-calendar|Get meeting details from calendar]] |
| `APPS_WRITE` | Connect and disconnect apps | [[docs-api-reference-v2-calendars-save-an-ics-feed|Save an ICS feed]], [[docs-api-reference-v2-calendars-get-oauth-connect-url|Get OAuth connect URL]], [[docs-api-reference-v2-calendars-save-apple-calendar-credentials|Save Apple calendar credentials]], [[docs-api-reference-v2-calendars-disconnect-a-calendar|Disconnect a calendar]], [[docs-api-reference-v2-conferencing-connect-your-conferencing-application|Connect a conferencing app]], [[docs-api-reference-v2-conferencing-get-oauth-conferencing-app-auth-url|Get conferencing OAuth URL]], [[docs-api-reference-v2-conferencing-set-your-default-conferencing-application|Set default conferencing app]], [[docs-api-reference-v2-conferencing-disconnect-your-conferencing-application|Disconnect a conferencing app]], [[docs-api-reference-v2-selected-calendars-add-a-selected-calendar|Add a selected calendar]], [[docs-api-reference-v2-selected-calendars-delete-a-selected-calendar|Delete a selected calendar]], [[docs-api-reference-v2-destination-calendars-update-destination-calendars|Update destination calendars]], [[docs-api-reference-v2-cal-unified-calendars-update-meeting-details-in-calendar|Update meeting details in calendar]] |
| `PROFILE_READ` | View personal info | [[docs-api-reference-v2-me-get-my-profile|Get my profile]], [[docs-api-reference-v2-me-get-my-booking-limits|Get my booking limits]] |
| `PROFILE_WRITE` | Edit personal info | [[docs-api-reference-v2-me-update-my-profile|Update my profile]], [[docs-api-reference-v2-me-update-my-booking-limits|Update my booking limits]], [[docs-api-reference-v2-me-clear-my-booking-limits|Clear my booking limits]] |
| `WEBHOOK_READ` | View webhooks | [[docs-api-reference-v2-webhooks-get-all-webhooks|Get all webhooks]], [[docs-api-reference-v2-webhooks-get-a-webhook|Get a webhook]] |
| `WEBHOOK_WRITE` | Create, edit, and delete webhooks | [[docs-api-reference-v2-webhooks-create-a-webhook|Create a webhook]], [[docs-api-reference-v2-webhooks-update-a-webhook|Update a webhook]], [[docs-api-reference-v2-webhooks-delete-a-webhook|Delete a webhook]] |
| `VERIFIED_RESOURCES_READ` | View verified emails and phone numbers | [[docs-api-reference-v2-verified-resources-get-list-of-verified-emails|Get list of verified emails]], [[docs-api-reference-v2-verified-resources-get-verified-email-by-id|Get verified email by id]], [[docs-api-reference-v2-verified-resources-get-list-of-verified-phone-numbers|Get list of verified phone numbers]], [[docs-api-reference-v2-verified-resources-get-verified-phone-number-by-id|Get verified phone number by id]] |
| `VERIFIED_RESOURCES_WRITE` | Request and verify emails and phone numbers | [[docs-api-reference-v2-verified-resources-request-email-verification-code|Request email verification code]], [[docs-api-reference-v2-verified-resources-verify-an-email|Verify an email]], [[docs-api-reference-v2-verified-resources-request-phone-number-verification-code|Request phone number verification code]], [[docs-api-reference-v2-verified-resources-verify-a-phone-number|Verify a phone number]] |

### Team Scopes

Team scopes control access to team-level resources. These are used for endpoints under `/v2/teams/:teamId/...` and `/v2/organizations/:orgId/teams/:teamId/...`.

| Scope | Description | Endpoints |
| --- | --- | --- |
| `TEAM_EVENT_TYPE_READ` | View team event types | [[docs-api-reference-v2-teams-event-types-get-team-event-types|Get team event types]], [[docs-api-reference-v2-teams-event-types-get-an-event-type|Get an event type]], [[docs-api-reference-v2-orgs-teams-event-types-get-team-event-types|Get team event types (org)]], [[docs-api-reference-v2-orgs-teams-event-types-get-an-event-type|Get an event type (org)]], [[docs-api-reference-v2-teams-event-types-webhooks-get-all-webhooks-for-a-team-event-type|Get all webhooks for a team event type]], [[docs-api-reference-v2-teams-event-types-webhooks-get-a-webhook-for-a-team-event-type|Get a webhook for a team event type]], [[docs-api-reference-v2-orgs-teams-event-types-private-links-get-all-private-links-for-a-team-event-type|Get all private links for a team event type]] |
| `TEAM_EVENT_TYPE_WRITE` | Create, edit, and delete team event types | [[docs-api-reference-v2-teams-event-types-create-an-event-type|Create an event type]], [[docs-api-reference-v2-teams-event-types-update-a-team-event-type|Update a team event type]], [[docs-api-reference-v2-teams-event-types-delete-a-team-event-type|Delete a team event type]], [[docs-api-reference-v2-teams-event-types-create-a-phone-call|Create a phone call]], [[docs-api-reference-v2-orgs-teams-event-types-create-an-event-type|Create an event type (org)]], [[docs-api-reference-v2-orgs-teams-event-types-update-a-team-event-type|Update a team event type (org)]], [[docs-api-reference-v2-orgs-teams-event-types-delete-a-team-event-type|Delete a team event type (org)]], [[docs-api-reference-v2-orgs-teams-event-types-create-a-phone-call|Create a phone call (org)]], [[docs-api-reference-v2-teams-event-types-webhooks-create-a-webhook-for-a-team-event-type|Create a webhook for a team event type]], [[docs-api-reference-v2-teams-event-types-webhooks-update-a-webhook-for-a-team-event-type|Update a webhook for a team event type]], [[docs-api-reference-v2-teams-event-types-webhooks-delete-a-webhook-for-a-team-event-type|Delete a webhook for a team event type]], [[docs-api-reference-v2-teams-event-types-webhooks-delete-all-webhooks-for-a-team-event-type|Delete all webhooks for a team event type]], [[docs-api-reference-v2-orgs-teams-event-types-private-links-create-a-private-link-for-a-team-event-type|Create a private link for a team event type]], [[docs-api-reference-v2-orgs-teams-event-types-private-links-update-a-private-link-for-a-team-event-type|Update a private link for a team event type]], [[docs-api-reference-v2-orgs-teams-event-types-private-links-delete-a-private-link-for-a-team-event-type|Delete a private link for a team event type]] |
| `TEAM_BOOKING_READ` | View team bookings | [[docs-api-reference-v2-teams-bookings-get-team-bookings|Get team bookings]], [[docs-api-reference-v2-orgs-teams-bookings-get-organization-team-bookings|Get organization team bookings]], [[docs-api-reference-v2-orgs-teams-bookings-get-booking-references|Get booking references]] |
| `TEAM_SCHEDULE_READ` | View team schedules | [[docs-api-reference-v2-teams-schedules-get-all-team-member-schedules|Get all team member schedules]], [[docs-api-reference-v2-orgs-teams-schedules-get-all-team-member-schedules|Get all team member schedules (org)]], [[docs-api-reference-v2-orgs-teams-users-schedules-get-schedules-of-a-team-member|Get schedules of a team member]], [[docs-api-reference-v2-teams-users-ooo-get-all-out-of-office-entries-for-a-team-member|Get all out-of-office entries for a team member]] |
| `TEAM_SCHEDULE_WRITE` | Create, edit, and delete team schedules | [[docs-api-reference-v2-teams-users-ooo-create-an-out-of-office-entry-for-a-team-member|Create an out-of-office entry for a team member]], [[docs-api-reference-v2-teams-users-ooo-update-an-out-of-office-entry-for-a-team-member|Update an out-of-office entry for a team member]], [[docs-api-reference-v2-teams-users-ooo-delete-an-out-of-office-entry-for-a-team-member|Delete an out-of-office entry for a team member]] |
| `TEAM_PROFILE_READ` | View team profiles | [[docs-api-reference-v2-teams-get-teams|Get teams]], [[docs-api-reference-v2-teams-get-a-team|Get a team]], [[docs-api-reference-v2-orgs-teams-get-a-team|Get a team (org)]] |
| `TEAM_PROFILE_WRITE` | Create, edit, and delete teams | [[docs-api-reference-v2-teams-create-a-team|Create a team]], [[docs-api-reference-v2-teams-update-a-team|Update a team]], [[docs-api-reference-v2-teams-delete-a-team|Delete a team]] |
| `TEAM_MEMBERSHIP_READ` | View team memberships | [[docs-api-reference-v2-teams-memberships-get-all-memberships|Get all memberships]], [[docs-api-reference-v2-teams-memberships-get-a-membership|Get a membership]], [[docs-api-reference-v2-orgs-teams-memberships-get-all-memberships|Get all memberships (org)]], [[docs-api-reference-v2-orgs-teams-memberships-get-a-membership|Get a membership (org)]] |
| `TEAM_MEMBERSHIP_WRITE` | Create, edit, and delete team memberships | [[docs-api-reference-v2-teams-memberships-create-a-membership|Create a membership]], [[docs-api-reference-v2-teams-memberships-update-membership|Update membership]], [[docs-api-reference-v2-teams-memberships-delete-a-membership|Delete a membership]], [[docs-api-reference-v2-teams-invite-create-team-invite-link|Create team invite link]], [[docs-api-reference-v2-orgs-teams-memberships-create-a-membership|Create a membership (org)]], [[docs-api-reference-v2-orgs-teams-memberships-update-a-membership|Update a membership (org)]], [[docs-api-reference-v2-orgs-teams-memberships-delete-a-membership|Delete a membership (org)]], [[docs-api-reference-v2-orgs-teams-invite-create-team-invite-link|Create team invite link (org)]] |
| `TEAM_APPS_READ` | View team connected apps | [[docs-api-reference-v2-orgs-teams-conferencing-list-team-conferencing-applications|List team conferencing applications]], [[docs-api-reference-v2-orgs-teams-conferencing-get-team-default-conferencing-application|Get team default conferencing application]] |
| `TEAM_APPS_WRITE` | Connect and disconnect team apps | [[docs-api-reference-v2-orgs-teams-conferencing-connect-your-conferencing-application-to-a-team|Connect your conferencing application to a team]], [[docs-api-reference-v2-orgs-teams-conferencing-get-oauth-conferencing-apps-auth-url-for-a-team|Get OAuth conferencing app’s auth URL for a team]], [[docs-api-reference-v2-orgs-teams-conferencing-set-team-default-conferencing-application|Set team default conferencing application]], [[docs-api-reference-v2-orgs-teams-conferencing-disconnect-team-conferencing-application|Disconnect team conferencing application]], [[docs-api-reference-v2-orgs-teams-conferencing-save-conferencing-app-oauth-credentials|Save conferencing app OAuth credentials]] |
| `TEAM_ROUTING_FORM_READ` | View team routing forms | [[docs-api-reference-v2-orgs-teams-routing-forms-get-team-routing-forms|Get team routing forms]], [[docs-api-reference-v2-orgs-teams-routing-forms-responses-get-organization-team-routing-form-responses|Get organization team routing form responses]] |
| `TEAM_ROUTING_FORM_WRITE` | Create, edit, and delete team routing form responses | [[docs-api-reference-v2-orgs-teams-routing-forms-responses-create-routing-form-response-and-get-available-slots|Create routing form response and get available slots]], [[docs-api-reference-v2-orgs-teams-routing-forms-responses-update-routing-form-response|Update routing form response]] |
| `TEAM_WORKFLOW_READ` | View team workflows | [[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-workflows|Get organization team workflows]], [[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-routing-form-workflows|Get organization team routing form workflows]], [[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-workflow|Get organization team workflow]], [[docs-api-reference-v2-orgs-teams-workflows-get-organization-team-routing-form-workflow|Get organization team routing form workflow]] |
| `TEAM_WORKFLOW_WRITE` | Create, edit, and delete team workflows | [[docs-api-reference-v2-orgs-teams-workflows-create-organization-team-workflow-for-event-types|Create organization team workflow for event-types]], [[docs-api-reference-v2-orgs-teams-workflows-create-organization-team-workflow-for-routing-forms|Create organization team workflow for routing-forms]], [[docs-api-reference-v2-orgs-teams-workflows-update-organization-team-workflow|Update organization team workflow]], [[docs-api-reference-v2-orgs-teams-workflows-update-organization-routing-form-team-workflow|Update organization routing form team workflow]], [[docs-api-reference-v2-orgs-teams-workflows-delete-organization-team-workflow|Delete organization team workflow]], [[docs-api-reference-v2-orgs-teams-workflows-delete-organization-team-routing-form-workflow|Delete organization team routing-form workflow]] |
| `TEAM_VERIFIED_RESOURCES_READ` | View team verified emails and phone numbers | [[docs-api-reference-v2-teams-verified-resources-get-list-of-verified-emails-of-a-team|Get list of verified emails of a team]], [[docs-api-reference-v2-teams-verified-resources-get-verified-email-of-a-team-by-id|Get verified email of a team by id]], [[docs-api-reference-v2-teams-verified-resources-get-list-of-verified-phone-numbers-of-a-team|Get list of verified phone numbers of a team]], [[docs-api-reference-v2-teams-verified-resources-get-verified-phone-number-of-a-team-by-id|Get verified phone number of a team by id]], [[docs-api-reference-v2-organization-team-verified-resources-get-list-of-verified-emails-of-an-org-team|Get list of verified emails of an org team]], [[docs-api-reference-v2-organization-team-verified-resources-get-verified-email-of-an-org-team-by-id|Get verified email of an org team by id]], [[docs-api-reference-v2-organization-team-verified-resources-get-list-of-verified-phone-numbers-of-an-org-team|Get list of verified phone numbers of an org team]], [[docs-api-reference-v2-organization-team-verified-resources-get-verified-phone-number-of-an-org-team-by-id|Get verified phone number of an org team by id]] |
| `TEAM_VERIFIED_RESOURCES_WRITE` | Request and verify team emails and phone numbers | [[docs-api-reference-v2-teams-verified-resources-request-email-verification-code|Request email verification code]], [[docs-api-reference-v2-teams-verified-resources-verify-an-email-for-a-team|Verify an email for a team]], [[docs-api-reference-v2-teams-verified-resources-request-phone-number-verification-code|Request phone number verification code]], [[docs-api-reference-v2-teams-verified-resources-verify-a-phone-number-for-an-org-team|Verify a phone number for a team]], [[docs-api-reference-v2-organization-team-verified-resources-request-email-verification-code|Request email verification code (org)]], [[docs-api-reference-v2-organization-team-verified-resources-verify-an-email-for-an-org-team|Verify an email for an org team]], [[docs-api-reference-v2-organization-team-verified-resources-request-phone-number-verification-code|Request phone number verification code (org)]], [[docs-api-reference-v2-organization-team-verified-resources-verify-a-phone-number-for-an-org-team|Verify a phone number for an org team]] |

### Organization Scopes

Organization scopes control access to organization-wide resources. These are used for endpoints under `/v2/organizations/:orgId/...` that do not target a specific team.

| Scope | Description | Endpoints |
| --- | --- | --- |
| `ORG_EVENT_TYPE_READ` | View all event types across the organization | [[docs-api-reference-v2-orgs-teams-event-types-get-all-team-event-types|Get all team event types]] |
| `ORG_BOOKING_READ` | View all bookings across the organization | [[docs-api-reference-v2-orgs-bookings-get-organization-bookings|Get organization bookings]], [[docs-api-reference-v2-orgs-users-bookings-get-all-bookings-for-an-organization-user|Get all bookings for an organization user]] |
| `ORG_SCHEDULE_READ` | View schedules across the organization | [[docs-api-reference-v2-orgs-schedules-get-all-schedules|Get all schedules]], [[docs-api-reference-v2-orgs-users-schedules-get-all-schedules|Get all schedules (user)]], [[docs-api-reference-v2-orgs-users-schedules-get-a-schedule|Get a schedule]], [[docs-api-reference-v2-orgs-users-ooo-get-all-out-of-office-entries-for-a-user|Get all out-of-office entries for a user]], [[docs-api-reference-v2-orgs-users-ooo-get-all-out-of-office-entries-for-organization-users|Get all out-of-office entries for organization users]] |
| `ORG_SCHEDULE_WRITE` | Create, edit, and delete schedules across the organization | [[docs-api-reference-v2-orgs-users-schedules-create-a-schedule|Create a schedule]], [[docs-api-reference-v2-orgs-users-schedules-update-a-schedule|Update a schedule]], [[docs-api-reference-v2-orgs-users-schedules-delete-a-schedule|Delete a schedule]], [[docs-api-reference-v2-orgs-users-ooo-create-an-out-of-office-entry-for-a-user|Create an out-of-office entry for a user]], [[docs-api-reference-v2-orgs-users-ooo-update-an-out-of-office-entry-for-a-user|Update an out-of-office entry for a user]], [[docs-api-reference-v2-orgs-users-ooo-delete-an-out-of-office-entry-for-a-user|Delete an out-of-office entry for a user]] |
| `ORG_PROFILE_READ` | View organization teams | [[docs-api-reference-v2-orgs-teams-get-all-teams|Get all teams]], [[docs-api-reference-v2-orgs-teams-get-teams-membership-for-user|Get teams membership for user]] |
| `ORG_PROFILE_WRITE` | Create, edit, and delete organization teams | [[docs-api-reference-v2-orgs-teams-create-a-team|Create a team]], [[docs-api-reference-v2-orgs-teams-update-a-team|Update a team]], [[docs-api-reference-v2-orgs-teams-delete-a-team|Delete a team]] |
| `ORG_MEMBERSHIP_READ` | View organization memberships and users | [[docs-api-reference-v2-orgs-memberships-get-all-memberships|Get all memberships]], [[docs-api-reference-v2-orgs-memberships-get-a-membership|Get a membership]], [[docs-api-reference-v2-orgs-users-get-all-users|Get all users]] |
| `ORG_MEMBERSHIP_WRITE` | Create, edit, and delete organization memberships and users | [[docs-api-reference-v2-orgs-memberships-create-a-membership|Create a membership]], [[docs-api-reference-v2-orgs-memberships-update-a-membership|Update a membership]], [[docs-api-reference-v2-orgs-memberships-delete-a-membership|Delete a membership]], [[docs-api-reference-v2-orgs-users-create-a-user|Create a user]], [[docs-api-reference-v2-orgs-users-update-a-user|Update a user]], [[docs-api-reference-v2-orgs-users-delete-a-user|Delete a user]] |
| `ORG_ROUTING_FORM_READ` | View organization routing forms | [[docs-api-reference-v2-orgs-routing-forms-get-organization-routing-forms|Get organization routing forms]], [[docs-api-reference-v2-orgs-routing-forms-get-routing-form-responses|Get routing form responses]] |
| `ORG_ROUTING_FORM_WRITE` | Create, edit, and delete organization routing form responses | [[docs-api-reference-v2-orgs-routing-forms-create-routing-form-response-and-get-available-slots|Create routing form response and get available slots]], [[docs-api-reference-v2-orgs-routing-forms-update-routing-form-response|Update routing form response]] |
| `ORG_WEBHOOK_READ` | View organization webhooks | [[docs-api-reference-v2-orgs-webhooks-get-all-webhooks|Get all webhooks]], [[docs-api-reference-v2-orgs-webhooks-get-a-webhook|Get a webhook]] |
| `ORG_WEBHOOK_WRITE` | Create, edit, and delete organization webhooks | [[docs-api-reference-v2-orgs-webhooks-create-a-webhook|Create a webhook]], [[docs-api-reference-v2-orgs-webhooks-update-a-webhook|Update a webhook]], [[docs-api-reference-v2-orgs-webhooks-delete-a-webhook|Delete a webhook]] |

To initiate the OAuth flow, direct users to the following authorization URL:`https://app.cal.com/auth/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE&scope=BOOKING_READ%20BOOKING_WRITE`**URL Parameters:**

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Yes | Your OAuth client ID |
| `redirect_uri` | Yes | Where users will be redirected after authorization. Must exactly match one of the registered redirect URIs. |
| `state` | Recommended | A securely generated random string to mitigate CSRF attacks |
| `scope` | Yes | Space or comma-separated list of scopes to request (e.g. `BOOKING_READ BOOKING_WRITE` or `BOOKING_READ,BOOKING_WRITE`). Must be a subset of scopes enabled on the OAuth client. |
| `code_challenge` | For public clients | PKCE code challenge (S256 method) |

After users click **Allow**, they will be redirected to the `redirect_uri` with `code` (authorization code) and `state` as URL parameters:

```
https://your-app.com/callback?code=AUTHORIZATION_CODE&state=YOUR_STATE
```

#### Error Handling

Errors during the authorization step are displayed directly to the user on the Cal.com authorization page. Your application will not receive a JSON error response for these cases:

*   **Client not found**: No OAuth client exists with the provided `client_id`.
*   **Client not approved**: The OAuth client has not been approved by a Cal.com admin yet.
*   **Mismatched redirect URI**: The `redirect_uri` does not match any of the registered redirect URIs for the OAuth client.

If an error occurs after the client is validated, the user is redirected to the `redirect_uri` with an error:

*   **Scope required**: If the `scope` parameter is missing, the error `scope parameter is required for this OAuth client` is displayed on the authorization page.
*   **Unknown scope**: If the `scope` parameter includes scope values that do not exist, the user is redirected with `error=invalid_scope` and `error_description=Requested scope is not a recognized scope`. This applies to both regular and legacy clients.
*   **Invalid scope**: If the `scope` parameter includes scopes not enabled on the OAuth client, the user is redirected with `error=invalid_request` and `error_description=Requested scope exceeds the client's registered scopes`.
*   **Access denied**: If the user denies access or has insufficient permissions, the user is redirected with an error.

```
https://your-app.com/callback?error=invalid_request&error_description=Requested+scope+exceeds+the+client%27s+registered+scopes&state=YOUR_STATE
```

## 3. Exchange Token

Exchange an authorization code for access and refresh tokens. The token endpoint also accepts `application/x-www-form-urlencoded` content type.**Endpoint:**`POST https://api.cal.com/v2/auth/oauth2/token`

### 3.1 Confidential Clients

Confidential clients authenticate with a `client_secret`. All parameters are required:

| Parameter | Description |
| --- | --- |
| `client_id` | Your OAuth client ID |
| `client_secret` | Your OAuth client secret |
| `grant_type` | Must be `authorization_code` |
| `code` | The authorization code received in the redirect URI |
| `redirect_uri` | Must match the redirect URI used in the authorization request |

*   cURL

*   fetch

*   axios

```
curl -X POST https://api.cal.com/v2/auth/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "authorization_code",
    "code": "AUTHORIZATION_CODE",
    "redirect_uri": "https://your-app.com/callback"
  }'
```

```
const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    grant_type: "authorization_code",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "https://your-app.com/callback",
  }),
});

const tokens = await response.json();
```

```
import axios from "axios";

const { data } = await axios.post(
  "https://api.cal.com/v2/auth/oauth2/token",
  {
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    grant_type: "authorization_code",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "https://your-app.com/callback",
  }
);
```

### 3.2 Public Clients (PKCE)

Public clients (e.g. single-page apps, mobile apps) use PKCE instead of a `client_secret`. You must have sent a `code_challenge` during the authorization step. All parameters are required:

| Parameter | Description |
| --- | --- |
| `client_id` | Your OAuth client ID |
| `grant_type` | Must be `authorization_code` |
| `code` | The authorization code received in the redirect URI |
| `redirect_uri` | Must match the redirect URI used in the authorization request |
| `code_verifier` | The original PKCE code verifier used to generate the `code_challenge` |

*   cURL

*   fetch

*   axios

```
curl -X POST https://api.cal.com/v2/auth/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "grant_type": "authorization_code",
    "code": "AUTHORIZATION_CODE",
    "redirect_uri": "https://your-app.com/callback",
    "code_verifier": "YOUR_CODE_VERIFIER"
  }'
```

```
const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "YOUR_CLIENT_ID",
    grant_type: "authorization_code",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "https://your-app.com/callback",
    code_verifier: "YOUR_CODE_VERIFIER",
  }),
});

const tokens = await response.json();
```

```
import axios from "axios";

const { data } = await axios.post(
  "https://api.cal.com/v2/auth/oauth2/token",
  {
    client_id: "YOUR_CLIENT_ID",
    grant_type: "authorization_code",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "https://your-app.com/callback",
    code_verifier: "YOUR_CODE_VERIFIER",
  }
);
```

#### Success Response (200)

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "BOOKING_READ BOOKING_WRITE"
}
```

#### Error Responses

Error responses include `error` and `error_description` fields.

## 4. Refresh Token

Refresh an expired access token using a refresh token.**Endpoint:**`POST https://api.cal.com/v2/auth/oauth2/token`

### 4.1 Confidential Clients

Confidential clients authenticate with a `client_secret`. All parameters are required:

| Parameter | Description |
| --- | --- |
| `client_id` | Your OAuth client ID |
| `client_secret` | Your OAuth client secret |
| `grant_type` | Must be `refresh_token` |
| `refresh_token` | The refresh token received from a previous token response |

*   cURL

*   fetch

*   axios

```
curl -X POST https://api.cal.com/v2/auth/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "refresh_token",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

```
const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    grant_type: "refresh_token",
    refresh_token: "YOUR_REFRESH_TOKEN",
  }),
});

const tokens = await response.json();
```

```
import axios from "axios";

const { data } = await axios.post(
  "https://api.cal.com/v2/auth/oauth2/token",
  {
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    grant_type: "refresh_token",
    refresh_token: "YOUR_REFRESH_TOKEN",
  }
);
```

### 4.2 Public Clients

Public clients do not use a `client_secret`. All parameters are required:

| Parameter | Description |
| --- | --- |
| `client_id` | Your OAuth client ID |
| `grant_type` | Must be `refresh_token` |
| `refresh_token` | The refresh token received from a previous token response |

*   cURL

*   fetch

*   axios

```
curl -X POST https://api.cal.com/v2/auth/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "grant_type": "refresh_token",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

```
const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "YOUR_CLIENT_ID",
    grant_type: "refresh_token",
    refresh_token: "YOUR_REFRESH_TOKEN",
  }),
});

const tokens = await response.json();
```

```
import axios from "axios";

const { data } = await axios.post(
  "https://api.cal.com/v2/auth/oauth2/token",
  {
    client_id: "YOUR_CLIENT_ID",
    grant_type: "refresh_token",
    refresh_token: "YOUR_REFRESH_TOKEN",
  }
);
```

#### Success Response (200)

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "BOOKING_READ BOOKING_WRITE"
}
```

#### Error Responses

## 5. Client Secret Rotation

Cal.com supports rotating client secrets with zero downtime. You can have up to **2 active secrets** at a time, allowing you to deploy a new secret before revoking the old one.

### Why rotate secrets?

*   A secret may have been accidentally exposed or compromised
*   Your security policy requires periodic credential rotation
*   An employee with access to the secret has left your organization

### How it works

1.   **Generate a new secret** from your [OAuth client settings](https://app.cal.com/settings/developer/oauth). Your old secret continues to work — both secrets are valid simultaneously.
2.   **Update your application** to use the new secret in all token exchange and refresh requests.
3.   **Verify** that your application works correctly with the new secret.
4.   **Revoke the old secret** from the settings page. Any requests using the old secret will immediately fail.

### Important notes

*   You can have a **maximum of 2 secrets** per client. To generate a new one when you already have 2, revoke an existing secret first.
*   New secrets are shown **only once** when generated. Copy and store them securely.
*   Revoking a secret takes effect **immediately** — there is no grace period.
*   **Existing access and refresh tokens remain valid** after secret rotation. Rotation only affects token exchange and refresh requests that require `client_secret`.
*   Secret rotation applies only to **confidential clients**. Public clients (PKCE) do not use client secrets.

### What needs to change in your code

When you rotate a secret, update the `client_secret` parameter in these requests:

| Request | Affected? |
| --- | --- |
| Authorization redirect (Step 2) | No — uses only `client_id` |
| Exchange code for tokens (Step 3) | **Yes** — update `client_secret` |
| Refresh access token (Step 4) | **Yes** — update `client_secret` |
| API calls with Bearer token (Step 5) | No — uses access token |

## Legacy Client Migration

If your OAuth client was created before scopes were introduced, it is considered a **legacy client**. A client is treated as legacy if it has no scopes configured, or if it only has the old legacy scope values (`READ_BOOKING` and/or `READ_PROFILE`). Access tokens issued by legacy clients can access any resource on behalf of the authorizing user — scopes are not enforced.You can migrate a legacy client to use explicit scopes without creating a new client. **Order matters** — follow these steps to avoid breaking existing integrations:

### Step 1: Update your authorization URL

Add a `scope` query parameter to your authorization URL **before** changing any client settings. Legacy clients skip scope validation during authorization, so users can already authorize with a scope parameter even while the client is still in legacy mode.

```
https://app.cal.com/auth/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE&scope=BOOKING_READ%20BOOKING_WRITE
```

New access tokens issued after this change will carry only the scopes you specified. For the full list of available scopes, see .

### Step 2: Update client scopes in settings

Once your authorization URL is updated and you have verified that new tokens are being issued with the correct scopes, open your OAuth client settings and select the matching scopes. Save the client.After this step, the client is no longer treated as a legacy client. Scope validation is enforced for all new authorization requests.

### Existing tokens

Tokens issued before the migration continue to work until users re-authorize. There is no forced invalidation of existing tokens during the migration.

### Re-approval

Changing properties below will trigger a re-review by Cal.com admins and set client to a “pending” state:

*   Name
*   Logo
*   Website URL
*   Redirect URI
*   Scope expansion (adding new scopes that the client did not previously have)

While pending, the client can only be used by the client owner for testing — other users cannot authorize with it.Changing properties below will NOT trigger a re-review and client will remain in the state it is:

*   Adding a `_READ` scope when the corresponding `_WRITE` scope is already granted (e.g. adding `BOOKING_READ` when `BOOKING_WRITE` is already present)
*   Removing scopes
*   Purpose description change
*   Updating scopes on a legacy client, as long as only user-level scopes are added — adding `TEAM_` or `ORG_` scopes to a legacy client will trigger re-approval. See  for details.

## 6. Verify Access Token

To verify the correct setup and functionality of OAuth credentials, use the following endpoint:**Endpoint:**`GET https://api.cal.com/v2/me`

*   cURL

*   fetch

*   axios

```
curl -X GET https://api.cal.com/v2/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```
const response = await fetch("https://api.cal.com/v2/me", {
  headers: { Authorization: "Bearer YOUR_ACCESS_TOKEN" },
});

const user = await response.json();
```

```
import axios from "axios";

const { data } = await axios.get("https://api.cal.com/v2/me", {
  headers: { Authorization: "Bearer YOUR_ACCESS_TOKEN" },
});
```

* * *

## 7. Onboarding Embed

The `<OnboardingEmbed />` React component lets you embed Cal.com account creation, onboarding, and OAuth authorization directly inside your application. Users create a real Cal.com account, complete onboarding, and grant your app OAuth access — all without leaving your site. The component also has an inbuilt “dark” and “light” theme.For a demonstration of the onboarding embed flow, please refer to the video below.

The component supports two modes for receiving the authorization code:

*   **Callback mode** — provide `onAuthorizationAllowed` to receive the authorization code via a callback. No page navigation occurs.
*   **Redirect mode** — don’t provide `onAuthorizationAllowed` and the browser navigates to your `redirectUri` with the code as a query parameter. Works like a standard OAuth redirect.

```
npm install @calcom/atoms
```

### Callback Mode

Provide `onAuthorizationAllowed` to receive the authorization code directly. The dialog closes and your callback fires after user authorizes your OAuth client — no page reload.

```
import { OnboardingEmbed } from "@calcom/atoms";
import { useState } from "react";

function App() {
  const [state] = useState(() => crypto.randomUUID());

  return (
    <OnboardingEmbed
      oAuthClientId="your_client_id"
      authorization={{
        scope: ["BOOKING_READ", "BOOKING_WRITE", "PROFILE_READ"],
        redirectUri: "https://your-app.com/cal/callback",
        state,
      }}
      onAuthorizationAllowed={({ code }) => {
        fetch("/api/cal/exchange", {
          method: "POST",
          body: JSON.stringify({ code, state }),
        });
      }}
      onError={(error) => console.error(error.code, error.message)}
      onClose={() => console.log("Dialog dismissed")}
    />
  );
}
```

### Redirect Mode

Omit `onAuthorizationAllowed` and the browser navigates to your `redirectUri` after the user completes onboarding and grants access:

```
https://your-app.com/cal/callback?code=AUTHORIZATION_CODE&state=YOUR_STATE
```

```
import { OnboardingEmbed } from "@calcom/atoms";
import { useState } from "react";

function App() {
  const [state] = useState(() => crypto.randomUUID());

  return (
    <OnboardingEmbed
      oAuthClientId="your_client_id"
      authorization={{
        scope: ["BOOKING_READ", "BOOKING_WRITE", "PROFILE_READ"],
        redirectUri: "https://your-app.com/cal/callback",
        state,
      }}
      onError={(error) => console.error(error.code, error.message)}
    />
  );
}
```

### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `oAuthClientId` | `string` | Yes | Your OAuth client ID from . |
| `host` | `string` | No | Cal.com host URL. Defaults to `https://app.cal.com`. Used for local development to point to cal web app. |
| `theme` | `"light" | "dark"` | No | Theme for the embedded onboarding UI. Defaults to `"light"`. |
| `user` | `{ email?: string, name?: string, username?: string }` | No | Prefill user details in signup and profile steps. |
| `authorization` | `AuthorizationProps` | Yes | OAuth authorization parameters (see below). |
| `onAuthorizationAllowed` | `(result: { code: string }) => void` | No | Called with the authorization code on completion. If provided, enables callback mode. If omitted, enables redirect mode (browser navigates to `redirectUri`). |
| `onError` | `(error: OnboardingError) => void` | No | Called on unrecoverable error. |
| `onAuthorizationDenied` | `() => void` | No | Called when the user declines OAuth authorization. If provided, the callback fires and the dialog closes. If omitted, the browser navigates to `redirectUri?error=access_denied&state=YOUR_STATE`. |
| `onClose` | `() => void` | No | Called when the user dismisses the dialog before completing. |
| `trigger` | `ReactNode` | No | Custom trigger element. Defaults to a “Continue with Cal.com” button. |

### Authorization Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `redirectUri` | `string` | Yes | One of the redirect URIs registered on your OAuth client. The server validates this against the client’s registered URIs. **Must share the same origin** (scheme + domain + port) **as the page hosting the `<OnboardingEmbed />`**, because the iframe uses `postMessage` with this origin for secure communication. For example, if your OAuth client has redirect URI `https://your-app.com/cal/callback`, then pass it here exactly the same `https://your-app.com/cal/callback`. |
| `scope` | `string[]` | Yes | OAuth scopes to request. Must be a subset of scopes registered on the OAuth client. See . |
| `state` | `string` | Yes | CSRF token. Generate a unique value per session and verify it matches when you receive the authorization code. |
| `codeChallenge` | `string` | For public clients | PKCE code challenge (S256 method). Required for public OAuth clients. Generate a `code_verifier` (random 32-byte base64url string), hash it with SHA-256, and pass the result here. Store the `code_verifier` — you’ll need it to exchange the authorization code for tokens. |

### Trigger and Theme

The `theme` prop controls the appearance of the trigger button, the onboarding steps, and the authorization page. The default trigger renders a “Continue with Cal.com” button:

| Light theme (default) | Dark theme |
| --- | --- |
| ![Image 1](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-trigger-light.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=b25ee91c620a045718a08abaafd49d18) | ![Image 2](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-trigger-dark.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=3b1b01c0baf09fdf5ae63399dffa92cb) |

You can pass a custom trigger element via the `trigger` prop:

```
<OnboardingEmbed
  trigger={<button>Connect calendar</button>}
  // ...
/>
```

![Image 3](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-trigger-custom.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=5bc93051171f155515bb23922b4e9fd6)

### Walkthrough — Callback Mode

Here’s what happens when a user clicks the trigger with `onAuthorizationAllowed` provided and the `user` prop set:

```
<OnboardingEmbed
  oAuthClientId="your_client_id"
  theme="light"
  user={{ email: "bob@yahoo.com", name: "Bob", username: "bob100" }}
  authorization={{
    scope: ["EVENT_TYPE_READ"],
    redirectUri: "https://your-app.com/cal/callback",
    state,
  }}
  onAuthorizationAllowed={({ code }) => {
    alert(`Success! Auth code: ${code}`);
  }}
/>
```

**1. Trigger** — The component renders a “Continue with Cal.com” button. The user clicks it to open the onboarding dialog.![Image 4](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-trigger-light.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=b25ee91c620a045718a08abaafd49d18)**2. Login or Signup** — The dialog opens with the login form. Existing users can sign in with email or Google. The `user.email` prop prefills the email field.![Image 5](https://mintcdn.com/calcom/8wf65ytGuHueTTf9/images/onboarding-step-login.png?fit=max&auto=format&n=8wf65ytGuHueTTf9&q=85&s=1b29379d27c310228358493065a1c754)New users click “Create account” to sign up with Google or email. When signing up with email, the `user.email` and `user.username` props are prefilled. When signing up with Google, the `user` prop values are ignored — name, email, and username are inferred from the Google account.![Image 6](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-step-signup.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=c6d6ee99bb84f23f09349c070117de77)![Image 7](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-step-signup-form.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=da135a913258b48625a33399a849a8d3)**3. Profile** — After signup, the user sets up their profile. The `user.name` prop prefills the name field.![Image 8](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-step-profile.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=24de6aeb342e3ec18ddffb84feb57729)**4. Connect Calendar** — The user can connect a calendar or skip this step.![Image 9](https://mintcdn.com/calcom/8wf65ytGuHueTTf9/images/onboarding-step-calendar.png?fit=max&auto=format&n=8wf65ytGuHueTTf9&q=85&s=4fb8bf8a8fba293363957eb424aaefbe)**5. Authorize** — The user reviews the requested permissions and clicks “Allow”. The displayed permissions (e.g. “View event types”) correspond to the `scope` passed to the component — in this example, `["EVENT_TYPE_READ"]`.![Image 10](https://mintcdn.com/calcom/8wf65ytGuHueTTf9/images/onboarding-step-authorize.png?fit=max&auto=format&n=8wf65ytGuHueTTf9&q=85&s=fea3827b8f0c0b8e80f834109bb88de6)**6. Done** — `onAuthorizationAllowed` fires with the authorization code. Exchange it for tokens using the .

### Public Clients (PKCE)

Public OAuth clients cannot safely store a client secret (e.g. browser-only apps). Use PKCE to secure the authorization code exchange instead. Generate a `code_verifier`, derive a `code_challenge` from it, and pass the challenge to `OnboardingEmbed`. When you receive the authorization code, exchange it with the `code_verifier` instead of a client secret.

```
import { OnboardingEmbed } from "@calcom/atoms";
import { useMemo, useState } from "react";

async function generatePkce() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const codeVerifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  return { codeVerifier, codeChallenge };
}

export function MyApp() {
  const state = useMemo(() => crypto.randomUUID(), []);
  const [pkce, setPkce] = useState<{ codeVerifier: string; codeChallenge: string } | null>(null);

  useMemo(() => {
    generatePkce().then(setPkce);
  }, []);

  if (!pkce) return null;

  return (
    <OnboardingEmbed
      oAuthClientId="your_client_id"
      authorization={{
        scope: ["EVENT_TYPE_READ"],
        redirectUri: "https://your-app.com/cal/callback",
        state,
        codeChallenge: pkce.codeChallenge,
      }}
      onAuthorizationAllowed={async ({ code }) => {
        // Exchange using code_verifier instead of client_secret
        const res = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: "your_client_id",
            code_verifier: pkce.codeVerifier,
            grant_type: "authorization_code",
            code,
            redirect_uri: "https://your-app.com/cal/callback",
          }),
        });
        const { access_token, refresh_token } = await res.json();
      }}
    />
  );
}
```

![Image 11](https://mintcdn.com/calcom/pgprLwpE-vKhyBQS/images/onboarding-step-success.png?fit=max&auto=format&n=pgprLwpE-vKhyBQS&q=85&s=e7612a42a6b5d6d2547f3ae8117db74c)

### Error Types

The `onError` callback receives an error object with the following shape:

```
interface OnboardingError {
  code: "INVALID_PROPS" | "SIGNUP_FAILED" | "ONBOARDING_FAILED" | "AUTHORIZATION_FAILED" | "STATE_MISMATCH" | "UNKNOWN";
  message: string;
}
```

| Code | Description |
| --- | --- |
| `INVALID_PROPS` | Required props are missing or invalid (e.g. `oAuthClientId` does not exist, `redirectUri` does not match a registered URI, or required authorization fields are empty). |
| `SIGNUP_FAILED` | Account creation failed. |
| `ONBOARDING_FAILED` | An error occurred during the onboarding steps. |
| `AUTHORIZATION_FAILED` | The user denied access or OAuth consent failed. |
| `STATE_MISMATCH` | The `state` in the response did not match the `state` you provided. Possible CSRF attack. |
| `UNKNOWN` | An unexpected error occurred. |

### How It Works

The component opens a dialog containing an iframe that loads Cal.com’s onboarding flow. The iframe runs on Cal.com’s domain with a first-party session, so no third-party cookies are needed.The flow automatically detects the user’s state:

*   **No session** — starts at signup/login, then profile setup, calendar connection, and OAuth consent.
*   **Session with incomplete onboarding** — resumes from where the user left off.
*   **Session with complete onboarding** — skips straight to OAuth consent.

After the user grants access, you receive an authorization code that you exchange for access and refresh tokens using the .
