import type { Handlers, PageProps } from "$fresh/server.ts";
import { api } from "../../lib/api.ts";

interface Data {
  email: string;
  slackUserId: string;
  slackTeamId: string;
  error?: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const params = new URL(req.url).searchParams;
    return ctx.render({
      email: params.get("email") ?? "",
      slackUserId: params.get("slack_user_id") ?? "",
      slackTeamId: params.get("slack_team_id") ?? "",
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const data = {
      email: String(form.get("email") ?? ""),
      slackUserId: String(form.get("slack_user_id") ?? ""),
      slackTeamId: String(form.get("slack_team_id") ?? ""),
    };
    try {
      await api.register(data.email);
      if (data.slackUserId && data.slackTeamId) {
        await api.linkSlack({
          email: data.email,
          slack_user_id: data.slackUserId,
          slack_team_id: data.slackTeamId,
        });
      }
      return new Response(null, {
        status: 303,
        headers: { location: "/?linked=1" },
      });
    } catch {
      return ctx.render({
        ...data,
        error: "Registration failed. Please try again.",
      }, { status: 400 });
    }
  },
};

export default function Register({ data }: PageProps<Data>) {
  return (
    <section class="card narrow">
      <p class="eyebrow">Connect Slack</p>
      <h1>Create your Cat Cafe account</h1>
      <p>
        Use the email you want associated with your visits. We never ask for
        your Cat Cafe password in Slack.
      </p>
      <form method="post">
        <input type="hidden" name="slack_user_id" value={data.slackUserId} />
        <input type="hidden" name="slack_team_id" value={data.slackTeamId} />
        <label>
          Email<input type="email" name="email" value={data.email} required />
        </label>
        <button type="submit">Create account and continue</button>
        {data.error && <p class="error">{data.error}</p>}
      </form>
    </section>
  );
}
