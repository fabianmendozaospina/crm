import { Application, oakCors } from "./deps.ts";
import initRouters from "./src/routes/index.ts";
import "https://deno.land/std@0.193.0/dotenv/load.ts";

const URL = Deno.env.get("URL") || "http://localhost";
const PORT: number = Number(Deno.env.get("PORT")) || 3001;
const app = new Application();
const allowedOrigins = oakCors({ origin: "http://localhost:8000" });

app.use(allowedOrigins);
app.use(async (context, next) => {
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
