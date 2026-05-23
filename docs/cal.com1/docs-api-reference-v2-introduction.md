---
title: "Introduction to API v2"
source: "https://cal.com/docs/api-reference/v2/introduction"
tags: [cal-com, docs]
---
# Introduction to API v2

Copy page

Introduction to Cal.com API v2 endpoints

Copy page

## 
Authentication

The Cal.com API has 3 authentication methods:
1.   OAuth
2.   API key
3.   Platform (Deprecated)

### 
1. Create an OAuth client and “Continue with Cal.com”

In order to be listed as an official partner and App in our App Store: cal.com/apps you need to create and get a verified OAuth client.You can request it here: [[docs-api-reference-v2-oauth|https://cal.com/docs/api-reference/v2/oauth]].
### 
2. API key

While API keys can be created easily, bear in mind we almost always recommend using OAuth credentials, especially when building integrations or applications with Cal.com.You can view and manage your API keys in your settings page under the security tab in Cal.com.![Image 3](https://mintcdn.com/calcom/IkOoHLoQaXp2NlhX/images/i1600x899-DllqhV6w_3Vj_oxtjov.png?fit=max&auto=format&n=IkOoHLoQaXp2NlhX&q=85&s=388e2e4de928e29b7b65a699a46e96d8)API Keys are under Settings > Security Test mode secret keys have the prefix `cal_` and live mode secret keys have the prefix `cal_live_`.Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.Authentication to the API is performed via the Authorization header. For example, the request would go something like:

```
'Authorization': 'Bearer YOUR_API_KEY'
```

in your request header.All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.
## 
Teams endpoints

Teams customers have all the endpoints except the ones prefixed with “Platform” and “Orgs”.
## 
Organizations endpoints

Organizations customers have all the endpoints except the ones prefixed with “Platform” and “Teams” and “Orgs / Orgs” because children organizations are only allowed in the platform plan right now.
## 
Rate limits

There are three authentication methods for the API, and each of them has the following rate limits:
1.   API Key - 120 requests per minute. This can be increased to a reasonable amount, such as 200 requests per minute. If you require a higher rate limit, such as 800 requests per minute, it is possible, but it may involve extra charges. To request this, please contact support.

If no authentication method is provided, the default rate limit is 120 requests per minute.
## 
Deprecated & Maintenance for existing users only

As of 15th December 2025, we’re currently undergoing a restructuring of our “Platform”-offering. Until further we continue to provide enterprise support for existing customers but no longer offer new signups for any “Platform” plan.
### 
2. Platform OAuth client credentials

You need to use OAuth credentials when:
1.   Managing managed users [[docs-api-reference-v2-platform-managed-users-create-a-managed-user|API reference]]
2.   Creating OAuth client webhooks [[docs-api-reference-v2-platform-webhooks-create-a-webhook|API reference]]
3.   Refreshing tokens of a managed user [[docs-api-reference-v2-platform-managed-users-refresh-managed-user-tokens|API reference]]
4.   Teams related endpoints: Managing organization teams [[docs-api-reference-v2-orgs-teams-create-a-team|API reference]], adding managed users as members to teams [[docs-api-reference-v2-orgs-teams-memberships-create-a-membership|API reference]], creating team event types [[docs-api-reference-v2-orgs-event-types-create-an-event-type|API reference]].

OAuth credentials can be accessed in the platform dashboard [https://app.cal.com/settings/platform](https://app.cal.com/settings/platform) after you have created an OAuth client. Each one has an ID and secret. You then need to pass them as request headers:
1.   `x-cal-client-id` - ID of the OAuth client.
2.   `x-cal-secret-key` - secret of the OAuth client.

### 
3. Platform Managed user access token

After you create a managed user you will receive its access and refresh tokens. The response also includes managed user’s id, so we recommend you to add new properties to your users table calAccessToken, calRefreshToken and calManagedUserId to store this information.You need to use access token when managing managed user’s:
1.   Schedules [[docs-api-reference-v2-schedules-create-a-schedule|API reference]]
2.   Event types [[docs-api-reference-v2-event-types-create-an-event-type|API reference]]
3.   Bookings - some endpoints like creating a booking is public, but some like getting all managed user’s bookings require managed user’s access token [[docs-api-reference-v2-bookings-get-all-bookings|API reference]]

It is passed as an authorization bearer request header Authorization: Bearer <access-token>.Validity period: access tokens are valid for 60 minutes and refresh tokens for 1 year, and tokens can be refreshed using the refresh endpoint [[docs-api-reference-v2-oauth-post-v2oauth-refresh|API reference]]. After refreshing you will receive the new access and refresh tokens that you have to store in your database.Recovering tokens: if you ever lose managed user’s access or refresh tokens, you can force refresh them using the OAuth client credentials and store them in your database [[docs-api-reference-v2-platform-managed-users-force-refresh-tokens|API reference]].
## 
Platform endpoints

Platform customers have the following endpoints available:
1.   Endpoints prefixed with “Platform”.
2.   Endpoints with no prefix e.g “Bookings”, “Event Types”.
3.   If you are at least on the ESSENTIALS plan, then all endpoints prefixed with “Orgs” except “Orgs / Attributes”, “Orgs / Attributes / Options” and “Orgs / Teams / Routing forms / Responses”.

Was this page helpful?

Yes No

[[docs-api-reference-v2-oauth|OAuth]]
