export default function Navigacion() {
  return (
    <aside class="sidebar col-3">
      <h2>
        Management
      </h2>
      <nav class="navegacion">
        <a
          href="/customers/list"
          class="clientes"
        >
          <span class="absolute left-0 top-2 text-3xl mr-4">
            <i class="fas fa-users"></i>
          </span>
          Customers
        </a>
        <a
          href="/products/list"
          class="productos"
        >
          <span class="absolute left-0 top-2 text-3xl mr-4">
            <i class="fas fa-cube"></i>
          </span>
          Products
        </a>
        <a
          href="/orders/list"
          class="pedidos"
        >
          <span class="absolute left-0 top-2 text-3xl mr-4">
            <i class="fas fa-clipboard-list"></i>
          </span>
          Orders
        </a>
      </nav>
    </aside>
  );
}
