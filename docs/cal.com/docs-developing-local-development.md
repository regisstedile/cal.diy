---
title: "Local Development"
source: "https://cal.com/docs/developing/local-development"
tags: [cal-com, docs]
---
Cal.com runs with pretty minimal hardware requirements by itself. The most intensive part for the software is when you actually build the software, but once it’s running it’s relatively lightweight.Cal.com works with a very large range of operating systems, as it only requires JavaScript execution to run. **Cal.com is known to work well with Windows, Mac, Linux and BSD.** Although they do work well on all of them, for production deployments we would suggest Linux as the ideal platform. Any operating system that runs Node.js should be able to work too, but these are some of the common operating systems that we know work well.To run Cal.com, you need to install a few things. **Node.js, yarn, Git and PostgreSQL**. We use **Prisma** for database maintenance, and is one of the dependencies. We won’t publish installation guides for these as they have their own resources available on the internet. If you’re on Linux/BSD, all of these things should be readily available on your package manager. Your best bet is searching for something like **Debian 12 PostgreSQL**, which will give you a guide to installing and configuring PostgreSQL on Debian Linux 12.

## Development Setup & Production Build

1.   **First, you git clone the repository** with the following command, so you have a copy of the code. ```
git clone https://github.com/calcom/cal.com.git
``` 

1.   Then, go into the directory you just cloned with```
cd cal.com
``` and run```
yarn
``` to install all of the dependencies. Essentially, dependencies are just things that Cal.com needs to install to be able to work.
2.   Then, you just need to set up a couple of things. For that, we use a `.env` file. We just need to copy and paste the `.env.example` file and rename the copy to `.env`. Here you’ll have a template with comments showing you the settings you need/might want to set.
3.   Next, use the command```
openssl rand -base64 32
``` (or another secret generator tool if you prefer) to generate a key and add it under `NEXTAUTH_SECRET` in the .env file.
4.   You’ll also want to fill out the `.env.appStore` file similar to the `.env` file as this includes keys to enable apps.

**Development tips**

> Add `NEXT_PUBLIC_DEBUG=1` anywhere in your `.env` to get logging information for all the queries and mutations driven by **trpc**.

```
echo 'NEXT_PUBLIC_DEBUG=1' >> .env
```

> For email testing, set it to “1” if you need to email checks in E2E tests locally. Make sure to run mailhog container manually or with `yarn dx`.

```
echo 'E2E_TEST_MAILHOG_ENABLED=1' >> .env
```

### E2E Testing

Be sure to set the environment variable `NEXTAUTH_URL` to the correct value. If you are running locally, as the documentation within `.env.example` mentions, the value should be `http://localhost:3000`.In a terminal just run:

```
yarn test-e2e
```

To open last HTML report run:

```
yarn playwright show-report test-results/reports/playwright-html-report
```

### Manual setup

1.   Configure environment variables in the .env file. Replace `<user>`, `<pass>`, `<db-host>`, `<db-port>` with their applicable values```
DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
``` 
2.   Set a 24 character random string in your .env file for the `CALENDSO_ENCRYPTION_KEY` (You can use a command like```
openssl rand -base64 24
``` to generate one).
3.   Set up the database using the Prisma schema (found in `packages/prisma/schema.prisma`)```
yarn workspace @calcom/prisma db-deploy
``` 
4.   Run (in development mode)```
yarn dev
``` 

## **Development quick start with****`yarn dx`**

> *   **Requires Docker and Docker Compose to be installed**
> *   Will start a local Postgres instance with a few test users - the credentials will be logged in the console

```
yarn dx
```

## **Cron Jobs**

There are a few features which require cron job setup. At cal.com, the cron jobs are found in the following directory:

```
/apps/web/app/api/cron
```

## App store seeder

## API

#### Step 1

Copy the .env files from their respective example files depending on the version of the API (v1 or v2):

```
cp apps/api/{version}/.env.example apps/api/{version}/.env
cp .env.example .env
```

#### Step 2

Install packages with yarn:

```
yarn
```

### Running API server

Run the API v1 with yarn:

```
yarn workspace @calcom/api dev
```

Run the API v2 with yarn:

```
yarn workspace @calcom/api-v2 dev
```

Open [http://localhost:3003](http://localhost:3003/) with your browser to see the result.If you wish to test how API works locally, please [[docs-developing-guides-api-how-to-setup-api-in-a-local-instance|check out our guide here]].
