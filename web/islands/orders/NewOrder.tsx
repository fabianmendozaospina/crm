import { useState } from "preact/hooks";
import SearchProduct from "./SearchProduct.tsx";
import AmountProduct from "./AmountProduct.tsx";

export default function NewOrder(props: { data: any }) {
  const emtyArray: any[] = [];
  const customer = props.data;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(emtyArray);
  const [total, setTotal] = useState(0);

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
    updateTotal();
  };

  const increaseProducts = (index: number) => {
    const allProducts = [...products];

    allProducts[index].amount++;

    setProducts(allProducts);
    updateTotal();
  };

  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0);
      return;
    }

    let newTotal = 0;

    products.map((product) => newTotal += product.amount * product.price);
    setTotal(newTotal);
  };

  const removeProductOrder = (id: number) => {
    const allProducts = products.filter((product) => product.id !== id);
    setProducts(allProducts);
  };

  const handleOrdering = async (e: any) => {
    e.preventDefault();

    const order: any[] = [];

    products.map((product: any) => (
      order.push({
        customerId: customer.id,
        productId: product.id,
        amount: product.amount,
      })
    ));
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
            removeProductOrder={removeProductOrder}
            index={index}
          />
        ))}
      </ul>

      <p class="total">
        Total: <span>$ {total}</span>
      </p>

      {total > 0
        ? (
          <form onSubmit={handleOrdering}>
            <input
              type="submit"
              class="btn btn-verde btn-block"
              value="Ordering"
            />
          </form>
        )
        : null}
    </>
  );
}
