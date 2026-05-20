---
title: "Calendar view"
source: "https://cal.com/docs/atoms/calendar-view"
tags: [cal-com, docs]
---
The calendar view atom is basically a weekly calendar view wherein users can see entire week at a glance, clearly showing both available and unavailable time slots. This view is designed to provide a comprehensive and easy-to-read schedule, helping users quickly identify open slots for booking or planning.

## Individual event type

Below code snippet can be used to render the calendar view atom for an individual event

```
import { CalendarView } from "@calcom/atoms";

export default function Booker( props : BookerProps ) {
  return (
    <div>
       <CalendarView username={props.calUsername} eventSlug={props.eventSlug} />
    </div>
  )
}
```

## Team event type

Below code snippet can be used to render the calendar view atom for a team event

```
import { CalendarView } from "@calcom/atoms";

export default function Booker( props : BookerProps ) {
  return (
    <div>
       <CalendarView teamId={props.teamId} eventSlug={props.eventSlug} />
    </div>
  )
}
```

For a demonstration of the calendar view atom, please refer to the video below.

Below is a list of props that can be passed to the create event type atom

| Name | Required | Description |  |  |
| --- | --- | --- | --- | --- |
| eventSlug | Yes | Unique slug created for a particular event |  |  |
| username | Optional | Username of the person whose schedule is to be displayed, required only for individual events |  |  |
| teamId | Optional | Id of the team for which the event is created, required only for team events |  |  |
