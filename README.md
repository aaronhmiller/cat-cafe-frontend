# Cat Cafe Frontend

A Deno Fresh customer experience for browsing availability, choosing a
complimentary herbal tea, registering, and managing reservations.

```bash
cp .env.example .env
deno task start
```

The backend is expected at `CAT_CAFE_API_URL` (default `http://localhost:8080`).
Slack account-linking sends unregistered customers to `/register` with their
Slack identity in the query string; registration returns them to the reservation
flow.
