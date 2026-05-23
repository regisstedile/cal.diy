---
title: "Introduction"
source: "https://cal.com/docs/developing/open-source-contribution/introduction"
tags: [cal-com, docs]
---
# Introduction

Copy page

Copy page

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
*   Before jumping into a PR be sure to search [existing PRs](https://github.com/calcom/cal.com/pulls) or [issues](https://github.com/calcom/cal.com/issues) for an open or closed item that relates to your submission.

### 
Priorities

| Type of issue | Priority |
| --- | --- |
| Minor improvements, non-core feature requests | ![Image 3](https://mintcdn.com/calcom/IJXPlLmO0GaIo5cX/images/low-priority.svg?fit=max&auto=format&n=IJXPlLmO0GaIo5cX&q=85&s=59c55347723475315423da91840e90da) |
| Confusing UX (… but working) | ![Image 4](https://mintcdn.com/calcom/IJXPlLmO0GaIo5cX/images/medium-priority.svg?fit=max&auto=format&n=IJXPlLmO0GaIo5cX&q=85&s=e69c8b1480f8cc82aa4bf45ba75a15f9) |
| Core Features (Booking page, availability, timezone calculation) | ![Image 5](https://mintcdn.com/calcom/8GfNX30pjjoUcF3B/images/high-priority.svg?fit=max&auto=format&n=8GfNX30pjjoUcF3B&q=85&s=31317a8702bd0ea51ce45ad918b2c16e) |
| Core Bugs (Login, Booking page, Emails are not working) | ![Image 6](https://mintcdn.com/calcom/KyzqDyvkDTIa4GMP/images/urgent-priority.svg?fit=max&auto=format&n=KyzqDyvkDTIa4GMP&q=85&s=32721a9c3a9169d07bca690ed31f47bc) |

### 
Developing

The development branch is `main`. This is the branch that all pull requests should be made against. The changes on the `main` branch are tagged into a release monthly.To develop locally:
1.   [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2.   Create a new branch:  ```
git checkout -b MY_BRANCH_NAME
```    
3.   Install yarn:  ```
npm install -g yarn
```    
4.   Install the dependencies with:  ```
yarn
```    
5.   Start developing and watch for code changes:  ```
yarn dev
```    

### 
Building

You can build the project with:

```
yarn build
```

Please be sure that you can make a full production build before pushing code.
### 
Testing

More info on how to add new tests coming soon.
### 
Running tests

This will run and test all flows in multiple Chromium windows to verify that no critical flow breaks:

```
yarn test-e2e
```

### 
Linting

To check the formatting of your code:

```
yarn lint
```

If you get errors, be sure to fix them before committing.
### 
Making a Pull Request

*   Be sure to [check the “Allow edits from maintainers” option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating you PR.
*   If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
*   Be sure to fill the PR Template accordingly.

### 
Guidelines for committing yarn lockfile

Do not commit your `yarn.lock` unless you’ve made changes to the `package.json`. If you’ve already committed `yarn.lock` unintentionally, follow these steps to undo:If your last commit has the `yarn.lock` file alongside other files and you only wish to uncommit the `yarn.lock`:

```
git checkout HEAD~1 yarn.lock
git commit -m "Revert yarn.lock changes"
```

If you’ve pushed the commit with the `yarn.lock`:
1.   Correct the commit locally using the above method.
2.   Carefully force push:

```
git push origin <your-branch-name> --force
```

If `yarn.lock` was committed a while ago and there have been several commits since, you can use the following steps to revert just the `yarn.lock` changes without impacting the subsequent changes:
1.   **Checkout a Previous Version**:
    *   Find the commit hash before the `yarn.lock` was unintentionally committed. You can do this by viewing the Git log:  ```
git log yarn.lock
```    
    *   Once you have identified the commit hash, use it to checkout the previous version of `yarn.lock`:  ```
git checkout <commit_hash> yarn.lock
```    

2.   **Commit the Reverted Version**:
    *   After checking out the previous version of the `yarn.lock`, commit this change:  ```
git commit -m "Revert yarn.lock to its state before unintended changes"
```    

3.   **Proceed with Caution**:
    *   If you need to push this change, first pull the latest changes from your remote branch to ensure you’re not overwriting other recent changes:  ```
git pull origin <your-branch-name>
```    
    *   Then push the updated branch:  ```
git push origin <your-branch-name>
```    

Was this page helpful?

Yes No

[[docs-developing-local-development|Local Development]][[docs-developing-open-source-contribution-code-styling|Code styling]]
