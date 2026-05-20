---
title: "Setup"
source: "https://cal.com/docs/atoms/setup"
tags: [cal-com, docs]
---
This guide walks you through setting up Cal.com Atoms in your application using OAuth authentication.

## 1. Create an OAuth client

First, create an OAuth client to enable user authentication:

1.   Go to [https://app.cal.com/settings/developer/oauth](https://app.cal.com/settings/developer/oauth)
2.   Create a new OAuth client with:
    *   **Name**: Your application name
    *   **Redirect URIs**: URLs where users are redirected after authorization (e.g., `https://yourapp.com/callback`)

Your OAuth client will be reviewed by Cal.com. Once approved, you can use it to authenticate users.See the [[docs-api-reference-v2-oauth|OAuth documentation]] for complete details.

## 2. Implement the OAuth flow

When a user wants to connect their Cal.com account:

1.   **Redirect to authorization URL**

```
const authUrl = `https://app.cal.com/auth/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
window.location.href = authUrl;
```

1.   **Handle the callback**

After authorization, the user is redirected to your callback URL with a `code` parameter.

1.   **Exchange code for tokens**

```
const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
  }),
});

const { access_token, refresh_token, expires_in } = await response.json();
// Store these tokens securely
```

## 3. Set up a token refresh endpoint

Access tokens expire after 30 minutes. Create an endpoint that atoms can call to refresh tokens:

```
// pages/api/refresh.js (Next.js example)
export default async function handler(req, res) {
  const expiredToken = req.headers.authorization?.replace("Bearer ", "");
  
  // Look up the refresh token for this user in your database
  const refreshToken = await getRefreshTokenForUser(expiredToken);
  
  const response = await fetch("https://api.cal.com/v2/auth/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.CAL_OAUTH_CLIENT_ID,
      client_secret: process.env.CAL_OAUTH_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const tokens = await response.json();
  
  // Store the new tokens in your database
  await updateTokensForUser(expiredToken, tokens);
  
  res.json({ accessToken: tokens.access_token });
}
```

## 4. Install the atoms package

*   npm

*   yarn

*   pnpm

```
npm i @calcom/atoms
```

```
yarn add @calcom/atoms
```

```
pnpm add @calcom/atoms
```

## 5. Tailwind version compatibility

If your project utilizes Tailwind CSS, please ensure you import the CSS bundle that corresponds to your specific version. Atoms provides two distinct bundles to maintain compatibility across versions:

*   Tailwind CSS v4:

```
import "@calcom/atoms/globals.min.css";
```

*   Tailwind CSS v3:

```
import "@calcom/atoms/globals.tw3.min.css";
```

To prevent styling conflicts or unexpected behavior, please only include the import that matches your project’s Tailwind version.

## 6. Configure the OAuth provider

See the [[docs-atoms-cal-oauth-provider|CalOAuthProvider documentation]] for all available props and advanced configuration.

```
import "@calcom/atoms/globals.min.css";
import { CalOAuthProvider } from "@calcom/atoms";

function MyApp({ Component, pageProps }) {
  const { user } = useAuth(); // Your auth context
  
  return (
    <CalOAuthProvider
      accessToken={user?.calAccessToken}
      clientId={process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID}
      options={{
        apiUrl: "https://api.cal.com/v2",
        refreshUrl: "/api/refresh",
      }}
    >
      <Component {...pageProps} />
    </CalOAuthProvider>
  );
}

export default MyApp;
```

For all provider properties see [[docs-atoms-cal-oauth-provider|Cal OAuth Provider]] docs.

## 7. Start using atoms

Now you can use any atom in your components:

```
import { Booker, AvailabilitySettings } from "@calcom/atoms";

export default function SchedulingPage() {
  return (
    <div>
      <h1>Book a meeting</h1>
      <Booker
        username="johndoe"
        eventSlug="30min"
      />
      
      <h2>Manage availability</h2>
      <AvailabilitySettings />
    </div>
  );
}
```

* * *
