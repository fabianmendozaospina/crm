import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout/index.tsx";
import Customer from "../../islands/Customer.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const res = await fetch("http://localhost:8000/api/customers", {
      method: "GET",
    });

    if (res.status === 404) {
      return ctx.render(null);
    }

    const data = await res.json();
    return await ctx.render(data);
  },
};

export default function All({ data }: PageProps) {
  const { customers } = data;
  return (
    <Layout>
      <h1 class="font-bold text-gray-800 text-left pl-8">Customers</h1>

      <a
        href="/customers/new"
        class="block w-full mb-4 pl-8 text-center text-white font-bold uppercase block font-sans border-none flex-0 flex-shrink-0 w-full hover:cursor-pointer md:inline-block md:flex-auto md:w-auto bg-green-400 md:p-4 xl:p-8 rounded"
      >
        <i class="fas fa-plus-circle"></i>
        New Customer
      </a>

      {customers &&
        (
          <ul class="list-none p-0">
            {customers.map((customer) => (
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
