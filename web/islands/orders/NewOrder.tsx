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
  console.log("--products", products);

  return (
    <>
      <h1>New Order</h1>

      <div class="ficha-cliente">
        <h3>Customer's Data</h3>
        <p>Name: {customer.name} {customer.lastName}</p>
        <p>Phone: {customer.phone}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <SearchProduct
          searchProduct={searchProduct}
          readSearchData={readSearchData}
        />

        <ul class="resumen">
          {products.map((product) => {
            <AmountProduct
              key={product.id}
              data={product}
            />;
          })}
        </ul>
      </form>
    </>
  );
}
