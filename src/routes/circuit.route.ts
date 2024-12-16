import { Router } from "express";
import {
  generateProofController,
  verifyProofController,
} from "@controllers/circuit.controller";
const router = Router();

router.post("/generateProof", generateProofController);
router.post("/verifyProof", verifyProofController);

export default router;
