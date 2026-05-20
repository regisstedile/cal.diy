---
title: "MCP server"
source: "https://cal.com/docs/mcp-server"
tags: [cal-com, docs]
---
The Cal.com MCP server wraps the [[docs-api-reference-v2-introduction|Cal.com API v2]] in the [Model Context Protocol](https://modelcontextprotocol.io/introduction), letting you manage bookings, event types, schedules, and more through natural language in any MCP-compatible client.

The fastest way to get started is to connect your MCP client directly to `mcp.cal.com`. The hosted server uses Streamable HTTP transport with OAuth 2.1 authentication — your client handles the authorization flow automatically.

### Connect your client

Point your MCP client to the hosted server URL:

```
https://mcp.cal.com/mcp
```

When you first connect, your client walks you through an OAuth authorization flow where you grant the server access to your Cal.com account. No API key is needed.

*   Claude Desktop

*   Cursor

*   VS Code

Add the following to your `claude_desktop_config.json`:

*   **macOS:**`~/Library/Application Support/Claude/claude_desktop_config.json`
*   **Windows:**`%APPDATA%\Claude\claude_desktop_config.json`

```
{
  "mcpServers": {
    "calcom": {
      "url": "https://mcp.cal.com/mcp"
    }
  }
}
```

Open **Settings → MCP** and add a new server with the URL `https://mcp.cal.com/mcp`, or add it to your `.cursor/mcp.json`:

```
{
  "mcpServers": {
    "calcom": {
      "url": "https://mcp.cal.com/mcp"
    }
  }
}
```

Add the server to your VS Code MCP settings:

```
{
  "mcpServers": {
    "calcom": {
      "url": "https://mcp.cal.com/mcp"
    }
  }
}
```

## Self-hosted server (stdio)

If you prefer to run the server locally, you can use stdio transport with an API key. This is useful for development or when you want full control over the server.

### Prerequisites

*   Node.js >= 18
*   A Cal.com API key — generate one in [Settings → Developer → API Keys](https://app.cal.com/settings/developer/api-keys)

### Connect your client

Add the following to your MCP client’s configuration:

```
{
  "mcpServers": {
    "calcom": {
      "command": "npx",
      "args": ["@calcom/cal-mcp@latest"],
      "env": {
        "CAL_API_KEY": "cal_live_xxxx"
      }
    }
  }
}
```

Replace `cal_live_xxxx` with your actual API key.

## Available tools

The MCP server exposes 34 tools organized by category:

### User profile

| Tool | Description |
| --- | --- |
| `get_me` | Get your authenticated user profile |
| `update_me` | Update your user profile |

### Event types

| Tool | Description |
| --- | --- |
| `get_event_types` | List all event types |
| `get_event_type` | Get a specific event type by ID |
| `create_event_type` | Create a new event type |
| `update_event_type` | Update an event type |
| `delete_event_type` | Delete an event type |

### Bookings

| Tool | Description |
| --- | --- |
| `get_bookings` | List bookings with optional filters |
| `get_booking` | Get a specific booking by UID |
| `create_booking` | Create a new booking |
| `reschedule_booking` | Reschedule a booking |
| `cancel_booking` | Cancel a booking |
| `confirm_booking` | Confirm a pending booking |
| `mark_booking_absent` | Mark a booking absence |
| `get_booking_attendees` | Get all attendees for a booking |
| `add_booking_attendee` | Add an attendee to a booking |
| `get_booking_attendee` | Get a specific attendee |

### Schedules

| Tool | Description |
| --- | --- |
| `get_schedules` | List all schedules |
| `get_schedule` | Get a specific schedule by ID |
| `create_schedule` | Create a new schedule |
| `update_schedule` | Update a schedule |
| `delete_schedule` | Delete a schedule |
| `get_default_schedule` | Get your default schedule |

### Availability

| Tool | Description |
| --- | --- |
| `get_availability` | Get available time slots |
| `get_busy_times` | Get busy times from calendars |

### Conferencing

| Tool | Description |
| --- | --- |
| `get_conferencing_apps` | List conferencing applications |

### Routing forms

| Tool | Description |
| --- | --- |
| `calculate_routing_form_slots` | Calculate slots based on routing form response |

### Organizations

| Tool | Description |
| --- | --- |
| `get_org_memberships` | Get all organization memberships |
| `create_org_membership` | Create an organization membership |
| `get_org_membership` | Get an organization membership |
| `delete_org_membership` | Delete an organization membership |
| `get_org_routing_forms` | Get organization routing forms |
| `get_org_routing_form_responses` | Get routing form responses |

## Example prompts

Once connected, you can interact with Cal.com using natural language:

*   “What bookings do I have this week?”
*   “Create a 30-minute event type called ‘Quick Chat’”
*   “Cancel my meeting with John tomorrow”
*   “Show me my available slots for next Monday”
*   “Reschedule my 2pm meeting to Thursday at 3pm”
*   “What event types do I have?”

*   [[docs-agents|AI agents guide]] — build AI agents using the Cal.com API directly
*   [[docs-api-reference-v2-introduction|API v2 reference]] — full API endpoint documentation
*   [GitHub repository](https://github.com/calcom/companion/tree/main/apps/mcp-server) — source code
