import { Router } from "express";
import { uploadSingleFileMiddleware } from "../middlewares/uploadFile.middleware";
import {
  addAgriculturalProductController,
  addFarmerController,
  banFarmerController,
  farmerIsApprovedController,
  requestFarmerController,
  stopAgriculturalProductController,
} from "@controllers/cocochain.controller";
const router = Router();

router.get("/farmerIsApproved", farmerIsApprovedController);

router.post(
  "/addAgriculturalProduct",
  uploadSingleFileMiddleware,
  addAgriculturalProductController
);

router.post("/stopAgriculturalProduct", stopAgriculturalProductController);

router.post(
  "/requestFarmer",
  uploadSingleFileMiddleware,
  requestFarmerController
);

router.post("/banFarmer", banFarmerController);

router.post("/addFarmer", addFarmerController);

export default router;
