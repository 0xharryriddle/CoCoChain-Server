import {
  deliveryController,
  fertilizeController,
  harvestController,
  plantSeedController,
  sprayController,
  tokenURIController,
  waterController,
} from "@controllers/product.controller";
import { Router } from "express";
import { uploadSingleFileMiddleware } from "../middlewares/uploadFile.middleware";
const router = Router();

router.get("/tokenURI", tokenURIController);

router.post("/plantSeed", uploadSingleFileMiddleware, plantSeedController);

router.post("/fertilize", uploadSingleFileMiddleware, fertilizeController);

router.post("/spray", uploadSingleFileMiddleware, sprayController);

router.post("/water", uploadSingleFileMiddleware, waterController);

router.post("/deliver", uploadSingleFileMiddleware, deliveryController);

router.post("/harvest", uploadSingleFileMiddleware, harvestController);

export default router;
