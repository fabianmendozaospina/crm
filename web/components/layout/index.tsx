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
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css"
          integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm"
          crossorigin="anonymous"
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
