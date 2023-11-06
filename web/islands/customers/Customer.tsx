export default function Customer(props: { key: number; data: any }) {
  const { id, name, lastName, company, email, phone } = props.data;

  const deleteCustomer = async (id: number) => {
    if (confirm("Are you sure?")) {
      const resp = await fetch(`http://localhost:3001/customers/${id}`, {
        method: "DELETE",
      });
      if (resp.status != 200) {
        const data = await resp.json();
        const { error } = data;

        if (error && error.code == "23503") {
          alert(
            "El cliente no se puede eliminar ya que tiene al menos un pedido",
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
    <li class="cliente">
      <div class="info-cliente">
        <p class="nombre">
          {name} {lastName}
        </p>
        <p class="empresa">{company}</p>
        <p>{email}</p>
        <p>Phone: {phone}</p>
      </div>
      <div class="acciones">
        <a href={`/customers/edit/${id}`} class="btn btn-azul">
          <i class="fas fa-pen"></i>
          Edit Customer
        </a>
        <a href={`/orders/new/${id}`} class="btn btn-amarillo">
          <i class="fas fa-plus"></i>
          New Order
        </a>
        <button
          type="button"
          class="btn btn-rojo btn-eliminar"
          onClick={() => deleteCustomer(id)}
        >
          <i class="fas fa-times"></i>
          Delete Customer
        </button>
      </div>
    </li>
  );
}
