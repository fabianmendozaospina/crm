export default function Customer(props: { key: number; data: any }) {
  const { name, lastName, company, email, phone } = props.data;

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
        <a href="#" class="btn btn-azul">
          <i class="fas fa-pen-alt"></i>
          Editar Cliente
        </a>
        <button type="button" class="btn btn-rojo btn-eliminar">
          <i class="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}
