import { Signal } from "@preact/signals";
import Spinner from "../../components/Spinner.tsx";
import IProduct from "../../interfaces/IProduct.ts";

export default function EditProduct(props: { data: IProduct; apiUrl: string }) {
  const product = new Signal(props.data);
  const file = new Signal<File | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.value.name);
    formData.append("price", product.value.price.toString());

    if (file.value != null) {
      formData.append("image", file.value);
    }

    try {
      console.log(">> product.value.id", product.value.id);
      const resp = await fetch(
        `/api/products/${product.value.id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (resp.status != 200) {
        alert("Error al Guardar!");
        return;
      }

      alert("Guardado con éxito!");
    } catch (error) {
      alert("Hubo un error. Vuelva a intentarlo");
    }
  };

  const updateState = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    if (name in product.value) {
      (product.value as any)[name] = target.value;
    }
  };
  const updateFile = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.files) {
      file.value = target.files[0];
    }
  };

  const validateProduct = () => {
    // const { name, price } = product.value;

    // const valid = !(name.length > 0) || !(price.length > 0);

    // return valid;

    return false;
  };

  if (!product) return <Spinner />;

  return (
    <>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={updateState}
            value={product.value.name}
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
            onChange={updateState}
            value={product.value.price}
          />
        </div>

        <div class="campo">
          <label>Image:</label>
          {product.value.image
            ? (
              <img
                src={`${props.apiUrl}/${product.value.image}`}
                alt="image"
                width="300"
              />
            )
            : null}
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={updateFile}
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
