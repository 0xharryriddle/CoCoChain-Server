import { getMessage } from "@controllers/ping.controller";
import { Router } from "express";
const router = Router();

router.get("/", getMessage);

export default router;
