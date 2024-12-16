import apiReturn from "@utils/apiReturn.util";
import { groth16 } from "snarkjs";
import fs from "fs";

export const generateProof = async ({
  actualQuantity,
  maxAllowedQuantity,
}: {
  actualQuantity: number;
  maxAllowedQuantity: number;
}) => {
  try {
    const input = {
      actualQuantity,
      maxAllowedQuantity,
    };
    const proof = await groth16.fullProve(
      input,
      "./src/circuits/main.wasm",
      "./src/circuits/main_final.zkey"
    );
    return apiReturn.success(200, "Generate proof successfully", proof);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error generating proof");
  }
};

export const verifyProof = async ({
  proof,
  publicSignals,
}: {
  proof: any;
  publicSignals: any;
}) => {
  try {
    const verificationKey = JSON.parse(
      fs.readFileSync("./src/circuits/verification_key.json").toString()
    );
    console.log(verificationKey);
    const result = await groth16.verify(verificationKey, publicSignals, proof);
    return apiReturn.success(200, "Verify proof successfully", result);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error verifying proof");
  }
};
