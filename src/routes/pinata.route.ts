import { Router } from "express";
import { testConnectionController } from "@controllers/pinata.controller";
const router = Router();

router.get("/testConnection", testConnectionController);

// router.post("/uploadMetadata", uploadMetadataController);

export default router;
