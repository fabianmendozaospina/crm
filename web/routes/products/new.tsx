import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Layout from "../../components/Layout.tsx";
import NewProduct from "../../islands/products/NewProduct.tsx";

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

    return await ctx.render({ token });
  },
};

export default function New({ data }: PageProps) {
  const { token } = data;

  return (
    <Layout
      showOptions={true}
    >
      <NewProduct
        token={token}
      />
    </Layout>
  );
}
