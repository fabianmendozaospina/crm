import { Application } from "./deps.ts";
import initRouters from "./src/routes/index.ts";

const URL = Deno.env.get("API_URL");
const PORT = Number(Deno.env.get("API_PORT"));
const whitelist = [Deno.env.get("FRONTEND_URL")];
const app = new Application();

app.use(async (context, next) => {
  // Add the appropriate CORS headers.
  context.response.headers.set("Access-Control-Allow-Origin", "*");
  context.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  context.response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type",
  );

  await next();
});

app.use(async (context, next) => {
  if (context.request.url.pathname.startsWith("/api")) {
    const origin = context.request.headers.get("Origin");

    if (!origin || !whitelist.includes(origin)) {
      context.response.status = 403;
      context.response.body = { error: "Origin not allowed" };
      return;
    }
  }

  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
    });
  } catch {
    await next();
  }
});

initRouters(app);

app.addEventListener("listen", () => {
  console.log(`Server listening at ${URL}:${PORT}`);
});

await app.listen({ port: PORT });
