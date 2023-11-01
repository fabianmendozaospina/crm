import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout/index.tsx";
import Product from "../../islands/products/Product.tsx";
import Spinner from "../../components/layout/Spinner.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const resp = await fetch("http://localhost:3001/products", {
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
  const { products } = data;

  // Loading Spinner.
  if (!products.length) return <Spinner />;

  return (
    <Layout>
      <h1>Products</h1>
      <a
        href="/products/new"
        class="btn btn-verde nvo-cliente"
      >
        <i class="fas fa-plus"></i>
        New Product
      </a>

      {products &&
        (
          <ul class="listado-productos">
            {products.map((product: any) => (
              <Product
                key={product.id}
                data={product}
              />
            ))}
          </ul>
        )}
    </Layout>
  );
}
