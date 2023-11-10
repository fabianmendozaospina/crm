import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Login from "../islands/auth/Login.tsx";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    console.log(">> index.getToken", cookies.auth);
    const isAllowed = cookies.auth ? true : false;

    if (isAllowed) {
      return new Response("", {
        status: 307,
        headers: {
          Location: "/customers/list",
        },
      });
    }

    return ctx.render!({ isAllowed });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      {!data.isAllowed ? <Login /> : <a href="/api/logout">Logout</a>}
    </>
  );
}
