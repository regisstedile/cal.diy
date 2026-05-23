---
title: "Audit logs"
source: "https://cal.com/docs/developing/guides/audit-logs"
tags: [cal-com, docs]
---
Audit logs record security-sensitive actions performed within your Cal.com organization. Each event captures who performed the action, what changed, and when it happened. Use audit logs to monitor access control changes, investigate security incidents, and satisfy compliance requirements.

## Tracked events

Cal.com automatically records audit events across the following categories: security, access control, API credential lifecycle, workflow automation, billing, and event type management.

### Security events

| Event | Description |
| --- | --- |
| `LOGIN` | A user logged in. Failed login attempts are recorded with a `FAILURE` result. |
| `SSO_LOGIN` | A user authenticated via SSO (SAML or OIDC). |
| `PASSWORD_CHANGED` | A user changed their password. |
| `PASSWORD_RESET_REQUESTED` | A password reset was initiated. |
| `TWO_FACTOR_ENABLED` | Two-factor authentication was turned on. |
| `TWO_FACTOR_DISABLED` | Two-factor authentication was turned off. |
| `IMPERSONATION_START` | An admin began impersonating another user. |
| `IMPERSONATION_STOP` | An admin stopped impersonating another user. |
| `EMAIL_CHANGED` | A user’s email address was updated. |
| `ACCOUNT_LOCKED` | A user account was locked. |
| `ACCOUNT_UNLOCKED` | A user account was unlocked. |

### Access control events

These events are recorded when organization or team memberships change.

| Event | Description | Data captured |
| --- | --- | --- |
| `MEMBER_ADDED` | A user was invited to join a team or organization. | Invited user and assigned role |
| `MEMBER_REMOVED` | A user was removed from a team or organization. | Removed member and team IDs |
| `ROLE_CHANGED` | A member’s role was updated. | Previous role and new role |
| `INVITATION_SENT` | An invitation email was sent to a prospective member. | Invitee email and target team |
| `TEAM_CREATED` | A new team was created within an organization. | Team ID and creator |
| `TEAM_DELETED` | An existing team was deleted. | Team ID |

### API credential events

| Event | Description |
| --- | --- |
| `API_KEY_CREATED` | A new API key was generated. |
| `API_KEY_REVOKED` | An existing API key was revoked. |

### Workflow events

| Event | Description |
| --- | --- |
| `WORKFLOW_CREATED` | A new workflow was created. |
| `WORKFLOW_MODIFIED` | An existing workflow was updated. |
| `WORKFLOW_DELETED` | A workflow was deleted. |

### Billing events

These events are recorded when subscription or seat changes occur.

| Event | Description |
| --- | --- |
| `PLAN_UPGRADED` | A subscription was upgraded to a higher tier. |
| `PLAN_DOWNGRADED` | A subscription was downgraded to a lower tier. |
| `SUBSCRIPTION_CANCELLED` | A subscription was cancelled. |
| `SEAT_ADDED` | A new seat was added to the subscription. |

### Event type events

| Event | Description |
| --- | --- |
| `EVENT_TYPE_CREATED` | A new event type was created. |
| `EVENT_TYPE_MODIFIED` | An existing event type was updated. |
| `EVENT_TYPE_DELETED` | An event type was deleted. |

## Event structure

Each audit event captures a consistent set of fields:

| Field | Description |
| --- | --- |
| **Action** | The type of event (e.g., `ROLE_CHANGED`, `LOGIN`). |
| **Actor** | The user who performed the action. |
| **Result** | Whether the action succeeded (`SUCCESS`), failed (`FAILURE`), or was denied (`DENIED`). |
| **Source** | Where the action originated (e.g., webapp, API v1, API v2, SAML, OAuth). |
| **Target** | The resource affected by the action, identified by type and ID (e.g., a specific user, team, or membership). |
| **Previous / new value** | For mutation events like `ROLE_CHANGED`, the value before and after the change. |
| **Timestamp** | When the event occurred. |

## Access control event examples

### Role change

When an admin changes a team member’s role, the audit log captures both the previous and new role values:

*   **Action**: `ROLE_CHANGED`
*   **Target type**: `membership`
*   **Previous value**: `MEMBER`
*   **New value**: `ADMIN`

### Member removal

When members are removed from a team, an audit event is recorded for each member and team combination:

*   **Action**: `MEMBER_REMOVED`
*   **Target type**: `membership`
*   **Target ID**: The affected member’s ID

### Member invitation

When new members are invited, the audit log records the invitation details:

*   **Action**: `MEMBER_ADDED`
*   **Target type**: `membership`

## PBAC permissions for audit logs

If your organization uses [[docs-api-reference-v2-access-control|PBAC (Permission-Based Access Control)]], audit log access is governed by dedicated permissions:

| Permission | Scope |
| --- | --- |
| `booking.readOrgAuditLogs` | View audit logs across the entire organization |
| `booking.readTeamAuditLogs` | View audit logs for a specific team |

Assign these permissions to custom roles to control who can access audit log data.
