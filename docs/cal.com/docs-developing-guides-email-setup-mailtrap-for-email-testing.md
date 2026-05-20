---
title: "Setting up mailtrap for email testing"
source: "https://cal.com/docs/developing/guides/email/setup-mailtrap-for-email-testing"
tags: [cal-com, docs]
---
Email

Mailtrap is a versatile tool for testing email notifications without sending them to the real users of your application. It’s especially useful for testing and ensuring that the system sends out accurate emails in a secure and efficient manner.To set up Mailtrap for email testing on Cal.com, follow these steps:

1

Create an Account

The first step is to register an account with Mailtrap. It offers a free plan for small testing needs, and also paid plans for larger organizations.

2

Create an Inbox

After registering, create an inbox for your application. Each inbox comes with its SMTP and POP3 credentials, which can be used to send and retrieve emails.

3

Configure the Cal.com env file

Change the tab to nodemailer and copy the information to `.env`:

```
EMAIL_SERVER_HOST='sandbox.smtp.mailtrap.io' 
EMAIL_SERVER_PORT=2525
EMAIL_SERVER_USER='XXX'
EMAIL_SERVER_PASSWORD='XXX'
```

Please remember to change the user and password and replace ‘XXX’ above with their respective values.

4

Set EMAIL_FROM

Set the `EMAIL_FROM` environment variable in the `.env` file. For example:

```
EMAIL_FROM='notifications@yourselfhostedcal.com'
```

5

Send Test Emails

Once your instance is configured, you can start sending test emails. These emails are “trapped” in the Mailtrap inbox, enabling you to verify email content, headers, and attachments.

6

Analyze and Debug

Mailtrap provides features to analyze and debug your emails. You can check whether the HTML displays correctly, ensure the email is not treated as spam, and also see if it contains any broken links, invalid format, or incorrect images.

Happy testing!

Was this page helpful?

[[docs-developing-guides-atoms-add-changesets|Add changesets]][[docs-developing-guides-embeds-embed-events|Embed Events]]
