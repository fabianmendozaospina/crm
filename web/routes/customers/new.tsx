import Layout from "../../components/layout/index.tsx";
import NewCustomer from "../../islands/customers/NewCustomer.tsx";

export default function New() {
  return (
    <Layout
      showOptions={true}
    >
      <NewCustomer />
    </Layout>
  );
}
