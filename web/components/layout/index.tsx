import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <div class="flex">
        <Navigation />
        <main class="w-5/6 bg-gray-200 relative h-screen">
          <div class="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-md">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
