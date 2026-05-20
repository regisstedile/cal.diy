---
title: "Upgrading"
source: "https://cal.com/docs/self-hosting/upgrading"
tags: [cal-com, docs]
---
# Upgrading
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

[Question? Give us feedback](https://github.com/calcom/cal.diy/issues/new?title=Feedback%20for%20%E2%80%9CUpgrading%E2%80%9D&labels=feedback)[Edit this page](https://github.com/calcom/cal.diy/tree/main/apps/docs/content/upgrading.mdx)Scroll to top

Upgrading

Copy page

# Upgrading

Pull the current version:

`git pull`

Check if dependencies got added/updated/removed

`yarn`

Apply database migrations by running **one of** the following commands:

In a development environment, run:

`yarn workspace @calcom/prisma db-migrate`

(this can clear your development database in some cases)

In a production environment, run:

`yarn workspace @calcom/prisma db-deploy`

Check for `.env` variables changes

`yarn predev`

Start the server. In a development environment, just do:

`yarn dev`

For a production build, run for example:

```
yarn build
yarn start
```

Enjoy the new version.

Last updated on April 26, 2026

[[database-migrations-Database-Migrations|Database Migrations]][[docker-Docker|Docker]]

* * *

Cal.diy is the open source community edition of Cal.com. Cal.diy® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
