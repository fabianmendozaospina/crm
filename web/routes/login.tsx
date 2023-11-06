import Layout from "../components/layout/index.tsx";
import Login from "../islands/auth/Login.tsx";

export default function Home() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}
