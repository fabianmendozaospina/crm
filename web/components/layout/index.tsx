import { Head } from "$fresh/runtime.ts";
import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/spinner.css" />
        <link rel="stylesheet" href="/css/normalize.css" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Head>
      <Header />
      <div class="grid contenedor contenido-principal">
        <Navigation />
        <main class="caja-contenido col-9">
          <div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
