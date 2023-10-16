import { useEffect, useState } from "preact/hooks";
import Layout from "../../components/layout/index.tsx";
import Customer from "../../islands/Customer.tsx";

export default function All() {
  const [customers, setCustomers] = useState([]);

  async function getCustomers() {
    const res = await fetch("/api/customers", {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok) {
      setCustomers(data);
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Layout>
      <h1 class="font-bold text-center">Customers</h1>

      {customers &&
        (
          <ul>
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
