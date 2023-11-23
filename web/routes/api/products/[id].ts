import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const id = ctx.params.id;
    const resp = await fetch(`${Deno.env.get("API_URL")}/api/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: Deno.env.get("WEB_URL") ?? "",
      },
    });

    const data = await resp.json();

    headers.set("location", `/customers/${id}`);
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers,
    });
  },
  async DELETE(req, ctx) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const id = ctx.params.id;
    const resp = await fetch(`${Deno.env.get("API_URL")}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: Deno.env.get("WEB_URL") ?? "",
      },
    });

    headers.set("location", "/products/list");
    return new Response(null, {
      status: resp.status,
      headers,
    });
  },
  async PUT(req, ctx) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const id = ctx.params.id;
    const formData = await req.formData();

    const resp = await fetch(`${Deno.env.get("API_URL")}/api/products/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: Deno.env.get("WEB_URL") ?? "",
      },
    });

    headers.set("location", "/products/list");
    return new Response(null, {
      status: resp.status,
      headers,
    });
  },
};
