---
title: "Twilio"
source: "https://cal.com/docs/self-hosting/apps/install-apps/twilio"
tags: [cal-com, docs]
---
1.   **Create a Twilio account** - Go to [Twilio](https://www.twilio.com/) and create a new account.

2.   **Get a Twilio phone number** - Click on ‘Get a Twilio phone number’ to obtain a phone number for your account.

3.   **Save the Account SID** - Copy the Account SID and add it to your `.env` file under the field:

`TWILIO_SID`

1.   **Save the Auth Token** - Copy the Auth Token and add it to your `.env` file under the field:

`TWILIO_TOKEN`

1.   **Save the Twilio phone number** - Copy your Twilio phone number and add it to your `.env` file under the field:

`TWILIO_PHONE_NUMBER`

1.   **Set the Sender ID** - Add your own sender ID to the `.env` file under the field:

`NEXT_PUBLIC_SENDER_ID`

(The fallback is set to “Cal” if not specified.)

1.   **Create a Messaging Service** - Navigate to **Develop** ->**Messaging** ->**Services**, then create a new messaging service.

2.   **Name the Messaging Service** - Choose a name for the messaging service. This can be anything you like.

3.   **Add Senders to the Messaging Service** - Click ‘Add Senders’ and select ‘Phone number’ as the sender type.

4.   **Add your Twilio phone number as a sender** - Add the listed phone number to the messaging service.

5.   **Complete the Messaging Service setup** - Leave all other fields as they are, then complete the setup by clicking ‘View my new Messaging Service’.

6.   **Save the Messaging Service SID** - Copy the Messaging Service SID and add it to your `.env` file under the field:

`TWILIO_MESSAGING_SID`

1.   **Create a Verify Service** - Go to the Twilio dashboard, create a new Verify Service, and name it as you wish.

2.   **Save the Verify Service SID** - Copy the Verify Service SID and add it to your `.env` file under the field:

`TWILIO_VERIFY_SID`

> This app is **required** for Workflows

Last updated on

April 26, 2026

[Stripe](https://www.cal.diy/apps/stripe "Stripe")[Zoho](https://www.cal.diy/apps/zoho "Zoho")
