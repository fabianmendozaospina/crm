import { useState } from "preact/hooks";

export default function EditProduct(props: { data: any }) {
  const [product, setProduct] = useState(props.data);

  const handleUpdateState = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:3001/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });

    if (resp.status != 200) {
      alert("Error al Guardar!");
      return;
    }

    alert("Guardado con éxito!");
  };

  const validateProduct = () => {
    const { name, lastName, email, company, phone } = product;

    const valid = !(name.length > 0) || !(lastName.length > 0) ||
      !(email.length > 0) || !(company.length > 0) || !(phone.length > 0);

    return valid;
  };

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Customer name"
            name="name"
            value={product.name}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Last name:</label>
          <input
            type="text"
            placeholder="Customer last name"
            name="lastName"
            value={product.lastName}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Customer company"
            name="company"
            value={product.company}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Customer email"
            name="email"
            value={product.email}
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Customer phone"
            name="phone"
            value={product.phone}
            onChange={handleUpdateState}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-a7.1zul"
            value="Save Changes"
            style={"cursor: pointer"}
            disabled={validateProduct()}
          />
        </div>
      </form>
    </>
  );
}
