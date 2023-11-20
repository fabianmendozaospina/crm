import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const formData = await req.formData();
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const headers = new Headers();
      const resp = await fetch(`${Deno.env.get("API_URL")}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          Origin: Deno.env.get("WEB_URL") ?? "",
        },
      });

      if (resp.status != 200) {
        // TODO: handle with throw.
        console.log(">> Error al autenticar!");
        headers.set("location", "/");
        return new Response(null, {
          status: 303,
          headers,
        });
      }

      const data = await resp.json();
      const { token } = data;

      setCookie(headers, {
        name: "auth",
        value: token, // this should be a unique value for each session
        maxAge: 3600,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/customers/list");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } catch (error) {
      console.log(">> Error", error);
      return new Response(null, {
        status: 403,
      });
    }
  },
};
