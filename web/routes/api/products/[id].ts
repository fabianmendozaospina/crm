import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
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

    if (resp.status != 200) {
      console.log(">> Error al eliminar!");
    }

    headers.set("location", "/products/list");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
  async PUT(req, ctx) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const id = ctx.params.id;
    const formData = await req.formData();
    console.log(">> formData:", formData);
    //const body = await req.json();

    const resp = await fetch(`${Deno.env.get("API_URL")}/api/products/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: Deno.env.get("WEB_URL") ?? "",
      },
    });

    if (resp.status != 200) {
      console.log(">> Error al guardar!");
    }

    headers.set("location", "/products/list");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
