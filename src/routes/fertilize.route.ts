import {
  addFertilizerController,
  getFertilizerController,
  modifyFertilizerController,
} from "@controllers/fertilizer.controller";
import { Router } from "express";
const router = Router();

router.get("/get", getFertilizerController);

router.post("/add", addFertilizerController);

router.post("/modify", modifyFertilizerController);

export default router;
