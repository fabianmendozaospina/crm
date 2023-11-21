import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/Layout.tsx";
import Product from "../../islands/products/Product.tsx";
import Spinner from "../../components/Spinner.tsx";
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
      const resp = await fetch(`${Deno.env.get("API_URL")}/api/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: Deno.env.get("WEB_URL") ?? "",
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
  const { products } = data;

  // Loading Spinner.
  if (!products.length) return <Spinner />;

  return (
    <Layout
      showOptions={true}
    >
      <h2>Products</h2>
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
                apiUrl={Deno.env.get("API_URL") ?? ""}
              />
            ))}
          </ul>
        )}
    </Layout>
  );
}
