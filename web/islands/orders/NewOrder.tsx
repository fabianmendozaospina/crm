import { useEffect, useState } from "preact/hooks";
import SearchProduct from "./SearchProduct.tsx";
import AmountProduct from "./AmountProduct.tsx";

export default function NewOrder(props: { data: any }) {
  const emtyArray: any[] = [];
  const customer = props.data;
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(emtyArray);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateTotal();
  }, [details]);

  const searchProduct = async (e: any) => {
    e.preventDefault();

    const resp = await fetch(
      `/api/products/search/${search}`,
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
      const found = details.find((item) => item.productId === product.id);

      if (found) {
        alert("El producto ya está seleccionado");
        return;
      }

      const item = {
        productId: product.id,
        name: product.name,
        price: product.price,
        amount: 0,
      };

      setDetails([...details, item]);
    } else {
      alert("No hay resultados");
    }
  };

  const readSearchData = (e: any) => {
    setSearch(e.target.value);
  };

  const subtractProducts = (index: number) => {
    const allItems = [...details];

    if (allItems[index].amount === 0) return;

    allItems[index].amount--;

    setDetails(allItems);
  };

  const increaseProducts = (index: number) => {
    const allItems = [...details];

    allItems[index].amount++;

    setDetails(allItems);
  };

  const updateTotal = () => {
    if (details.length === 0) {
      setTotal(0);
      return;
    }

    let newTotal = 0;

    details.map((item) => newTotal += item.amount * item.price);
    setTotal(newTotal);
  };

  const removeProductOrder = (id: number) => {
    const allItems = details.filter((item) => item.productId !== id);
    setDetails(allItems);
  };

  const handleOrdering = async (e: any) => {
    e.preventDefault();

    const resp = await fetch(
      `http://localhost:3001/api/orders/${customer.id}`,
      {
        method: "POST",
        body: JSON.stringify(details),
      },
    );

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
        {details.map((item: any, index: number) => (
          <AmountProduct
            key={item.productId}
            data={item}
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
