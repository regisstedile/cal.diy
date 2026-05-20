---
title: "Troubleshooter"
source: "https://cal.com/docs/atoms/troubleshooter"
tags: [cal-com, docs]
---
# Troubleshooter

Copy page

Copy page

The Troubleshooter atom helps users debug their availability and scheduling issues. It displays a sidebar where users can select an event type, view their schedule, and toggle connected calendars alongside a large calendar view that visually shows the resulting availability. Essentially, it lets users diagnose why certain time slots may or may not appear as available.Below code snippet can be used to render the Troubleshooter atom

```
import { TroubleShooter } from "@calcom/atoms";

export default function TroubleShooterAtom() {
  return (
    <>
      <TroubleShooter />
    </>
  );
}
```

For a demonstration of the Troubleshooter atom, please refer to the video below.We offer some customizations to the Troubleshooter atom via props. Below is a list of props that can be passed to the Troubleshooter atom.

| Name | Required | Description |
| --- | --- | --- |
| onManageCalendarsClick | No | Callback triggered when the “Manage Calendars” button is clicked (shown when calendars are connected) |
| onInstallCalendarClick | No | Callback triggered when the “Install Calendar” button is clicked (shown when no calendars are connected) |

Was this page helpful?

Yes No

[[docs-atoms-payment-form|Payment form]][[docs-atoms-guides-booking-fields|Managing booking fields]]
