---
title: "Custom toasts"
source: "https://cal.com/docs/atoms/guides/replacing-toasts"
tags: [cal-com, docs]
---
# Custom toasts

Copy page

Replace default cal.com toasts with your own

Copy page

It is possible to disable default toasts for the `AvailabilitySettings` and `EventTypeSettings` atoms to then use hooks => callbacks and listen for updates to then render your own toasts.If we use the `AvailabilitySettings` atom, make changes and press “Save” a confirmation appears:![Image 4](https://mintcdn.com/calcom/5iwI3KYRn4f5i5y6/images/platform/guides/replacing-toasts/availability-settings.png?fit=max&auto=format&n=5iwI3KYRn4f5i5y6&q=85&s=b3a782a95744492dc6910f5396025954)We can disable them using `disableToasts` prop:

```
<AvailabilitySettings
    disableToasts={true}
/>
```

Now when changes happen and Save is clicked the toast will not appear.You can then create functions and pass them to hooks:

```
<AvailabilitySettings
    disableToasts={true}
    onUpdateSuccess={updateSuccessHandler}
    onUpdateError={updateErrorHandler}
    onDeleteSuccess={deleteSucessHandler}
    onDeleteError={deleteErrorHandler}
/>
```

in case of success response is passed to your functions and in case of error and error.

Was this page helpful?

Yes No

[[docs-atoms-guides-custom-slot-select-flow|Custom slot selection flow]][[docs-atoms-hooks-bookings-hooks|Bookings hooks]]
