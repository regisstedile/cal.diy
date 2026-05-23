---
title: "Embed Events"
source: "https://cal.com/docs/developing/guides/embeds/embed-events"
tags: [cal-com, docs]
---
*   

## Internal Events

These events are used internally by the embed system for communication between the iframe and parent window. They are prefixed with `__` and are not intended for external use.

| Action | Description | Properties |
| --- | --- | --- |
| __iframeReady | Fired when the embedded iframe is ready to communicate with parent snippet. | `isPrerendering: boolean` // Whether the iframe is in prerender mode |
| __windowLoadComplete | Tells that window load for iframe is complete. | None |
| __dimensionChanged | Tells that dimensions of the content inside the iframe changed. | `iframeWidth: number` `iframeHeight: number` `isFirstTime: boolean` // Whether this is the first dimension change |
| __routeChanged | Fired when the route changes within the iframe. | None |
| __closeIframe | Fired when the iframe should be closed. | None |
| __connectInitiated | Fired when connection to a prerendered iframe is initiated. | None |
| __connectCompleted | Fired when connection to a prerendered iframe is completed. | None |
| __scrollByDistance | Instructs the parent to scroll by a specific distance. | `distance: number` // Distance in pixels to scroll by |

To get more details on how Embed actually works, you can refer to this [Embed Flowchart](https://www.figma.com/file/zZ5oaUpg12Fuu5mGZrPlP5/Embed-Flowchart).

Was this page helpful?
