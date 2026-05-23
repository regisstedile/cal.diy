---
title: "Cal.diy Self-Hosting Documentation"
source: "https://cal.com/docs/developing/open-source-contribution/contributors-guide"
tags: [cal-com, docs]
---
# Cal.diy Self-Hosting Documentation
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
*   
*   

[Question? Give us feedback](https://github.com/calcom/cal.diy/issues/new?title=Feedback%20for%20%E2%80%9CCal.diy%20Self-Hosting%20Documentation%E2%80%9D&labels=feedback)[Edit this page](https://github.com/calcom/cal.diy/tree/main/apps/docs/content/index.mdx)Scroll to top

Introduction

Copy page

# Cal.diy Self-Hosting Documentation

**Use at your own risk.** Cal.diy is the open source community edition of Cal.com and it is intended for users who want to self-host their own Cal.diy instance. **It is strictly recommended for personal, non-production use.** Please review all installation and configuration steps carefully. Self-hosting requires advanced knowledge of server administration, database management, and securing sensitive data. Proceed only if you are comfortable with these responsibilities.

**For any commercial and enterprise-ready scheduling infrastructure, use Cal.com**, not Cal.diy; hosted by us or get invited to on-prem enterprise access here: [[sales|https://cal.com/sales]]

## Getting Started

*   [[installation|Installation]] - Learn how to install and set up Cal.diy
*   [[database-migrations|Database Migrations]] - Manage database schema changes
*   [[upgrading|Upgrading]] - Keep your instance up to date
*   [[docker|Docker]] - Deploy with Docker
*   [[apps-google|Apps]] - Set up third-party integrations

## Deployments

Deploy Cal.diy on your preferred platform:

*   [[deployments-aws|AWS]]
*   [[deployments-azure|Azure]]
*   [[deployments-elestio|Elestio]]
*   [[deployments-gcp|GCP]]
*   [[deployments-northflank|Northflank]]
*   [[deployments-railway|Railway]]
*   [[deployments-render|Render]]
*   [[deployments-vercel|Vercel]]

## Differences between Cal.diy and Cal.com

Cal.com is the commercial application running on app.cal.com. It’s free to sign up and battle-tested with millions of monthly bookings by large organizations. Cal.diy is the new open source community edition which was spun out of Cal.com. Like any diy project, Cal.com, Inc. does not guarantee security and safety of the open source project. Cal.diy is community maintained and strictly recommended for personal, non-production use. Please use at your own risk.

For any commercial usage, please visit Cal.com or request enterprise access to our on-prem hosting: [[sales|https://cal.com/sales]].

Find all differences in features below (summarized):

| Feature | Cal.diy | Cal.com |
| --- | --- | --- |
| **SCHEDULING & BOOKINGS** |  |  |
| Event Types | ✅ | ✅ |
| Recurring Event Types | ✅ | ✅ |
| Seated Events | ✅ | ✅ |
| Paid Events (Stripe/PayPal) | ✅ | ✅ |
| Private Links (Hashed URLs) | ✅ | ✅ |
| Booking Management | ✅ | ✅ |
| Teams | ❌ | ✅ |
| Team Event Types (Round-Robin) | ❌ | ✅ |
| Team Event Types (Collective) | ❌ | ✅ |
| Managed Event Types | ❌ | ✅ |
| Instant Meeting | ❌ | ✅ |
| Organizations | ❌ | ✅ |
| **AVAILABILITY** |  |  |
| Availability Schedules | ✅ | ✅ |
| Date Overrides | ✅ | ✅ |
| Buffer Times | ✅ | ✅ |
| Minimum Notice / Booking Limits | ✅ | ✅ |
| Travel Schedules | ✅ | ✅ |
| Out-of-Office (OOO) | ✅ | ✅ |
| **CALENDAR INTEGRATIONS** |  |  |
| Google Calendar | ✅ | ✅ |
| Outlook / Office 365 Calendar | ✅ | ✅ |
| Apple Calendar | ✅ | ✅ |
| CalDAV | ✅ | ✅ |
| Lark Calendar | ✅ | ✅ |
| Feishu Calendar | ✅ | ✅ |
| Zoho Calendar | ✅ | ✅ |
| Exchange Calendar | ✅ | ✅ |
| ICS Feed Calendar | ✅ | ✅ |
| **VIDEO & CONFERENCING** |  |  |
| Cal Video (Daily.co) | ✅ | ✅ |
| Zoom | ✅ | ✅ |
| Google Meet | ✅ | ✅ |
| Microsoft Teams | ✅ | ✅ |
| Webex | ✅ | ✅ |
| Jitsi | ✅ | ✅ |
| Other conferencing (Whereby, Huddle01, etc.) | ✅ | ✅ |
| Cal.com Video Recordings | ❌ | ✅ |
| **AUTHENTICATION** |  |  |
| Email / Password Login | ✅ | ✅ |
| Google OAuth | ✅ | ✅ |
| Azure AD / Microsoft OAuth | ✅ | ✅ |
| SAML SSO | ❌ | ✅ |
| SCIM Directory Sync | ❌ | ✅ |
| Impersonation | ❌ | ✅ |
| **AUTOMATION & INTEGRATIONS** |  |  |
| Webhooks | ✅ | ✅ |
| Zapier | ✅ | ✅ |
| n8n / Make / Pipedream | ✅ | ✅ |
| CRM (HubSpot / Salesforce / Close, etc.) | ✅ | ✅ |
| Messaging (Discord, Telegram, WhatsApp, etc.) | ✅ | ✅ |
| AI Agents (Retell AI, ElevenLabs, Synthflow, etc.) | ✅ | ✅ |
| Analytics (GA4, GTM, PostHog, Fathom, etc.) | ✅ | ✅ |
| Workflows (Automations) | ❌ | ✅ |
| Routing Forms | ❌ | ✅ |
| **EMBED & API** |  |  |
| Embed (Inline, Popup, Floating Button) | ✅ | ✅ |
| API v2 (REST) | ✅ | ✅ |
| API Keys | ✅ | ✅ |
| Platform / OAuth Clients | ✅ | ✅ |
| API v1 (Legacy) | ❌ | ✅ |
| **ANALYTICS** |  |  |
| Insights Dashboard | ❌ | ✅ |
| **ADVANCED / ENTERPRISE** |  |  |
| Attributes & Segments | ❌ | ✅ |
| Delegation | ❌ | ✅ |
| Workspace Platform | ❌ | ✅ |
| Admin Panel | ❌ | ✅ |
|  | [[installation|Install]] | [[signup|Sign up]] |

Last updated on April 26, 2026

[[installation-Installation|Installation]]

* * *

Cal.diy is the open source community edition of Cal.com. Cal.diy® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
