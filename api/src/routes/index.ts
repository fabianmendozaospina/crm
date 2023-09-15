import { Application } from "../../deps.ts";
import customersRouter from "./customersRouter.ts";
import productsRouter from "./productsRouter.ts";
import ordersRouter from "./ordersRouter.ts";

const initRouters = (app: Application) => {
  app
    .use(customersRouter.routes())
    .use(productsRouter.routes())
    .use(ordersRouter.routes());
};

export default initRouters;
