import { useState } from "preact/hooks";

export default function NewOrder() {
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

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Customer</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Customer name"
            name="name"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input
            type="text"
            placeholder="Customer last name"
            name="lastName"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Customer company"
            name="company"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Customer email"
            name="email"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Customer phone"
            name="phone"
            onChange={handleUpdateState}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-a7.1zul"
            value="Add Customer"
            style={"cursor: pointer"}
            disabled={validateOrder()}
          />
        </div>
      </form>
    </>
  );
}
