import { Router } from "../../deps.ts";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  postProductSearch,
  putProduct,
} from "../controllers/productsController.ts";

const router = new Router();

router
  .prefix("/api")
  .get("/products", getProducts)
  .get("/products/:id", getProduct)
  .post("/products", postProduct)
  .post("/products/search/:query", postProductSearch)
  .put("/products/:id", putProduct)
  .delete("/products/:id", deleteProduct)
  .allowedMethods();

export default router;
