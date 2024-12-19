import "dotenv/config";
import { ethers } from "ethers";

import CoCoChainABI from "@abis/CoCoChain.json";
import AgriculturalProductABI from "@abis/AgriculturalProduct.json";

import ADDRESSES from "./addresses.util";
import RPC_URL from "@utils/rpcUrl.util";

export const provider = new ethers.JsonRpcProvider(RPC_URL.sepolia);

export const CoCoChainContract = (
  provider: ethers.JsonRpcProvider | null,
  signer: ethers.Wallet | null
) => {
  return new ethers.Contract(
    ADDRESSES.cocoChain,
    CoCoChainABI,
    provider ? provider : signer
  );
};

export const AgriculturalProductContract = (
  provider: ethers.JsonRpcProvider | null,
  signer: ethers.Wallet | null
) => {
  return new ethers.Contract(
    ADDRESSES.agriculturalProduct,
    AgriculturalProductABI,
    provider ? provider : signer
  );
};

export const getSigner = (privateKey: string) => {
  return new ethers.Wallet(privateKey, provider);
};
