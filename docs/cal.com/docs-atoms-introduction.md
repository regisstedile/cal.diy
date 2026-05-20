---
title: "Introduction to Cal.com Atoms"
source: "https://cal.com/docs/atoms/introduction"
tags: [cal-com, docs]
---
# Introduction to Cal.com Atoms

Copy page

Embed Cal.com scheduling components directly into your application

Copy page

Cal.com Atoms are customizable React components that let you integrate Cal.com scheduling functionality directly into your application. Using OAuth authentication, your users can connect their Cal.com accounts and manage their scheduling without leaving your app.
## 
What are atoms?

Atoms are pre-built UI components that handle:
*   **Booking** - Let users book appointments with Cal.com users
*   **Availability** - Display and manage availability schedules
*   **Event Types** - Create and configure event types
*   **Calendar Integration** - Connect Google, Outlook, and Apple calendars
*   **Payments** - Accept payments via Stripe for bookings

## 
Supported frameworks

Cal.com Atoms currently support:
*   **React 18** and **React 19**
*   **Next.js 14** and **Next.js 15**

## 
Prerequisites

*   An OAuth client created via [[docs-api-reference-v2-oauth|OAuth setup]]
*   User access tokens obtained through the OAuth flow

## 
Getting started

Ready to integrate atoms into your application? Follow our step-by-step setup guide to get started.

## Setup Guide

Complete installation and configuration instructions

## 
Authentication flow

Atoms with OAuth work with regular Cal.com user accounts:
1.   User clicks “Connect with Cal.com” in your app
2.   User authorizes your OAuth client on Cal.com
3.   You receive access and refresh tokens
4.   Pass the access token to `CalOAuthProvider`
5.   Atoms use this token to make API calls on behalf of the user

See the [[docs-api-reference-v2-oauth|OAuth documentation]] for details on implementing the authentication flow.

Was this page helpful?

Yes No

[[docs-atoms-setup|Setup]]
