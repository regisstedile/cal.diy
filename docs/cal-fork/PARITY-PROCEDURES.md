# Paridade de procedures tRPC — fork vs REF enterprise

**Gerado:** 2026-07-11 por `scripts/parity_procedures.py` (heurística regex — conferir manualmente antes de portar; spreads `...router` não são seguidos).

| Router | REF | Fork | Faltam no fork | Só no fork |
|---|---|---|---|---|
| ⚠️ `admin` | 31 | 21 | 10 | 0 |
| ⚠️ `aiVoiceAgent` | 11 | 8 | 3 | 0 |
| ✅ `apiKeys` | 5 | 5 | 0 | 0 |
| ✅ `apps` | 14 | 14 | 0 | 0 |
| ✅ `attribute-sync` | 4 | 4 | 0 | 0 |
| ✅ `attributes` | 10 | 10 | 0 | 0 |
| ✅ `auth` | 6 | 6 | 0 | 0 |
| ✅ `availability` | 13 | 13 | 0 | 0 |
| ⚠️ `bookings` | 16 | 14 | 2 | 0 |
| ✅ `calVideo` | 3 | 3 | 0 | 0 |
| ✅ `calendars` | 3 | 3 | 0 | 0 |
| ✅ `credentials` | 1 | 1 | 0 | 0 |
| 🔴 `credits` | 4 | 1 | 3 | 0 |
| ✅ `delegationCredential` | 8 | 8 | 0 | 0 |
| ✅ `deploymentSetup` | 2 | 2 | 0 | 0 |
| ✅ `dsync` | 3 | 3 | 0 | 0 |
| ✅ `eventTypes` | 21 | 21 | 0 | 0 |
| ✅ `featureOptIn` | 13 | 13 | 0 | 0 |
| ✅ `feedback` | 1 | 1 | 0 | 0 |
| ✅ `filterSegments` | 5 | 5 | 0 | 0 |
| ✅ `googleWorkspace` | 3 | 3 | 0 | 0 |
| ✅ `holidays` | 5 | 5 | 0 | 0 |
| ✅ `i18n` | 1 | 1 | 0 | 0 |
| ✅ `insights` | 32 | 32 (fork usa spread — conferir) | 0 | 0 |
| ✅ `me` | 8 | 8 | 0 | 0 |
| ✅ `oAuth` | 8 | 8 | 0 | 0 |
| ✅ `ooo` | 4 | 4 | 0 | 0 |
| 🔴 `organizations` | 41 | 26 (fork usa spread — conferir) | 25 | 10 |
| ✅ `payments` | 1 | 1 | 0 | 0 |
| ✅ `pbac` | 8 | 8 (fork usa spread — conferir) | 0 | 0 |
| ⚠️ `phoneNumber` | 6 | 5 | 1 | 0 |
| ✅ `routing-forms` | 2 | 2 | 0 | 0 |
| ✅ `slots` | 4 | 4 | 0 | 0 |
| ✅ `sso` | 4 | 4 | 0 | 0 |
| 🔴 `teams` | 45 | 24 (fork usa spread — conferir) | 32 | 11 |
| ✅ `travelSchedules` | 1 | 1 | 0 | 0 |
| ✅ `users` | 5 | 5 | 0 | 0 |
| ✅ `webhook` | 7 | 7 | 0 | 0 |
| ✅ `workflows` | 15 | 15 | 0 | 0 |
| **TOTAL** | **374** | **319** | **76** | — |

## Detalhe dos gaps

### `admin`
- **Faltam (10):** `billingPortalLink`, `moveTeamToOrg`, `resendPurchaseCompleteEmail`, `verifyWorkflows`, `whitelistUserWorkflows`, `workspacePlatform.add`, `workspacePlatform.list`, `workspacePlatform.toggleEnabled`, `workspacePlatform.update`, `workspacePlatform.updateServiceAccount`

### `aiVoiceAgent`
- **Faltam (3):** `delete`, `list`, `listCalls`

### `bookings`
- **Faltam (2):** `getInstantBookingLocation`, `getRoutingTrace`

### `credits`
- **Faltam (3):** `buyCredits`, `downloadExpenseLog`, `getAllCredits`

### `organizations`
- **Faltam (25):** `addMembersToEventTypes`, `addMembersToTeams`, `adminDelete`, `adminGet`, `adminGetAll`, `adminUpdate`, `adminVerify`, `bulkDeleteUsers`, `checkIfOrgNeedsUpgrade`, `createPhoneCall`, `createSelfHosted`, `createTeams`, `createWithPaymentIntent`, `getBrand`, `getOrganizationOnboarding`, `getTeams`, `getUser`, `intentToCreateOrg`, `listCurrent`, `publish`, `removeHostsFromEventTypes`, `sendPasswordReset`, `setPassword`, `updateUser`, `verifyCode`
- **Só no fork (10):** `acceptInvite`, `declineInvite`, `deleteSamlConnection`, `getCurrent`, `getSamlSettings`, `inviteMember`, `listPendingInvites`, `removeMember`, `saveSamlConnection`, `updateMemberRole`

### `phoneNumber`
- **Faltam (1):** `list`

### `teams`
- **Faltam (32):** `acceptOrLeave`, `addMembersToEventTypes`, `changeMemberRole`, `get`, `getActiveUserBookings`, `getActiveUserBreakdown`, `getInternalNotesPresets`, `getManagedEventUsersToReassign`, `getMemberAvailability`, `getMembershipbyUser`, `getRoundRobinHostsToReassign`, `getSubscriptionStatus`, `getUpgradeable`, `getUserConnectedApps`, `hasActiveTeamPlan`, `hasEditPermissionForUser`, `hasTeamMembership`, `inviteMemberByToken`, `legacyListMembers`, `listInvoices`, `listOwnedTeams`, `listSimpleMembers`, `managedEventManualReassign`, `managedEventReassign`, `removeHostsFromEventTypes`, `resendInvitation`, `roundRobinManualReassign`, `roundRobinReassign`, `skipTeamTrials`, `skipTrialForTeam`, `updateInternalNotesPresets`, `updateMembership`
- **Só no fork (11):** `acceptInvite`, `checkSlugAvailability`, `declineInvite`, `eventTypes.create`, `eventTypes.delete`, `eventTypes.list`, `eventTypes.setHosts`, `getById`, `listForUser`, `listPendingInvites`, `updateMemberRole`

