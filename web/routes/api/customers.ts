import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET() {
    console.log("GET customers from API...");
    const res = await fetch("http://localhost:3001/customers");

    if (res.status === 404) {
      return new Response(null, { status: 404 });
    }

    const customers = await res.json();
    return new Response(JSON.stringify(customers));
  },

  async POST(req) {
    console.log("POST customer to API...");
    const body = await req.json();
    const res = await fetch("http://localhost:3001/customers", {
      method: "POST",
      body,
    });

    if (res.status != 201) {
      return new Response(null, { status: res.status });
    }

    const customer = await res.json();
    return new Response(JSON.stringify(customer));
  },
};
