import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout/index.tsx";
import Order from "../../islands/orders/Order.tsx";
import Spinner from "../../components/layout/Spinner.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const resp = await fetch("http://localhost:3001/orders", {
      method: "GET",
    });

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const data = await resp.json();
    return await ctx.render(data);
  },
};

export default function List({ data }: PageProps) {
  const { orders } = data;

  // Loading Spinner.
  if (!orders.length) return <Spinner />;

  return (
    <Layout>
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
