export default function AmountProduct(props: any) {
  const { id, name, price, amount } = props.data;

  return (
    <li>
      <div class="texto-producto">
        <p class="name">{name}</p>
        <p class="price">${price}</p>
      </div>
      <div class="acciones">
        <div class="contenedor-cantidad">
          <i
            class="fas fa-minus"
            onClick={() => props.subtractProducts(props.index)}
          >
          </i>
          <p>{amount}</p>
          <i
            class="fas fa-plus"
            onClick={() => props.increaseProducts(props.index)}
          >
          </i>
        </div>
        <button
          type="button"
          class="btn btn-rojo"
          onClick={() => props.removeProductOrder(id)}
        >
          <i class="fas fa-minus-circle">
            Eliminar Producto
          </i>
        </button>
      </div>
    </li>
  );
}
