import { useState } from "preact/hooks";
import SearchProduct from "./SearchProduct.tsx";
import AmountProduct from "./AmountProduct.tsx";

export default function NewOrder(props: { data: any }) {
  const emtyArray: any[] = [];
  const customer = props.data;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(emtyArray);

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
    const allProducts = [...products];

    if (allProducts[index].amount === 0) return;

    allProducts[index].amount--;

    setProducts(allProducts);
  };

  const increaseProducts = (index: number) => {
    const allProducts = [...products];

    allProducts[index].amount++;

    setProducts(allProducts);
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
    </>
  );
}
