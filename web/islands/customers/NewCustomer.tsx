import { useState } from "preact/hooks";

export default function NewCustomer() {
  const [dataValid, setDataValid] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleUpdateState = (e: any) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    });

    if (res.status != 201) {
      //return ctx.render(null);
    }

    const data = await res.json();
  };

  const validateCustomer = () => {
    const { name, lastName, email, company, phone } = customer;

    const valid = !(name.length > 0) || !(lastName.length > 0) ||
      !(email.length > 0) || !(company.length > 0) || !(phone.length > 0);

    console.log(">>> validateCustomer:", valid);
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
            type="email"
            placeholder="Customer phone"
            name="phone"
            onChange={handleUpdateState}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Add Customer"
            // disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
}
