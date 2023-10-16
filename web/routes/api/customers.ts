import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET() {
    console.log("GET customers from API...");
    const res = await fetch("http://localhost:3001/customers");

    if (res.status === 404) {
      return new Response(null, { status: 404 });
    }

    const users = await res.json();
    return new Response(JSON.stringify(users));
  },
};
