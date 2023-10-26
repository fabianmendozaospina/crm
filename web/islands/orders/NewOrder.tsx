import { useState } from "preact/hooks";
import SearchProduct from "./SearchProduct.tsx";

export default function NewOrder(props: { data: any }) {
  const [customer, setCustomer] = useState(props.data);
  const [order, setOrder] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleUpdateState = (e: any) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3001/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });

    if (resp.status != 201) {
      alert("Error al Guardar!");
      return;
    }

    alert("Guardado con éxito!");
  };

  const validateOrder = () => {
    const { name, lastName, email, company, phone } = order;

    const valid = !(name.length > 0) || !(lastName.length > 0) ||
      !(email.length > 0) || !(company.length > 0) || !(phone.length > 0);

    return valid;
  };

  const searchProduct = () => {
  };

  const readSearchData = () => {
  };

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Order</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div className="ficha-cliente">
          <h3>Customer's Data</h3>
          <p>Name: {customer.name} {customer.lastName}</p>
          <p>Phone: {customer.phone}</p>
        </div>

        <SearchProduct
          searchProduct={searchProduct}
          readSearchData={readSearchData}
        />
      </form>
    </>
  );
}
