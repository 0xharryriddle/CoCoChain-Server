import {
  loginController,
  signupController,
} from "@controllers/authenticate.controller";
import { Router } from "express";
const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);

export default router;
