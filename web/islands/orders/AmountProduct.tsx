export default function AmountProduct(props: { key: number; data: any }) {
  const { id, name, price, amount } = props.data;
  console.log("--props.data;", props.data);

  return (
    <li>
      <div class="texto-producto">
        <p class="name">{name}</p>
        <p class="price">${price}</p>
      </div>
      <div class="acciones">
        <div class="contenedor-cantidad">
          <i class="fas fa-minus"></i>
          <p>{amount}</p>
          <i class="fas fa-plus"></i>
        </div>
        <button type="button" class="btn btn-rojo">
          <i class="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}
