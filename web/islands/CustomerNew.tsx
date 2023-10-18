import { useState } from "preact/hooks";

export default function CustomerNew() {
  const [customer, setCustomer] = useState({
    name: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleUpdateState = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const validateCustomer = () => {
    const { name, lastname, email, company, phone } = customer;

    const valid: boolean = !name.length || !lastname.length ||
      !email.length || !company.length || !phone.length;
    return valid;
  };

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Customer</h1>

      <form>
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
            name="lastname"
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
            disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
}
