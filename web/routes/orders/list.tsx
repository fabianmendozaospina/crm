import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout/index.tsx";
import Order from "../../islands/orders/Order.tsx";
import Spinner from "../../components/layout/Spinner.tsx";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const token = getCookies(req.headers).auth;
    const isAllowed = token ? true : false;

    if (!isAllowed) {
      return new Response("", {
        status: 307,
        headers: {
          Location: "/login",
        },
      });
    }

    try {
      const resp = await fetch(`${Deno.env.get("API_URL")}/api/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: Deno.env.get("FRONTEND_URL") ?? "",
        },
      });

      if (resp.status === 404) {
        return ctx.render(null);
      }

      const data = await resp.json();
      return await ctx.render(data);
    } catch (error) {
      // Error with authorization.
      if (error.response.status == 500) {
        return new Response("", {
          status: 307,
          headers: {
            Location: "/login",
          },
        });
      }
    }
  },
};

export default function List({ data }: PageProps) {
  const { orders } = data;

  // Loading Spinner.
  if (!orders.length) return <Spinner />;

  return (
    <Layout
      showOptions={true}
    >
      <h2>Orders</h2>

      {orders &&
        (
          <ul class="listado-pedidos">
            {orders.map((order: any) => (
              <Order
                key={order.id}
                data={order}
              />
            ))}
          </ul>
        )}
    </Layout>
  );
}
