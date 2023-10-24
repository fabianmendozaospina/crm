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
      <h1 class="font-bold text-gray-800 text-left pl-8">Orders</h1>

      <a
        href="/products/new"
        class="block w-full mb-4 pl-8 text-center text-white font-bold uppercase block font-sans border-none flex-0 flex-shrink-0 w-full hover:cursor-pointer md:inline-block md:flex-auto md:w-auto bg-green-400 md:p-4 xl:p-8 rounded"
      >
        <i class="fas fa-plus-circle"></i>
        New Order
      </a>

      {orders &&
        (
          <ul class="list-none p-0">
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
