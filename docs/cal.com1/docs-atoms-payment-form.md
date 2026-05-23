---
title: "Payment form"
source: "https://cal.com/docs/atoms/payment-form"
tags: [cal-com, docs]
---
# Payment form

Copy page

Copy page

The Payment form atom is a streamlined interface that integrates with Stripe to facilitate secure payment processing for bookings. It allows users to easily enter their payment information, ensuring a smooth and efficient transaction experience at the time of booking.Below code snippet can be used to render the Payment form atom

```
import { PaymentForm } from "@calcom/atoms";

export default function StripePaymentForm(uid: string) {
  return (
    <>
      <PaymentForm paymentUid={uid} />
    </>
  );
}
```

For a demonstration of the Payment form, please refer to the video below.Below is a list of props that can be passed to the Payment form.

| Name | Required | Description |
| --- | --- | --- |
| paymentUid | Yes | The uid of the payment |
| onPaymentSuccess | No | Callback function to be executed upon successful payment processing |
| onPaymentCancellation | No | Callback function to be executed upon payment processing failure |
| onEventTypePaymentInfoSuccess | No | Callback function to be executed when payment information is successfully processed. |
| onEventTypePaymentInfoFailure | No | Callback function to be executed upon payment information processing failure. |

## 
Combining payment form with event types atom

The Payment form atom works best when combined with the event types atom to provide a seamless payment experience. In order to combine payment and event types atom, here are the steps we recommend:

1

Setup stripe in event types atom

The event types atom has a payments tab which you can use to connect your stripe account and set up payments info (price, currency, etc.)Below code snippet can be used to setup the event types atom

```
import { EventTypeSettings } from "@calcom/atoms";

export default function EventType(id: number) {
  return (
      <>
        <EventTypeSettings id={id} allowDelete={true} />
      </>
  );
}
```

With this you’re all set to accept payments for your bookings.

2

Use booker atom to access payment uid

The booker atom has a prop called `onCreateBookingSuccess` which is a callback function that gets called at the time of a successful booking creation. This function takes a parameter called `data` which contains the payment uid and another property called paymentRequired which can be used to detect if the booking requires payment or not. You can use the payment uid to access the payment form atom.Either store the payment uid in your database, a local state variable or pass it into another page as query parameters.Below code snippet can be used to obtain the payment uid from the booker atom

```
import { Booker } from "@calcom/atoms";

export default function Booker( props : BookerProps ) {
  return (
    <>
      <Booker
        eventSlug={props.eventTypeSlug}
        username={props.calUsername}
        onCreateBookingSuccess={(data) => {
          if (data.data.paymentRequired) {
            // assuming you have set up a separate page for payment with the same path
            // if using nextjs, better to use next/router
            window.location.href = `/payment/${data.data.paymentUid}`;
          }           
         }}
      />
    </>
  )
}
```

3

Set up a page for payments

We recommend setting up a separate page for the payment form for the sake of a smooth and streamlined flow, but you can also do it in the same page. From the previous step, you get redirected to the payment page when the booking is created. You can now access the payment uid present in the query parameters and render the payment form atom.Below code snippet can be used to obtain the payment uid and pass it to payment form atom.

```
import { PaymentForm } from "@calcom/atoms";

export default function StripePaymentForm() {
  // if using nextjs, better to use the usePathname hook
  const pathname = window.location.pathname;
  const uid = pathname.split("/").pop();

  return (
    <>
      <PaymentForm paymentUid={uid} />
    </>
  );
}
```

Below video shows a demonstration of how we combined the event types atom and payment form in one of our of our example app to create a seamless payment experience.

Link to the example app can be found [here](https://github.com/calcom/cal.com/tree/main/packages/platform/examples/base)

Was this page helpful?

Yes No

[[docs-atoms-stripe-connect|Stripe Connect]][[docs-atoms-troubleshooter|Troubleshooter]]
