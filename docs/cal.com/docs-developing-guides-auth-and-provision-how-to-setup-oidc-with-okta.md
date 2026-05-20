---
title: "Setting up OIDC with okta"
source: "https://cal.com/docs/developing/guides/auth-and-provision/how-to-setup-oidc-with-okta"
tags: [cal-com, docs]
---
Auth and Provision

1

Create an application with your OIDC provider

For example, in Okta, once you create an account, you can click on Applications on the sidebar menu:![Image 1](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-oVjaQ0tU3AnO_wrzp85.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=9026756e1372c1ef4adfc2b39d8116b1)

2

Click on Create App Integration

![Image 2](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-wrIlZkLdZ6kL_wf7mxn.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=3bd200085a219cb22958a27d70cd6bdf)

3

Select OIDC in the modal form, along with Web App, and click Next

![Image 3](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-IfRWYg8XuCMI_tkwyft.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=2144b11c135b98c7c6b4fbbbad2be00d)

4

Enter the Sign in redirect URL and sign out URL

Enter the Sign in redirect URL (or auth URL) as:

```
https://app.cal.com/api/auth/oidc
```

And the sign out URL as:

```
https://app.cal.com/auth/login
```

![Image 4](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-TqgDJpBoiR-C_onrwit.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=f735d06435a7f79dfd9438144cee7b79)

5

Gather Client Secret, Client ID, and Well Known URL

Now you should have the Client Secret and Client ID with you. You would also need the Well Known URL which for Okta is generally of the type:

```
https://{yourOktaDomain}/.well-known/openid-configuration
```

So, if your Okta domain is `dev-123456.okta.com`, your well known URL would be:

```
https://dev-123456.okta.com/.well-known/openid-configuration
```

6

Log in

Log in with the Organization Admin user.

7

Go to Organization SSO Settings

Visit `https://app.cal.com/settings/organizations/sso` and you should see something like this:![Image 5](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-8ufcUyCOVwV6_hdudno.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=37dffec32096a904602a950d5948c3b1)

8

Configure SSO with OIDC

Click on Configure SSO with OIDC, and then enter the Client Secret, Client ID, and Well Known URL from Step 5, and click save.![Image 6](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-GN1NLgrcf5r4_tmhni3.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=c646f3f045613f8ace93eaac69124882)

That’s it. Now when you try to login with SSO, your application on Okta will handle the authentication.

Was this page helpful?

[[docs-developing-guides-appstore-and-integration-salesforce|Salesforce integration]][[docs-developing-guides-auth-and-provision-how-to-setup-scim-with-okta|How to setup scim with okta]]
