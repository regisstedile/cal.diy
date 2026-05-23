---
title: "Google calendar connect"
source: "https://cal.com/docs/atoms/google-calendar-connect"
tags: [cal-com, docs]
---
The Google calendar connect button is used to sync user’s google calendar - whenever an event is created in cal.com it will show up in the google calendar.Below code snippet can be used to render the Google calendar connect button

```
import { Connect } from "@calcom/atoms";

export default function Connect() {
  return (
    <>
      <Connect.GoogleCalendar />
    </>
  )
}
```

For a demonstration of the Google calendar connect integration, please refer to the video below.

Google calendar connect supports integration for both single and multiple users. The above video demonstration showcases the integration for a single user. To enable integration for multiple users, simply pass the prop `isMultiCalendar` as `true`. This allows your application to handle multiple Google calendar accounts seamlessly, providing a more flexible experience for users who manage several calendars.Below code snippet can be used to render the Google calendar connect button for multiple users

```
import { Connect } from "@calcom/atoms";

export default function Connect() {
  return (
    <>
      <Connect.GoogleCalendar isMultiCalendar={true} />
    </>
  )
}
```

For a demonstration of the Google calendar connect integration for multiple users, please refer to the video below.

We offer all kinds of customizations to the Google calendar connect via props. Below is a list of props that can be passed to the Google calendar connect.

| Name | Required | Description |
| --- | --- | --- |
| className | No | To pass in custom classnames from outside for styling the atom |
| label | No | The label for the connect button |
| alreadyConnectedLabel | No | Label to display when atom is in already connected state |
| loadingLabel | No | Label to display when atom is in loading state |
| onCheckError | No | A callback function to handle errors when checking the connection status |
| redir | No | A custom redirect URL link where the user gets redirected after successful authentication |
| initialData | No | Initial data to be passed |
| isMultiCalendar | No | Specifies if the button supports integration for multiple users |
| tooltip | No | In case user wants to pass external tooltip component |
| tooltipSide | No | Specifies what direction the tooltip appears |
| isClickable | No | Boolean to disable button or not |
| onSuccess | No | A callback function to handle success when checking the connection status |
