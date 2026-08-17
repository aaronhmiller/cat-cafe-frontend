# Cat Cafe Frontend

A Deno Fresh customer experience for browsing availability, choosing a
complimentary herbal tea, registering, and managing reservations.

```bash
cp .env.example .env
PORT=8443 deno task start
```

The backend is expected at `CAT_CAFE_API_URL` (default `http://localhost:8444`).
Set `GOOGLE_CLIENT_ID` to the same Google web client ID configured by the
backend. To smoke-test the port contract, start the backend with
`uv run uvicorn app.main:app --port 8444`, then run
`curl --fail 'http://localhost:8444/api/v1/availability?date=2026-08-11'` and
verify it returns availability JSON.

Slack account-linking sends unregistered customers to `/register` with their
Slack identity in the query string; registration returns them to the reservation
flow.
