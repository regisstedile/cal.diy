---
title: "Vercel"
source: "https://cal.com/docs/self-hosting/deployments/vercel"
tags: [cal-com, docs]
---
## Requirements

Currently Vercel Pro Plan is required to be able to Deploy this application with Vercel, due to limitations on the number of serverless functions on the free plan.

You need a PostgresDB database hosted somewhere. [Supabase](https://supabase.com/) offer a great free option while [Heroku](https://heroku.com/) offers a low-cost option.

## One Click Deployment

[![Image 1: Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/calcom/cal.diy)

## Manual Deployment

### Local settings

1.   **Fork and clone the repository**

`git clone https://github.com/<<your-fork>>/cal.diy.git`

1.   **Set environment variables**

Copy the `.env.example` file in `apps/web`, rename it to `.env` and fill it with your settings (See [manual setup](https://www.cal.diy/installation) and Obtaining the Google API Credentials)

1.   **Install packages with yarn**

`yarn install`

1.   **Set up the database using the Prisma schema**

Schema is located in at `packages/prisma/schema.prisma`.

`yarn workspace @calcom/prisma db-deploy`

1.   **Open Prisma Studio**

To look at or modify the database content

`yarn db-studio`

1.   **Open User model**

Click on the `User` model to add a new user record.

1.   **Create new user**

Fill out the fields (remembering to encrypt your password with [BCrypt](https://bcrypt-generator.com/)) and click `Save 1 Record` to create your first user.

1.   **Login**

Open a browser to port 3000 on your localhost and login with your just created, first user.

> Sometimes, yarn install might fail during deployment on Vercel, in which case, you can use `YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn install` as the install command instead.

#### Deployment

1.   Create a new project on Vercel
2.   Import from your forked repository
3.   Set the Environment Variables
4.   Set the root directory to `apps/web`
5.   Override the build command to:

`cd ../.. && yarn build --include-dependencies --no-deps`

1.   Hit Deploy

Last updated on

April 26, 2026

[Render](https://www.cal.diy/deployments/render "Render")[Troubleshooting](https://www.cal.diy/troubleshooting "Troubleshooting")
