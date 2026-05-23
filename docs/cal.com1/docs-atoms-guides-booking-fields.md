---
title: "Managing booking fields"
source: "https://cal.com/docs/atoms/guides/booking-fields"
tags: [cal-com, docs]
---
## Prefilling default booking fields

If you want to pre-fill name and email fields you can pass them to the Booker atom’s defaultFormValues prop:

```
<Booker
    defaultFormValues={{
        name: "bob",
        email: "bob@gmail.com",
    }}
/>
```

which will look like:![Image 1](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/platform/guides/booking-fields/default-fields/booker.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=ce1a7434c26d90a892dcc9d7c5c574b5)

## Prefilling custom booking fields

We created an event type for managed user with custom text and select fields. Name and email fields are created by default. Here is the request:![Image 2](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/platform/guides/booking-fields/custom-fields/request.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=6338af379fd6b3ec82b534bef9bf2a80)That looks in booker like:![Image 3](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/platform/guides/booking-fields/custom-fields/booker.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=5d9e054f02d022c2c6a4bcf2b81d721c)Let’s say you want that when someone is trying to book one of your managed users that the booking fields should be pre-filled with some data. We see that one of the booking fields has slug `coding-language` and the other `help-with`. To pre-fill them you pass their slugs and values to the Booker atom’s defaultFormValues prop:

```
<Booker
    defaultFormValues={{
        "coding-language": "cobol",
        "help-with": "refactoring"
    }}
/>
```

which now will populate the booking fields:![Image 4](https://mintcdn.com/calcom/I5tVBJL5l-pcIYMU/images/platform/guides/booking-fields/custom-fields/prefilled.png?fit=max&auto=format&n=I5tVBJL5l-pcIYMU&q=85&s=2ee8f18385e534ed98a37261c34940ec)

## Making pre-filled fields read-only

`disableOnPrefill` booking field property controls whether or not to make a booking field read only if we pass its value in the defaultFormValues prop. Here is an example request where we create an event type with one booking field with “disableOnPrefill”: true and the other with “disableOnPrefill”: false:![Image 5](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/platform/guides/booking-fields/read-only/request.png?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=c0f6a625c0043c9086ffe8cc349523dd)If we pass their values to the Booker atom:

```
<Booker
    defaultFormValues={{
        "coding-language": "cobol",
        "help-with": "refactoring"
    }}
/>
```

then here is how it will look like in the Booker. The “What language will we peer code in” text field is read only:![Image 6](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/platform/guides/booking-fields/read-only/prefilled.png?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=ef3db4b2f02fb06830408034ef8939df)
