import "dotenv/config";

const KEY_RPC_URL = process.env.KEY_RPC_URL;

const RPC_URL = {
  sepolia: `https://sepolia.infura.io/v3/${KEY_RPC_URL}`,
  baseSepolia: `https://base-sepolia.infura.io/v3/${KEY_RPC_URL}`,
};

export default RPC_URL;
