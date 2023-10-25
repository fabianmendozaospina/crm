import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../../components/layout/index.tsx";
import EditProduct from "../../../islands/products/EditProduct.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const resp = await fetch(`http://localhost:3001/products/${id}`, {
      method: "GET",
    });

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const data = await resp.json();
    return await ctx.render(data);
  },
};

export default function Edit({ data }: PageProps) {
  const { product } = data;
  return (
    <Layout>
      <EditProduct
        data={product}
      />
    </Layout>
  );
}
