import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/index.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="main.css" />
      </Head>
      <Layout>
        <h1 class="text-2xl text-center">Welcome</h1>
      </Layout>
    </>
  );
}
