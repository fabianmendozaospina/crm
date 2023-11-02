import { useState } from "preact/hooks";
import Spinner from "../../components/layout/Spinner.tsx";

export default function EditCustomer(props: { data: any }) {
  const [customer, setCustomer] = useState(props.data);

  const handleUpdateState = (e: any) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(">>> customer.id", customer.id);
    const resp = await fetch(`http://localhost:3001/customers/${customer.id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
    });

    if (resp.status != 200) {
      alert("Error al Guardar!");
      return;
    }

    alert("Guardado con éxito!");
  };

  const validateCustomer = () => {
    const { name, lastName, email, company, phone } = customer;

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
            value={customer.name}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input
            type="text"
            placeholder="Customer last name"
            name="lastName"
            value={customer.lastName}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Customer company"
            name="company"
            value={customer.company}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Customer email"
            name="email"
            value={customer.email}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input
            type="tel"
            placeholder="Customer phone"
            name="phone"
            value={customer.phone}
            onChange={handleUpdateState}
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
