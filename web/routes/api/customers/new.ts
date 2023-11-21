import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req, _) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const body = await req.json();

    const resp = await fetch(
      `${Deno.env.get("API_URL")}/api/customers`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: Deno.env.get("WEB_URL") ?? "",
        },
      },
    );

    headers.set("location", "/customers/new");
    return new Response(null, {
      status: resp.status,
      headers,
    });
  },
};
