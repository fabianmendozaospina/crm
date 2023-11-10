import { Router } from "../../deps.ts";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
} from "../controllers/customersController.ts";
import { checkAuthorization } from "../middleware/auth.ts";

const router = new Router();

router
  .get("/customers", checkAuthorization, getCustomers)
  .get("/customers/:id", getCustomer)
  .post("/customers", postCustomer)
  .put("/customers/:id", putCustomer)
  .delete("/customers/:id", deleteCustomer);

export default router;
