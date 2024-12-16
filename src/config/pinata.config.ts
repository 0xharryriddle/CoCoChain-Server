import { GATEWAY_URL, PINATA_JWT } from "@utils/constant.util";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: GATEWAY_URL,
});

export default pinata;
