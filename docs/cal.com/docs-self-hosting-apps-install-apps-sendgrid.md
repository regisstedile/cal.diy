---
title: "Sendgrid"
source: "https://cal.com/docs/self-hosting/apps/install-apps/sendgrid"
tags: [cal-com, docs]
---
# Sendgrid
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

[Question? Give us feedback](https://github.com/calcom/cal.diy/issues/new?title=Feedback%20for%20%E2%80%9CSendgrid%E2%80%9D&labels=feedback)[Edit this page](https://github.com/calcom/cal.diy/tree/main/apps/docs/content/apps/sendgrid.mdx)Scroll to top

[[apps-google-Apps|Apps]]Sendgrid

Copy page

# Sendgrid

1.   **Create a SendGrid account** - Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/) and create a new SendGrid account.

2.   **Generate an API key** - Navigate to **Settings** ->**API Keys** and create a new API key.

3.   **Add API key to .env** - Copy the generated API key and add it to your `.env` file under the field:

`SENDGRID_API_KEY`

1.   **Verify a sender email** - Go to **Settings** ->**Sender Authentication** and verify a single sender.

2.   **Add verified email to .env** - Copy the verified email address and add it to your `.env` file under the field:

`SENDGRID_EMAIL`

> This app is **required** for Workflows

Last updated on April 26, 2026

[[apps-hubspot-HubSpot|HubSpot]][[apps-stripe-Stripe|Stripe]]

* * *

Cal.diy is the open source community edition of Cal.com. Cal.diy® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
