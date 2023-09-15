import { Router } from "../../deps.ts";
import {
    deleteProduct,
    getProduct,
    getProducts,
    postProduct,
    putProduct
} from "../controllers/productsController.ts";

const router = new Router();

router
    .get("/products", getProducts)
    .get("/products/:id", getProduct)
    .post("/products", postProduct)
    .put("/products/:id", putProduct)
    .delete("/products/:id", deleteProduct);
  
  export default router;