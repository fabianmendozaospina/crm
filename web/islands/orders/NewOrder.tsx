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
      const productResult = { productId: "", amount: 0 };
      productResult.productId = product.id;
      productResult.amount = 0;

      setProducts([...products, productResult]);
    } else {
      alert("No hay resultados");
    }
  };

  const readSearchData = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Order</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div className="ficha-cliente">
          <h3>Customer's Data</h3>
          <p>Name: {customer.name} {customer.lastName}</p>
          <p>Phone: {customer.phone}</p>
        </div>

        <SearchProduct
          searchProduct={searchProduct}
          readSearchData={readSearchData}
        />

        <ul class="resumen">
          {products.map((products, index) => {
            <AmountProduct />;
          })}
        </ul>
      </form>
    </>
  );
}
