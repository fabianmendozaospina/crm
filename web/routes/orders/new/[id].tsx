import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../../components/layout/index.tsx";
import NewOrder from "../../../islands/orders/NewOrder.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const resp = await fetch(`http://localhost:3001/customers/${id}`, {
      method: "GET",
    });

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const data = await resp.json();
    return await ctx.render(data);
  },
};

export default function New({ data }: PageProps) {
  const { customer } = data;
  return (
    <Layout>
      <NewOrder
        data={customer}
      />
    </Layout>
  );
}
