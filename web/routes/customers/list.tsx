import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Layout from "../../components/Layout.tsx";
import Customer from "../../islands/customers/Customer.tsx";
import Spinner from "../../components/Spinner.tsx";

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
      const resp = await fetch(`${Deno.env.get("API_URL")}/api/customers`, {
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
      return await ctx.render({ customers: data.customers, token });
    } catch (error) {
      // Error with authorization.
      console.log(">> Error", error);
      //if (error.response.status == 500) {
      return new Response("", {
        status: 307,
        headers: {
          Location: "/login",
        },
      });
      //}
    }
  },
};

export default function List({ data }: PageProps) {
  const { customers, token } = data;

  // Loading Spinner.
  if (!customers.length) return <Spinner />;

  return (
    <Layout
      showOptions={true}
    >
      <h2>Customers</h2>

      <a
        href="/customers/new"
        class="btn btn-verde nvo-cliente"
      >
        <i class="fas fa-plus"></i>
        New Customer
      </a>

      {customers &&
        (
          <ul class="listado-clientes">
            {customers.map((customer: any) => (
              <Customer
                key={customer.id}
                data={customer}
              />
            ))}
          </ul>
        )}
    </Layout>
  );
}
