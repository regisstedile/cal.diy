---
title: "List Event Types"
source: "https://cal.com/docs/atoms/list-event-types"
tags: [cal-com, docs]
---
# List Event Types

Copy page

Copy page

The List Event Types atom displays all of a user’s event types with their title, description, and duration. Each item includes a dropdown menu with edit and delete actions.

![Image 4: List event types](https://mintcdn.com/calcom/PkbhzFtvD98AUsXw/images/list_event_types_light.png?fit=max&auto=format&n=PkbhzFtvD98AUsXw&q=85&s=6f8ae27ded2d591163afc300023927e6)

## 
Quick start

Below is a code snippet to render the ListEventTypes atom. The `getEventTypeUrl` prop receives the event type ID and should return the URL where users will be redirected when clicking on an event type.

```
import { CalProvider, ListEventTypes } from "@calcom/atoms";

export default function EventTypesPage() {
  return (
    <CalProvider clientId="your-client-id" accessToken="user-access-token">
      <ListEventTypes getEventTypeUrl={(eventTypeId) => `/event-types/${eventTypeId}`} />
    </CalProvider>
  );
}
```

The `ListEventTypes` atom requires authentication. Make sure it’s wrapped in a `CalProvider` with a valid `accessToken`.

## 
Props

| Name | Required | Description |
| --- | --- | --- |
| getEventTypeUrl | No | Callback function that receives the event type ID and returns the URL to redirect when clicking on an event type. If not provided, the event type items will not be clickable. |

## 
Demo

## 
Combining with EventTypeSettings

The ListEventTypes atom can be combined with the [[docs-atoms-event-type|EventTypeSettings]] atom to provide a complete event type management experience. When a user clicks on an event type from the list, they are redirected to a settings page where they can edit the event type details.

1

Create the list page

Use the quick start example above to set up a page that displays all event types. The `getEventTypeUrl` prop should return the route where you’ll render the EventTypeSettings atom (e.g., `/event-types/${eventTypeId}`).

2

Create the settings page

Set up a dynamic route page (e.g., `/event-types/[eventTypeId]`) that extracts the event type ID from the URL and passes it to the EventTypeSettings atom:

```
import { useRouter } from "next/router";

import { CalProvider, EventTypeSettings } from "@calcom/atoms";

export default function EventTypeSettingsPage() {
  const router = useRouter();
  const eventTypeId = Number(router.query.eventTypeId);

  if (!eventTypeId) return null;

  return (
    <CalProvider clientId="your-client-id" accessToken="user-access-token">
      <EventTypeSettings
        id={eventTypeId}
        onSuccess={() => {
          console.log("Event type updated successfully");
        }}
      />
    </CalProvider>
  );
}
```

For a complete implementation example, check out the [example app](https://github.com/calcom/cal.com/tree/main/packages/platform/examples/base).

Was this page helpful?

Yes No

[[docs-atoms-event-type|Event Type]][[docs-atoms-availability-settings|Availability settings]]
