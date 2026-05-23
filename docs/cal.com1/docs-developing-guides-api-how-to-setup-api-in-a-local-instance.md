---
title: "How to Set Up the API in a Local Instance"
source: "https://cal.com/docs/developing/guides/api/how-to-setup-api-in-a-local-instance"
tags: [cal-com, docs]
---
API Development

To test the API in your local instance, you have the following pre-requisites:

1

Clone the cal.com repository

Please clone the cal.com repository. You can do it by following the instructions provided in [[docs-developing-local-development|Installation]]

2

Add license key in .env

Add a staging license key that goes in as value for `CALCOM_LICENSE_KEY` in your root `.env` file.You can use the following as staging license key

```
cal_live_QiMeiCoFjEczVQmY6EJTeiJV
```

3

Start development server and create API key

Start the cal.com server using `yarn dev` on localhost and create the test API keys by visiting `/settings/developer/api-keys`

4

Copy .env.example file

Copy the `.env.example` file to `.env` file by running `cp apps/api/v2/.env.example apps/api/v2/.env` from the root folder

5

Start API server and test API

Start the API v2 server by running `yarn workspace @calcom/api-v2 dev` and start testing your API locally

By default, the app server runs on port 3000 and the API server runs on port 3003

Was this page helpful?

[[docs-developing-open-source-contribution-contributors-guide|Contributor's Guide]][[docs-developing-guides-appstore-and-integration-build-a-greeter-app|Build a greeter app]]
