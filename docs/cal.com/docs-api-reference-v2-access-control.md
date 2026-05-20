---
title: "Access Control"
source: "https://cal.com/docs/api-reference/v2/access-control"
tags: [cal-com, docs]
---
Organization and team API endpoints can use one of the three layers of access control: **roles**, **PBAC (Permission-Based Access Control)**, and **OAuth access token scopes**. Roles are the default mechanism — every organization and team endpoint requires a minimum membership role, for example authenticated user must have a team admin membership to access certain endpoints. PBAC is an opt-in feature that adds fine-grained permissions on top. OAuth scopes determine which endpoints an OAuth access token can reach.

## Roles

Every organization and team endpoint requires the authenticated user to have a membership with a minimum role. There are three roles, from highest to lowest privilege:

| Level | Roles (highest to lowest) |
| --- | --- |
| Organization | `owner`>`admin`>`member` |
| Team | `owner`>`admin`>`member` |

### Role hierarchy

Higher roles can access endpoints that require a lower role. For example, if an endpoint requires `admin`, a user with the `owner` role can also access it.

### Organization roles grant team access

Organization-level roles carry over to team endpoints:

*   **Org `admin` or `owner`** can access any team endpoint, regardless of team membership or the required team role. Organization level is above team level in terms of permissions.
*   **Org `member`** must have a separate team membership. Their team role is then checked against the required team role.

For example, if a team endpoint requires `team admin`:

*   A user with `org admin` or `org owner` membership can access it directly — no team membership needed.
*   A user with `org member` membership needs a `team admin` (or `team owner`) membership in that specific team.

### Managing memberships

Use these endpoints to manage organization and team memberships:**Organization memberships**

| Method | Endpoint |
| --- | --- |
| `POST` | [[docs-api-reference-v2-orgs-memberships-create-a-membership|/v2/organizations//memberships]] |
| `GET` | [[docs-api-reference-v2-orgs-memberships-get-all-memberships|/v2/organizations//memberships]] |
| `GET` | [[docs-api-reference-v2-orgs-memberships-get-a-membership|/v2/organizations//memberships/]] |
| `PATCH` | [[docs-api-reference-v2-orgs-memberships-update-a-membership|/v2/organizations//memberships/]] |
| `DELETE` | [[docs-api-reference-v2-orgs-memberships-delete-a-membership|/v2/organizations//memberships/]] |

**Team memberships**

| Method | Endpoint |
| --- | --- |
| `POST` | [[docs-api-reference-v2-orgs-teams-memberships-create-a-membership|/v2/organizations//teams//memberships]] |
| `GET` | [[docs-api-reference-v2-orgs-teams-memberships-get-all-memberships|/v2/organizations//teams//memberships]] |
| `GET` | [[docs-api-reference-v2-orgs-teams-memberships-get-a-membership|/v2/organizations//teams//memberships/]] |
| `PATCH` | [[docs-api-reference-v2-orgs-teams-memberships-update-a-membership|/v2/organizations//teams//memberships/]] |
| `DELETE` | [[docs-api-reference-v2-orgs-teams-memberships-delete-a-membership|/v2/organizations//teams//memberships/]] |

## PBAC (Permission-Based Access Control)

PBAC is an opt-in feature enabled per organization. It lets you define custom roles with specific permissions for organization members. Instead of relying solely on admin/member roles, you can create granular roles like “Booking Manager” or “Team Lead” that have access to only the endpoints they need.

### How it works

Each endpoint has both a required membership role and a PBAC permission (e.g. `eventType.update`). Access is determined as follows:

1.   **PBAC is not enabled** — the system checks if the authenticated user has a membership with the required role (e.g. `org admin`). Users with a higher role (e.g. `org owner`) can also access endpoints that require a lower role.
2.   **PBAC is enabled and user has the required permission** — access is granted and the membership role check is skipped.
3.   **PBAC is enabled but user is missing the permission** — falls back to the membership role check in step 1.

### Setting up PBAC

1.   **Create a custom role** with specific permissions using the 
2.   **Assign the role** to an organization or team membership
3.   When the member makes API requests, PBAC checks if their role includes the required permission for that endpoint

### Managing roles and permissions

Use the following endpoints to create roles, assign permissions, and manage access for your organization members.

#### Roles

| Method | Endpoint |
| --- | --- |
| `POST` | [[docs-api-reference-v2-orgs-roles-create-a-new-organization-role|/v2/organizations//roles]] |
| `GET` | [[docs-api-reference-v2-orgs-roles-get-all-organization-roles|/v2/organizations//roles]] |
| `GET` | [[docs-api-reference-v2-orgs-roles-get-a-specific-organization-role|/v2/organizations//roles/]] |
| `PATCH` | [[docs-api-reference-v2-orgs-roles-update-an-organization-role|/v2/organizations//roles/]] |
| `DELETE` | [[docs-api-reference-v2-orgs-roles-delete-an-organization-role|/v2/organizations//roles/]] |

#### Role permissions

| Method | Endpoint |
| --- | --- |
| `POST` | [[docs-api-reference-v2-orgs-roles-permissions-add-permissions-to-an-organization-role-single-or-batch|/v2/organizations//roles//permissions]] |
| `GET` | [[docs-api-reference-v2-orgs-roles-permissions-list-permissions-for-an-organization-role|/v2/organizations//roles//permissions]] |
| `PUT` | [[docs-api-reference-v2-orgs-roles-permissions-replace-all-permissions-for-an-organization-role|/v2/organizations//roles//permissions]] |
| `DELETE` | [[docs-api-reference-v2-orgs-roles-permissions-remove-a-permission-from-an-organization-role|/v2/organizations//roles//permissions/]] |
| `DELETE` | [[docs-api-reference-v2-orgs-roles-permissions-remove-multiple-permissions-from-an-organization-role|/v2/organizations//roles//permissions]] |

### Endpoint descriptions

Each organization and team endpoint description mentions the minimum membership role and PBAC permission required to access it.

## OAuth Access Token Scopes

When accessing the API using an **OAuth access token**, the scopes granted during the authorization flow determine which endpoints the token can call. Any request to an endpoint outside the granted scopes will be rejected.

### How it works

1.   When creating an OAuth client, you select the scopes your application needs.
2.   During the authorization flow, the user sees which scopes your application is requesting and grants access.
3.   The issued access token can only call endpoints covered by the granted scopes.

### How to tell if an endpoint supports OAuth

If an endpoint description mentions a specific OAuth access token scope (e.g. _“If accessed using an OAuth access token, the `BOOKING\_READ` scope is required”_), you can access it using an OAuth access token with that scope.If no OAuth scope is mentioned in the endpoint description, the endpoint is not accessible using an OAuth access token.

### Scope levels

Scopes are organized into three levels:

| Level | Prefix | Example | Description |
| --- | --- | --- | --- |
| Individual | _(none)_ | `BOOKING_READ` | Access the authenticated user’s own resources |
| Team | `TEAM_` | `TEAM_BOOKING_READ` | Access resources belonging to a specific team |
| Organization | `ORG_` | `ORG_BOOKING_READ` | Access resources across the entire organization |

An `ORG_` scope automatically grants the corresponding `TEAM_` scope. For example, a token with `ORG_PROFILE_READ` can also access endpoints that require `TEAM_PROFILE_READ`.For a full list of available scopes and the endpoints they cover, see [[docs-api-reference-v2-oauth|OAuth — Available Scopes]].
