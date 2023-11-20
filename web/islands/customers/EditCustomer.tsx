import { Signal } from "@preact/signals";
import Spinner from "../../components/Spinner.tsx";
import ICustomer from "../../interfaces/ICustomer.ts";

export default function EditCustomer(props: { data: ICustomer }) {
  const customer = new Signal(props.data);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const resp = await fetch(`/api/customers/${customer.value.id}`, {
      method: "PUT",
      body: JSON.stringify(customer.value),
    });

    if (resp.status != 200) {
      alert("Error al Guardar!");
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
      <h2>Edit Customer</h2>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>
        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Customer name"
            name="name"
            value={customer.value.name}
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input
            type="text"
            placeholder="Customer last name"
            name="lastName"
            value={customer.value.lastName}
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Customer company"
            name="company"
            value={customer.value.company}
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Customer email"
            name="email"
            value={customer.value.email}
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input
            type="tel"
            placeholder="Customer phone"
            name="phone"
            value={customer.value.phone}
            onChange={updateState}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Save Changes"
            style={"cursor: pointer"}
            disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
}
