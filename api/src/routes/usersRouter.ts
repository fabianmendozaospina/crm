import { Router } from "../../deps.ts";
import { loginUser, registerUser } from "../controllers/usersController.ts";

const router = new Router();

router
  .post("/users/register", registerUser)
  .post("/users/login", loginUser);

export default router;
