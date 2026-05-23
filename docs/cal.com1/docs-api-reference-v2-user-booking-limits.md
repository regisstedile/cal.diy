---
title: "User booking limits"
source: "https://cal.com/docs/api-reference/v2/user-booking-limits"
tags: [cal-com, docs]
---
User booking limits let you restrict how many bookings a user can accept across **all** their event types — both personal and team — within a given time window. This is different from , which only apply to a single event type.

## How it works

When a user has booking limits configured, Cal.com checks the total number of accepted bookings for that user before allowing a new one. If the user has already reached their limit for the current period, the time slots are marked as unavailable and new bookings are rejected.Limits can be set for any combination of these intervals:

| Interval | Description |
| --- | --- |
| `perDay` | Maximum bookings per calendar day |
| `perWeek` | Maximum bookings per calendar week |
| `perMonth` | Maximum bookings per calendar month |
| `perYear` | Maximum bookings per calendar year |

You can set one or more intervals simultaneously. For example, you could allow up to 5 bookings per day but no more than 20 per week.

## Setting limits in the UI

You can configure user booking limits in **Settings > My Account > General**. Toggle the booking limits option, set your desired limits for each interval, and click **Update** to save.

## Setting limits via the API

The dedicated `/v2/me/booking-limits` endpoints let you read, update, and clear the authenticated user’s global limits without round-tripping the full `/v2/me` payload. These endpoints are only available to organization members and return `403` for non-org accounts. OAuth clients need the `PROFILE_READ` scope to read and `PROFILE_WRITE` scope to update or clear.

### Read current limits

Use [[docs-api-reference-v2-me-get-my-booking-limits|`GET /v2/me/booking-limits`]] to fetch the authenticated user’s limits. Unset bounds are returned as `null`.

```
curl https://api.cal.com/v2/me/booking-limits \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```
{
  "status": "success",
  "data": {
    "perDay": 5,
    "perWeek": 20,
    "perMonth": null,
    "perYear": null
  }
}
```

User booking limits are also included in the `GET /v2/me` response under the `bookingLimits` field.

### Update limits

Use [[docs-api-reference-v2-me-update-my-booking-limits|`PATCH /v2/me/booking-limits`]] to change one or more intervals. The endpoint has merge semantics: omit a field to leave it untouched, or set it to `null` to remove only that limit.

```
curl -X PATCH https://api.cal.com/v2/me/booking-limits \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "perDay": 5,
    "perWeek": 20
  }'
```

To clear a single interval without affecting the others, pass `null` for just that field:

```
curl -X PATCH https://api.cal.com/v2/me/booking-limits \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "perDay": null
  }'
```

### Clear all limits

Use [[docs-api-reference-v2-me-clear-my-booking-limits|`DELETE /v2/me/booking-limits`]] to remove every limit in a single call. The endpoint returns `204 No Content` on success.

```
curl -X DELETE https://api.cal.com/v2/me/booking-limits \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## User limits vs event-type limits

Cal.com supports two levels of booking limits:

| Level | Scope | Where to configure |
| --- | --- | --- |
| **User booking limits** | All bookings for a user across every event type | Settings > My Account > General |
| **Event-type booking limits** | Bookings for a single event type only | Event type settings > Limits tab |

Both levels are enforced independently. If a user has a daily limit of 5 and an event type has a daily limit of 3, the event type can only receive 3 bookings per day — but the user can still accept 2 more bookings on other event types before hitting their personal cap.

## Effect on availability

When a user reaches a booking limit for a given period, all time slots within that period are marked as busy. This means:

*   Slots no longer appear as available on booking pages.
*   Attempts to book during that period return an error.
*   The limit resets at the start of the next period (next day, week, month, or year) based on the user’s timezone.
