import { useState } from "preact/hooks";
import SearchProduct from "./SearchProduct.tsx";
import AmountProduct from "./AmountProduct.tsx";

export default function NewOrder(props: { data: any }) {
  const emtyArray: any[] = [];
  const [customer, setCustomer] = useState(props.data);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(emtyArray);

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

  const searchProduct = async (e: any) => {
    e.preventDefault();

    const resp = await fetch(
      `http://localhost:3001/products/search/${search}`,
      {
        method: "POST",
      },
    );

    if (resp.status != 200) {
      alert("Error al Consultar!");
      return;
    }

    const data = await resp.json();
    const { product } = data;

    if (product) {
      const productResult = product;
      productResult.amount = 0;

      setProducts([...products, productResult]);
    } else {
      alert("No hay resultados");
    }
  };

  const readSearchData = (e: any) => {
    setSearch(e.target.value);
  };

  const subtractProducts = (index: number) => {
    console.log("uno menos", index);
  };

  const increaseProducts = (index: number) => {
    console.log("uno mas", index);
  };

  return (
    <>
      <h2>New Order</h2>

      <div class="ficha-cliente">
        <h3>
          <b>Customer's Data</b>
        </h3>
        <p class="mt-3">Name: {customer.name} {customer.lastName}</p>
        <p class="mt-3">Phone: {customer.phone}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <SearchProduct
          searchProduct={searchProduct}
          readSearchData={readSearchData}
        />

        <ul class="resumen">
          {products.map((product: any, index: number) => (
            <AmountProduct
              key={product.id}
              data={product}
              subtractProducts={subtractProducts}
              increaseProducts={increaseProducts}
              index={index}
            />
          ))}
        </ul>
      </form>
    </>
  );
}
