---
title: "SSO setup"
source: "https://cal.com/docs/developing/guides/auth-and-provision/sso-setup"
tags: [cal-com, docs]
---
# SSO setup

Copy page

Copy page

Cal.com supports both Security Assertion Markup Language (SAML) and OpenID Connect (OIDC), two of the industry’s leading authentication protocols. We prioritize your ease of access and security by providing robust Single Sign-On (SSO) capabilities. Whether you’re looking for the XML-based standard of SAML or the lightweight OIDC, our platform is equipped to integrate smoothly with your preferred identity provider, ensuring both convenience and security for your users.
### 
Setting up SAML login

1

Create a SAML application with your Identity Provider (IdP)

Follow the instructions here - 

2

Configure access to the IdP SAML app

Ensure that all users who need access to Cal.com have access to the IdP SAML app.

3

Retrieve XML metadata from your IdP

Keep the XML metadata from your IdP accessible, as you will need it later.

4

Log in to your Organization Admin account

Visit `settings/organizations/sso`.

5

Configure SSO with SAML

Click on the `Configure` button for `SSO with SAML`.

6

Paste the XML metadata and Save

In the SAML configuration section, copy and paste the XML metadata from step 3 and click on Save.

7

Your users can now log into Cal using SAML

Once setup is complete, provisioned users can log into Cal.com using SAML.

### 
SAML Registration with Identity Providers

This guide explains the settings you need to use to configure SAML with your Identity Provider. Once configured, obtain an XML metadata file and upload it on your Cal.com instance.
> **Note:** Please do not add a trailing slash at the end of the URLs. Create them exactly as shown below.

**Assertion consumer service URL / Single Sign-On URL / Destination URL:**[https://app.cal.com/api/auth/saml/callback](https://app.cal.com/api/auth/saml/callback)**Entity ID / Identifier / Audience URI / Audience Restriction:**[https://saml.cal.com](https://saml.cal.com/)**Response:** Signed**Assertion Signature:** Signed**Signature Algorithm:** RSA-SHA256**Assertion Encryption:** Unencrypted**Name ID Format:** EmailAddress**Application username:** email**Mapping Attributes / Attribute Statements:**

| Name | Name Format | Value |
| --- | --- | --- |
| firstName | Basic | user.firstName |
| lastName | Basic | user.lastName |

### 
Setting up OIDC login

1

Gather necessary credentials

Keep handy the Client Secret, Client ID, and Well Known URL for the next steps.

2

Log in and go to Organization SSO Settings

Visit `/settings/organizations/sso` and you should see something like this:![Image 3](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-8ufcUyCOVwV6_hdudno.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=37dffec32096a904602a950d5948c3b1)

3

Configure SSO with OIDC

Click on Configure SSO with OIDC, enter the Client Secret, Client ID, and Well Known URL from Step 1, and click save.![Image 4](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-GN1NLgrcf5r4_tmhni3.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=c646f3f045613f8ace93eaac69124882)

4

Complete OIDC setup

Now, when you try to login with SSO, your OIDC provider will handle the authentication.

Was this page helpful?

Yes No

[[docs-developing-guides-auth-and-provision-how-to-setup-scim-with-okta|How to setup scim with okta]][[docs-developing-guides-audit-logs|Audit logs]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

![Image 5](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-8ufcUyCOVwV6_hdudno.png?w=1100&fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=d708e9d93c9cbadc9c02ee977973c497)

![Image 6](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-GN1NLgrcf5r4_tmhni3.png?w=1100&fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=ca06af9968810bfb7e88d15228cbecfe)
