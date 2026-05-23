---
title: "Microsoft"
source: "https://cal.com/docs/self-hosting/apps/install-apps/microsoft"
tags: [cal-com, docs]
---
# Microsoft
[[cal-docs-logo-svg|![Image 1: Cal.diy Docs]]![[cal-docs-logo-white-svg|Image 2: Cal.diy Docs]]](https://cal.com/)

CTRL K

CTRL K

*   [Introduction](https://cal.com/)
*   Getting Started
*   [[installation|Installation]]
*   [[database-migrations|Database Migrations]]
*   [[upgrading|Upgrading]]
*   [[docker|Docker]]
*   Apps

    *   [[apps-google|Google]]
    *   [[apps-microsoft|Microsoft]]
    *   [[apps-zoom|Zoom]]
    *   [[apps-daily|Daily]]
    *   [[apps-hubspot|HubSpot]]
    *   [[apps-sendgrid|Sendgrid]]
    *   [[apps-stripe|Stripe]]
    *   [[apps-twilio|Twilio]]
    *   [[apps-zoho|Zoho]]

*   Deployments
*   Deployments

    *   [[deployments-aws|AWS]]
    *   [[deployments-azure|Azure]]
    *   [[deployments-elestio|Elestio]]
    *   [[deployments-gcp|GCP]]
    *   [[deployments-northflank|Northflank]]
    *   [[deployments-railway|Railway]]
    *   [[deployments-render|Render]]
    *   [[deployments-vercel|Vercel]]

*   [[troubleshooting|Troubleshooting]]

Light

*   [Introduction](https://cal.com/)
*   Getting Started
*   [[installation|Installation]]
*   [[database-migrations|Database Migrations]]
*   [[upgrading|Upgrading]]
*   [[docker|Docker]]
*   Apps

    *   [[apps-google|Google]]
    *   [[apps-microsoft|Microsoft]]
    *   [[apps-zoom|Zoom]]
    *   [[apps-daily|Daily]]
    *   [[apps-hubspot|HubSpot]]
    *   [[apps-sendgrid|Sendgrid]]
    *   [[apps-stripe|Stripe]]
    *   [[apps-twilio|Twilio]]
    *   [[apps-zoho|Zoho]]

*   Deployments
*   Deployments

    *   [[deployments-aws|AWS]]
    *   [[deployments-azure|Azure]]
    *   [[deployments-elestio|Elestio]]
    *   [[deployments-gcp|GCP]]
    *   [[deployments-northflank|Northflank]]
    *   [[deployments-railway|Railway]]
    *   [[deployments-render|Render]]
    *   [[deployments-vercel|Vercel]]

*   [[troubleshooting|Troubleshooting]]

Light

On This Page

*   

[Question? Give us feedback](https://github.com/calcom/cal.diy/issues/new?title=Feedback%20for%20%E2%80%9CMicrosoft%E2%80%9D&labels=feedback)[Edit this page](https://github.com/calcom/cal.diy/tree/main/apps/docs/content/apps/microsoft.mdx)Scroll to top

[[apps-google-Apps|Apps]]Microsoft

Copy page

# Microsoft

#### Obtaining Microsoft Graph Client ID and Secret

1.   **Open Azure App Registration** - Go to [Azure App Registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) and select “New registration”.

2.   **Name your application** - Provide a name for your application to proceed with the registration.

3.   **Set who can use this application** - Set “Who can use this application or access this API?” to “Accounts in any organizational directory (Any Azure AD directory - Multitenant)”.

4.   **Configure the Web redirect URI** - Set the Web redirect URI to:

`<Cal.diy URL>/api/integrations/office365calendar/callback`

Replace `<Cal.diy URL>` with the URL where your application runs.

1.   **Obtain and set the MS_GRAPH_CLIENT_ID** - Use the Application (client) ID as the value for `MS_GRAPH_CLIENT_ID` in your `.env` file.

2.   **Create a client secret and set MS_GRAPH_CLIENT_SECRET** - Click on “Certificates & secrets”, create a new client secret, and use the generated value as the `MS_GRAPH_CLIENT_SECRET` in your `.env` file.

Last updated on April 26, 2026

[[apps-google-Google|Google]][[apps-zoom-Zoom|Zoom]]

* * *

Cal.diy is the open source community edition of Cal.com. Cal.diy® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
