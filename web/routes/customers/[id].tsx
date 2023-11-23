import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Layout from "../../components/Layout.tsx";
import EditCustomer from "../../islands/customers/EditCustomer.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const token = getCookies(req.headers).auth;
    const id = ctx.params.id;
    const resp = await fetch(`${Deno.env.get("WEB_URL")}/api/customers/${id}`, {
      method: "GET",
      headers: {
        Cookie: `auth=${token}`,
      },
    });

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const data = await resp.json();

    return await ctx.render(data);
  },
};

export default function Edit({ data }: PageProps) {
  const { customer } = data;

  return (
    <Layout
      showOptions={true}
    >
      <EditCustomer
        data={customer}
      />
    </Layout>
  );
}
