export default function Navigacion() {
  return (
    <aside class="flex-none w-1/6 pt-7.2 bg-gray-200">
      <nav class="w-full px-4 py-3 text-white mb-10">
        <h2 class="block font-sans text-gray-700 mb-8 text-1.8xl relative pl-5 pt-2 font-bold">
          Management
        </h2>

        <a
          href="/customers/list"
          class="block font-sans text-gray-700 mb-8 text-1.8xl relative pl-5 pt-2"
        >
          <span class="absolute left-0 top-2 text-3xl mr-4">
            <i class="fas fa-users"></i>
          </span>
          Customers
        </a>
        <a
          href="/products"
          class="block font-sans text-gray-700 mb-8 text-1.8xl relative pl-5 pt-2"
        >
          <span class="absolute left-0 top-2 text-3xl mr-4">
            <i class="fas fa-cube"></i>
          </span>
          Products
        </a>
        <a
          href="/orders"
          class="block font-sans text-gray-700 mb-8 text-1.8xl relative pl-5 pt-2"
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
