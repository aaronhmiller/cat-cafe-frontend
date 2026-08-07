import type { Handlers } from "$fresh/server.ts";

const apiUrl = Deno.env.get("CAT_CAFE_API_URL") ?? "http://localhost:8080";

export const handler: Handlers = {
  async GET(req) {
    const date = new URL(req.url).searchParams.get("date") ?? "";
    const response = await fetch(
      `${apiUrl}/api/v1/availability?date=${encodeURIComponent(date)}`,
    );
    return new Response(response.body, {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  },
};
