---
title: "Conferencing Apps"
source: "https://cal.com/docs/atoms/conferencing-apps"
tags: [cal-com, docs]
---
The Conferencing Apps Atom allows users to seamlessly install applications such as Zoom, Google Meet, and Microsoft Teams, enabling them to set these as default or optional locations for their events.Below code snippet can be used to render Conferencing Apps Atom

```
import { ConferencingAppsSettings } from "@calcom/atoms";
import { usePathname } from "next/navigation";

export default function ConferencingApps() {
  const pathname = usePathname();
  const callbackUri = `${window.location.origin}${pathname}`;

  return (
    <>
        <ConferencingAppsSettings returnTo={callbackUri} onErrorReturnTo={callbackUri} />
    </>
  )
}
```

Below is a list of props that can be passed to the Conferencing Apps Atom

| Name | Required | Description |
| --- | --- | --- |
| returnTo | No | The URL of the page to redirect to after a successful installation. |
| onErrorReturnTo | No | The URL of the page to redirect to in case an error occurs. |
| disableToasts | No | Boolean value to disable toast notifications in the atom. |
| apps | No | Array of conferencing app slugs to display in the dropdown. If provided, only these apps will be shown (if not already installed). Valid values are `'google-meet'`, `'zoom'`, and `'msteams'`. |
| disableBulkUpdateEventTypes | No | A Boolean flag that prevents the bulk update of event types modal from appearing when the default conferencing app is changed. Defaults to false |

## Google Meet

For a demonstration of installing Google Meet, setting it as the default conferencing app for all event types, and removing the app, please watch the video below.

## Zoom

For a demonstration of installing Zoom, setting it as the default conferencing app for all event types, and removing the app, please watch the video below.

## MS Teams Video

For a demonstration of installing MS Teams Video, setting it as the default conferencing app for all event types, and removing the app, please watch the video below.
