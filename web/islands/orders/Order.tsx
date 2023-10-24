export default function Order(props: { key: number; data: any }) {
  const { id, name, lastName, company, email, phone } = props.data;

  const deleteOrder = async (id: number) => {
    console.log("Eliminando...", id);

    if (confirm("Are you sure?")) {
      const resp = await fetch(`http://localhost:3001/Orders/${id}`, {
        method: "DELETE",
      });
      if (resp.status != 200) {
        const data = await resp.json();
        console.log(">> data", data);
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
    <li class="mt-4 p-8 pt-0 pb-0 pl-8 pr-0 border-b border-solid border-gray-300">
      <div class="flex-0 flex-shrink-0">
        <p class="text-green-500 font-bold text-md">
          {name} {lastName}
        </p>
        <p class="text-gray-600 font-bold text-md">{company}</p>
        <p>{email}</p>
        <p>Phone: {phone}</p>
      </div>
      <div class="acciones">
        <a href={`/Orders/edit/${id}`} class="btn btn-azul">
          <i class="fas fa-pen-alt"></i>
          Edit Order
        </a>
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
