---
title: "Stripe Connect"
source: "https://cal.com/docs/atoms/stripe-connect"
tags: [cal-com, docs]
---
The Stripe connect integration allows users to effortlessly connect their Stripe account for payment processing. This enables users to accept payments for their bookings, with automatic payment collection and processing through Stripe’s secure platform.

## Ways to connect Stripe

There are two ways to connect your Stripe account:

1

2

## Advanced usage

### Team integration

To integrate Stripe to team events, pass the `teamId` prop.Below code snippet can be used to render the Stripe connect atom for team:

```
import { StripeConnect } from "@calcom/atoms";

export default function ConnectTeamStripe() {
  const teamId = 123; // Your team ID

  return (
    <>
      <StripeConnect teamId={teamId} />
    </>
  );
}
```

### Custom labels

You can customize the button labels for different states (default, loading, and already connected):

```
import { StripeConnect } from "@calcom/atoms";

export default function ConnectStripe() {
  return (
    <>
      <StripeConnect
        label="Connect to Stripe"
        loadingLabel="Checking connection..."
        alreadyConnectedLabel="Stripe Connected"
      />
    </>
  );
}
```

### Redirect URLs

You can specify custom redirect URLs for successful connections and error scenarios:

```
import { StripeConnect } from "@calcom/atoms";

export default function ConnectStripe() {
  return (
    <>
      <StripeConnect redir="/dashboard/payments" errorRedir="/dashboard/settings" />
    </>
  );
}
```

### Handling connection status

You can use callback functions to handle connection check success and errors:

```
import { StripeConnect } from "@calcom/atoms";

export default function ConnectStripe() {
  const handleCheckSuccess = () => {
    console.log("Stripe connection verified successfully");
  };

  const handleCheckError = (error) => {
    console.error("Error checking Stripe connection:", error);
  };

  return (
    <>
      <StripeConnect onCheckSuccess={handleCheckSuccess} onCheckError={handleCheckError} />
    </>
  );
}
```

### Custom styling

You can customize the appearance of the button using the `className`, `icon`, and `color` props:

```
import { StripeConnect } from "@calcom/atoms";

export default function ConnectStripe() {
  return (
    <>
      <StripeConnect className="!bg-purple-600 hover:!bg-purple-700" icon="credit-card" color="secondary" />
    </>
  );
}
```

## Props

We offer all kinds of customizations to the Stripe connect via props. Below is a list of props that can be passed to the Stripe Connect.

| Name | Required | Description |
| --- | --- | --- |
| teamId | No | The ID of the team for team-based Stripe connections |
| icon | No | Custom icon to display on the button (defaults to “credit-card”) |
| color | No | Button color variant (defaults to “primary”) |
| isClickable | No | Boolean to override the disabled state and make the button always clickable |
| className | No | To pass in custom classnames from outside for styling the atom |
| label | No | The label for the connect button |
| alreadyConnectedLabel | No | Label to display when atom is in already connected state |
| loadingLabel | No | Label to display when atom is in loading state |
| onCheckError | No | A callback function to handle errors when checking the connection status |
| redir | No | A custom redirect URL link where the user gets redirected after successful authentication |
| errorRedir | No | A custom redirect URL link where the user gets redirected after authentication failure |
| initialData | No | Initial data to be passed for the connection check |
| onCheckSuccess | No | A callback function to handle success when checking the connection status |

## Setting price and currency

Once you have connected your Stripe account, you can set the price and currency for your event type. This will make sure that the booking is a paid event.For a demonstration on how to set the price and currency, please refer to the video below.

## Integration with Payment Form

The Stripe connect atom works seamlessly with the Payment Form atom. First, connect your Stripe account using this atom, then use the Payment Form atom to process payments for bookings.For more information on accepting payments and how to combine payment form with Stripe, see the [[docs-platform-atoms-payment-form|Payment Form documentation]].
