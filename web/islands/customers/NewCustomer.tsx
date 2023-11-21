import { Signal } from "@preact/signals";
import Spinner from "../../components/Spinner.tsx";

export default function NewCustomer() {
  const customer = new Signal({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const resp = await fetch("/api/customers/new", {
      method: "POST",
      body: JSON.stringify(customer.value),
    });

    if (resp.status != 201) {
      alert("Error al Guardar --2");
      return;
    }

    alert("Guardado con éxito!");
  };

  const updateState = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    if (name in customer.value) {
      (customer.value as any)[name] = target.value;
    }
  };

  const validateCustomer = () => {
    const { name, lastName, email, company, phone } = customer.value;

    const valid = !(name.length > 0) || !(lastName.length > 0) ||
      !(email.length > 0) || !(company.length > 0) || !(phone.length > 0);

    return valid;
  };

  if (!customer) return <Spinner />;

  return (
    <>
      <h2>New Customer</h2>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Customer name"
            name="name"
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input
            type="text"
            placeholder="Customer last name"
            name="lastName"
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Customer company"
            name="company"
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Customer email"
            name="email"
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Customer phone"
            name="phone"
            onChange={updateState}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Add Customer"
            style={"cursor: pointer"}
            // disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
}
