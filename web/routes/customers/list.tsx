import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout/index.tsx";
import Customer from "../../islands/customers/Customer.tsx";
import Spinner from "../../components/layout/Spinner.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const resp = await fetch("http://localhost:3001/customers", {
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
  const { customers } = data;

  // Loading Spinner.
  if (!customers.length) return <Spinner />;

  return (
    <Layout>
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
