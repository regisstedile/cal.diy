---
title: "How to setup scim with okta"
source: "https://cal.com/docs/developing/guides/auth-and-provision/how-to-setup-scim-with-okta"
tags: [cal-com, docs]
---
# How to setup scim with okta

Copy page

Copy page

1

Create an application with your OIDC provider

For example, in Okta, once you create an account, you can click on Applications on the sidebar menu:![Image 4](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-oVjaQ0tU3AnO_wrzp85.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=9026756e1372c1ef4adfc2b39d8116b1)

2

Click on Create App Integration

![Image 5](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-wrIlZkLdZ6kL_wf7mxn.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=3bd200085a219cb22958a27d70cd6bdf)

3

Select SAML or OIDC and Web App, then click Next

Note you will have to fill in the appropriate fields for the SAML or OIDC setup to continue.
*   [[docs-developing-guides-auth-and-provision-sso-setup|SAML Setup]]
*   [[docs-developing-guides-auth-and-provision-sso-setup|OIDC Setup]]

![Image 6](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-IfRWYg8XuCMI_tkwyft.png?fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=2144b11c135b98c7c6b4fbbbad2be00d)

4

Enable SCIM provisioning

Once the application is created, under General -> App Settings, click “Edit” and then the checkbox “Enable SCIM provisioning”.![Image 7](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/app-settings-enable-scim.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=e343c8b435acc08307373ddc92f5dc03)

5

Go to Directory Sync in Cal.com

Next, go to your instance of Cal.com and navigate to `https://app.cal.com/settings/organization/dsync` and click configure.![Image 8](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=1d3fb362a76567fabfaac07a7bc67ec8)

6

Configure Directory Sync

In the “Configure Directory Sync” form, choose a directory sync name and select “Okta SCIM v2.0” as the “Directory Provider”.![Image 9](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure-provider.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=87b57666fce0719dc72c2579e296f21c)

7

Take note of SCIM Base URL and SCIM Bearer Token

![Image 10](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure-info.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=d859f74a2a63a40eb7618209e9ea6822)

8

Setup Provisioning in Okta

In Okta, go to your application. Navigate to the “Provisioning” tab and click “Integration” under “Settings”.![Image 11](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/okta-dsync-options.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=2cb99d0f8149c66653f20b7cf22c5ebd)
*   Under “SCIM connector base URL” enter the “SCIM Base URL” from Cal.com
*   Under “Unique identifier field for users” enter “email”
*   Under “Supported provisioning actions” enable: 
    *   “Import New Users and Profile Updates”
    *   “Push New Users”
    *   “Push Profile Updates”
    *   “Push Groups”

*   Under “Authentication Mode” choose “HTTP Header”
*   Under “Authentication” enter the “SCIM Bearer Token” from Cal.com
*   When you hit save, it will make a test call to the “SCIM Base URL”

9

Go to the 'To App' settings

After saving, navigate to the “To App” settings, still under the “Provisioning” tab.

10

Enable Provisioning to App

Under “Provisioning to App”, click “Edit” and enable:
*   “Create User”
*   “Update User Attributes”
*   “Deactivate User”

11

Update Attribute Mapping

Under “{Your application name} Attribute Mapping,” remove all fields except for:
*   “username”
*   “givenName”
*   “familyName”
*   “email”
*   “displayName”

12

Map Attributes from Okta Profile

Set each of these properties to “Map from Okta Profile” and the related field. Under “Apply On” select “Create and Update”.![Image 12](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/okta-property-settings.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=cdb70b1b876310295d0d35598898d3a1)

13

Assign users and groups to the app

You can now assign users and groups to the app.

## 
Mapping Okta Groups to Cal.com Teams

When provisioning groups to your organization, Okta groups can be mapped to teams within your organization, and users will be auto-assigned to these teams.On `https://app.cal.com/settings/organization/dsync`, there is a table with the teams under your organization. Click on “Add group name” to map the Okta group to the team.

The group name must be spelled exactly as it is shown on Okta.

When you push the group to your organization, those users will automatically be added to the team.![Image 13](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/group-team-mapping.webp?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=50889f4dcd185c0cc420482abb3d33b6)

Was this page helpful?

Yes No

[[docs-developing-guides-auth-and-provision-how-to-setup-oidc-with-okta|Setting up OIDC with okta]][[docs-developing-guides-auth-and-provision-sso-setup|SSO setup]]

Ctrl+I

[x](https://x.com/calcom)[github](https://github.com/calcom)[linkedin](https://www.linkedin.com/company/cal-com)

![Image 14](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-oVjaQ0tU3AnO_wrzp85.png?w=1100&fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=0d40812b6cf1b39ac158d9ff9877a665)

![Image 15](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/i1600x900-wrIlZkLdZ6kL_wf7mxn.png?w=1100&fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=c1717c86c51b0e6b3a3252a24397da1e)

![Image 16](https://mintcdn.com/calcom/a6KkjhrH4XhVuWk6/images/i1600x900-IfRWYg8XuCMI_tkwyft.png?w=1100&fit=max&auto=format&n=a6KkjhrH4XhVuWk6&q=85&s=d711de6fbb97163a848097474dbbe3fd)

![Image 17](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/app-settings-enable-scim.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=83f910426bd3c42cf631e54d7cb1c792)

![Image 18](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=c5e1e8e5881baaab7e0989926b7f9dfb)

![Image 19](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure-provider.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=2b0c9e80b4b025976c8a47e75914b811)

![Image 20](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/dsync-configure-info.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=7de2fb824871de56e6214d6c9e9f032a)

![Image 21](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/okta-dsync-options.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=02cf29d7e865a07dc32a95ef9a0af421)

![Image 22](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/okta-property-settings.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=96fab1ecb386ef9c87a84d1e06c4007e)

![Image 23](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/scim/group-team-mapping.webp?w=1100&fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=473541f42e56c6bc3b5c3f446ffc0cba)
