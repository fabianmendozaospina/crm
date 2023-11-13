export default function Navigacion(props: { showOptions: boolean }) {
  if (!props.showOptions) {
    return null;
  }
  return (
    <aside class="sidebar col-3">
      <h2>
        Management
      </h2>
      <nav class="navegacion mt-10">
        <a href="/customers/list">
          <span class="absolute left-6 top-6 text-3xl mr-4 material-symbols-outlined">
            diversity_4
          </span>

          Customers
        </a>
        <a href="/products/list">
          <span class="absolute left-6 top-6 text-3xl mr-4 material-symbols-outlined">
            apparel
          </span>
          Products
        </a>
        <a href="/orders/list">
          <span class="absolute left-6 top-6 text-3xl mr-4 material-symbols-outlined">
            receipt_long
          </span>
          Orders
        </a>
      </nav>
    </aside>
  );
}
