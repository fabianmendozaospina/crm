import { Application } from "../../deps.ts";
import customersRouter from "./customersRouter.ts";
import productsRouter from "./productsRouter.ts";
import ordersRouter from "./ordersRouter.ts";
import usersRouter from "./usersRouter.ts";
// import { checkAuthorization } from "../middleware/auth.ts";

const initRouters = (app: Application) => {
  app
    .use(usersRouter.routes())
    // .use(checkAuthorization)
    .use(customersRouter.routes())
    .use(productsRouter.routes())
    .use(ordersRouter.routes());
};

export default initRouters;
