# Cat Cafe Frontend

A Deno Fresh customer experience for browsing availability, choosing a
complimentary herbal tea, registering, and managing reservations.

```bash
cp .env.example .env
PORT=8443 deno task --env-file=.env start
```
Deno requires --env-file to load dotenv files into task commands.

The backend is expected at `CAT_CAFE_API_URL` (default `http://localhost:8444`).
Set `GOOGLE_CLIENT_ID` to the same Google web client ID configured by the
backend. To smoke-test the port contract, start the backend with
`uv run uvicorn app.main:app --port 8444`, then run

```bash
FUTURE_DATE=$(deno eval 'const date = new Date(); date.setUTCDate(date.getUTCDate() + 1); console.log(date.toISOString().slice(0, 10))')
curl --fail "http://localhost:8444/api/v1/availability?date=${FUTURE_DATE}"
```

Verify it returns availability JSON.

## Manually test Google sessions

1. Start both apps with the same `GOOGLE_CLIENT_ID`, open
   `http://localhost:8443`, and sign in with Google.
2. Confirm your email replaces the **Sign in** link in the header, then refresh
   the page and confirm the session remains displayed.
3. Select an available future date and time, complete the form, and choose
   **Book visit**. Confirm the success message appears.
4. Open **My reservations**, confirm the new reservation is listed, choose
   **Cancel**, and confirm it is removed.

Slack account-linking sends unregistered customers to `/register` with their
Slack identity in the query string; registration returns them to the reservation
flow.
