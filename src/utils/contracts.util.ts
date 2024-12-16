import "dotenv/config";
import { ethers } from "ethers";

import CoCoChainABI from "@abis/CoCoChain.json";
import AgriculturalProductABI from "@abis/AgriculturalProduct.json";

import ADDRESSES from "./addresses.util";
import RPC_URL from "@utils/rpcUrl.util";

const provider = new ethers.JsonRpcProvider(RPC_URL.sepolia);

export const CoCoChainContract = new ethers.BaseContract(
  ADDRESSES.cocoChain,
  CoCoChainABI,
  provider
);

export const AgriculturalProductContract = new ethers.BaseContract(
  ADDRESSES.agriculturalProduct,
  AgriculturalProductABI,
  provider
);
