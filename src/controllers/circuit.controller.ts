import { generateProof, verifyProof } from "@services/circuit.service";
import { Request, Response } from "express";

export const generateProofController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { actualQuantity, maxAllowedQuantity } = req.body;
    const response = await generateProof({
      actualQuantity,
      maxAllowedQuantity,
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.error("Proof generation error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Proof generation failed",
    });
  }
};

export const verifyProofController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { proof, publicSignals } = req.body;
    const response = await verifyProof({
      proof,
      publicSignals,
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.error("Proof verification error:", error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Proof verification failed",
    });
  }
};
