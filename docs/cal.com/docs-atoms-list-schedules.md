---
title: "List schedules"
source: "https://cal.com/docs/atoms/list-schedules"
tags: [cal-com, docs]
---
# List schedules

Copy page

Copy page

The List schedules atom displays all of a user’s availability schedules and provides management actions such as delete, duplicate, and edit capabilities for each schedule.Below code snippet can be used to render the List schedules atom

```
import { ListSchedules } from "@calcom/atoms";

export default function ListSchedules() {
  return (
    <>
      <ListSchedules getRedirectUrl={(scheduleId) => `/availability/${scheduleId}`} />
    </>
  );
}
```

For a demonstration of the List schedules atom, please refer to the video below.Below is a list of props that can be passed to the List schedules atom.

| Name | Required | Description |
| --- | --- | --- |
| getRedirectUrl | No | Callback function that determines where the user should be redirected when they click on a schedule from the atom |

## 
Combining list schedules atom with availability settings atom

The List schedules atom works best when combined with the Availability settings atom to provide a seamless experience. In order to combine both of atom, here are the steps we recommend:

1

Setup list schedules atom

Create a page for demostrating the list schedules atom.Below code snippet can be used to setup the list schedules atom on a new page

```
import { ListSchedules } from "@calcom/atoms";

export default function ListSchedules() {
  return (
    <>
      <ListSchedules getRedirectUrl={(scheduleId) => `/availability/${scheduleId}`} />
    </>
  );
}
```

`getRedirectUrl` prop is a callback function that determines where the user should be redirected when they click on a schedule from the atom. Say if you want to display your availability settings atom on the page `/availability/:scheduleId`, you need to make sure you return the exact same url when you call the `getRedirectUrl` function.

2

Setup availability settings atom

Create a page for demonstrating the availability settings atom. This should be a dynamic route that accepts a schedule id as a query parameter, and then the schedule id gets passed to the availability settings atom.Below code snippet can be used to obtain the `scheduleId` and display the availability settings atom

```
import { AvailabilitySettings } from "@calcom/atoms";
import { useRouter } from "next/router";

export default function Availability() {
  const router = useRouter();

  return (
    <>
       <AvailabilitySettings
          id={router.query.scheduleId as string}
          onUpdateSuccess={() => {
            console.log("Updated schedule successfully");
          }}
       />
    </>
  )
}
```

-Below video shows a demonstration of how we combined the list schedules atom and availability settings atom in one of our example app to create a seamless availability management experience.

Link to the example app can be found [here](https://github.com/calcom/cal.com/tree/main/packages/platform/examples/base)

Was this page helpful?

Yes No

[[docs-atoms-create-schedule|Create schedule]][[docs-atoms-calendar-settings|Calendar settings]]
