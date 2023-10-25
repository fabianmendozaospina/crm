import { useState } from "preact/hooks";
import Spinner from "../../components/layout/Spinner.tsx";

export default function EditProduct(props: { data: any }) {
  const [product, setProduct] = useState(props.data);
  const [file, setFile] = useState("");

  const handleUpdateState = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("ojooo");
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);

    if (file != "") {
      formData.append("image", file);
    }

    try {
      const resp = await fetch(`http://localhost:3001/products/${product.id}`, {
        method: "PUT",
        body: formData,
      });

      if (resp.status != 200) {
        alert("Error al Guardar!");
        return;
      }

      alert("Guardado con éxito!");
    } catch (error) {
      alert("Hubo un error. Vuelva a intentarlo");
    }
  };

  const validateProduct = () => {
    // const { name, price } = product;

    // const valid = !(name.length > 0) || !(price.length > 0);

    // return valid;

    return false;
  };

  if (!product) return <Spinner />;

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={handleUpdateState}
            value={product.name}
          />
        </div>

        <div class="campo">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="Price"
            onChange={handleUpdateState}
            value={product.price}
          />
        </div>

        <div class="campo">
          <label>Image:</label>
          {product.image
            ? (
              <img
                src={`http://localhost:3001/${product.image}`}
                alt="image"
                width="300"
              />
            )
            : null}
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleUpdateFile}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Save Product"
            style={"cursor: pointer"}
            disabled={validateProduct()}
          />
        </div>
      </form>
    </>
  );
}
