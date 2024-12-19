import "dotenv/config";

export const PINATA_JWT = process.env.PINATA_JWT;
export const GATEWAY_URL = process.env.GATEWAY_URL;
export const PIN_JSON_TO_IPFS_API_URL =
  "https://api.pinata.cloud/pinning/pinJSONToIPFS";
export const PIN_FILE_TO_IPFS_API_URL =
  "https://api.pinata.cloud/pinning/pinFileToIPFS";
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_DATABASE = process.env.DATABASE_DATABASE;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASS = process.env.DATABASE_PASS;
export const SALT = process.env.SALT;
export const PINATA_API_URL = process.env.PINATA_API_URL;
