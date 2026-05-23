---
title: "Apple calendar connect"
source: "https://cal.com/docs/atoms/apple-calendar-connect"
tags: [cal-com, docs]
---
The Apple calendar connect button is used to sync user’s apple calendar - whenever an event is created in cal.com it will show up in the apple calendar.Below code snippet can be used to render the Apple calendar connect button

```
import { Connect } from "@calcom/atoms";

export default function ConnectCalendar() {
  return (
    <>
      <Connect.AppleCalendar />
    </>
  );
}
```

For a demonstration of the Apple calendar connect integration, please refer to the video below.

The apple calendar atom works a bit differently than outlook and google calendar. We don’t get redirected to an OAuth consent page, instead a modal appears which prompts us to create an app specific password to use with Cal.com Similar to Outlook and Google calendar, the Apple calendar connect supports integration for both single and multiple users. The above video demonstration showcases the integration for a single user. To enable integration for multiple users, simply pass the prop `isMultiCalendar` as `true`.Below code snippet can be used to render the Apple calendar connect button for multiple users

```
import { Connect } from "@calcom/atoms";

export default function ConnectCalendar() {
  return (
    <>
      <Connect.AppleCalendar isMultiCalendar={true} />
    </>
  );
}
```

For a demonstration of the Apple calendar connect integration for multiple users, please refer to the video below.

We offer all kinds of customizations to the Outlook calendar connect via props. Below is a list of props that can be passed to the Google calendar connect.

| Name | Required | Description |
| --- | --- | --- |
| className | No | To pass in custom classnames from outside for styling the atom |
| label | No | The label for the connect button |
| alreadyConnectedLabel | No | Label to display when atom is in already connected state |
| loadingLabel | No | Label to display when atom is in loading state |
| onCheckError | No | A callback function to handle errors when checking the connection status |
| initialData | No | Initial data to be passed |
| isMultiCalendar | No | Specifies if the button supports integration for multiple users |
| tooltip | No | In case user wants to pass external tooltip component |
| tooltipSide | No | Specifies what direction the tooltip appears |
| isClickable | No | Boolean to disable button or not |
| onSuccess | No | A callback function to handle success when checking the connection status |
