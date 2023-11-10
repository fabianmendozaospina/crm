import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    const credentials = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const resp = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (resp.status != 200) {
        alert("Error al autenticar!");
        return;
      }

      const data = await resp.json();
      const { token } = data;

      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: token, // this should be a unique value for each session
        maxAge: 3600,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error");
      return new Response(null, {
        status: 403,
      });
    }
  },
};
