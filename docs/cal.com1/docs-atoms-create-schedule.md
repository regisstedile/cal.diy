---
title: "Create schedule"
source: "https://cal.com/docs/atoms/create-schedule"
tags: [cal-com, docs]
---
The Create Schedule atom provides a simple dialog interface for users to create new availability schedules. Fully customizable with callback support for handling successful schedule creation.Below code snippet can be used to render the Create schedule atom

```
import { CreateSchedule } from "@calcom/atoms";

export default function CreateSchedule() {
  return (
    <>
      <CreateSchedule
        name="Create new schedule"
        customClassNames={{
          createScheduleButton: "bg-red-500 border-none my-4 mx-2 rounded-md",
        }}
      />
    </>
  )
}
```

For a demonstration of the Create schedule atom, please refer to the video below.

For developers who don’t want the dialog-based interface, we provide a `CreateScheduleForm` atom to integrate the schedule creation form directly into your own UI. This headless approach gives you full flexibility to handle layout, styling, and user flow exactly how you need it.Below code snippet can be used to render the Create schedule form atom

```
import { CreateScheduleForm } from "@calcom/atoms";

export default function CreateScheduleForm() {
  return (
    <>
      <CreateScheduleForm
        customClassNames={{
          atomsWrapper: "border-black border w-[500px] my-10 mx-5 rounded-md px-5 py-5",
          buttons: {
            continue: "bg-red-400 border-none",
            container: "justify-start",
          },
        }}
      />
    </>
  )
}
```

For a demonstration of the Create schedule form, please refer to the video below.

We offer all kinds of customizations to the Create schedule atom via props. Below is a list of props that can be passed to the atom.

| Name | Required | Description |
| --- | --- | --- |
| name | No | The label for the create schedule button |
| customClassNames | No | To pass in custom classnames from outside for styling the atom |
| onSuccess | No | Callback function that handles successful creation of schedule |
| onError | No | Callback function to handles errors at the time of schedule creation |
| disableToasts | No | Boolean value that determines whether the toasts are displayed or not |

Along with the props, create schedule atom accepts custom styles via the **customClassNames** prop. Below is a list of props that fall under this **customClassNames** prop.

| Name | Description |
| --- | --- |
| createScheduleButton | Adds styling to the create button |
| inputField | Adds styling to the container of the name input field |
| formWrapper | Adds styling to the whole form |
| actionsButtons | Object containing classnames for the submit, cancel buttons and container inside the create schedule atom |

Similar to the create schedule atom, the create schedule form also offer all kinds of customizations via props. Below is a list of props that can be passed to the atom.

| customClassNames | No | To pass in custom classnames from outside for styling the atom | | onSuccess | No | Callback function that handles successful creation of schedule | | onError | No | Callback function to handles errors at the time of schedule creation | | disableToasts | No | Boolean value that determines whether the toasts are displayed or not |Along with the props, create schedule form also accepts custom styles via the **customClassNames** prop. Below is a list of props that fall under this **customClassNames** prop.

| Name | Description |
| --- | --- |
| formWrapper | Adds styling to the whole form |
| inputField | Adds styling to the container of the name input field |
| actionsButtons | Object containing classnames for the submit, cancel buttons and container inside the create schedule atom |
