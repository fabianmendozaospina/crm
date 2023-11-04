import { useEffect, useState } from "preact/hooks";

export default function Order(props: { key: number; data: any }) {
  const { id, customers, orderDetails } = props.data;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateTotal();
  }, []);

  const updateTotal = () => {
    if (orderDetails.length === 0) {
      setTotal(0);
      return;
    }

    let newTotal = 0;

    orderDetails.map((item) => newTotal += item.amount * item.products.price);
    setTotal(newTotal);
  };

  return (
    <li class="pedido">
      <div class="info-pedido">
        <p class="id">ID: {id}</p>
        <p class="nombre">Customer: {customers.name} {customers.lastName}</p>

        <div class="articulos-pedido">
          <p class="productos">Order Items:</p>
          <ul>
            {orderDetails.map((item: any) => (
              <li key={item.orderId + item.productId}>
                <p>{item.products.name}</p>
                <p>Precio: ${item.products.price}</p>
                <p>Cantidad: {item.amount}</p>
              </li>
            ))}
          </ul>
        </div>

        <p class="total">Total: ${total}</p>
      </div>
      <div class="acciones">
        <button type="button" class="btn btn-rojo btn-eliminar">
          <i class="fas fa-times"></i>
          Delete Order
        </button>
      </div>
    </li>
  );
}
