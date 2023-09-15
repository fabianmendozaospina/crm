import { Router } from "../../deps.ts";
import {
  deleteOrder,
  getOrder,
  getOrders,
  postOrder,
  putOrder,
} from "../controllers/ordersController.ts";

const router = new Router();

router
  .get("/orders", getOrders)
  .get("/orders/:id", getOrder)
  .post("/orders", postOrder)
  .put("/orders/:id", putOrder)
  .delete("/orders/:id", deleteOrder);

export default router;
