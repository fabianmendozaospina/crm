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

    orderDetails.map((item: any) =>
      newTotal += item.amount * item.products.price
    );
    setTotal(newTotal);
  };

  const deleteOrder = async (id: number) => {
    console.log("Eliminando...", id);

    if (confirm("Are you sure?")) {
      const resp = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "DELETE",
      });
      if (resp.status != 200) {
        const data = await resp.json();
        const { error } = data;

        if (error && error.code == "23503") {
          alert(
            "El pedido no se puede eliminar ya que tiene al menos un cliente",
          );
        } else {
          alert("Error al Eliminar");
        }
        return;
      }

      alert("Eliminado con éxito!");
    }
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
        <button
          type="button"
          class="btn btn-rojo btn-eliminar"
          onClick={() => deleteOrder(id)}
        >
          <i class="fas fa-times"></i>
          Delete Order
        </button>
      </div>
    </li>
  );
}
