import axios from "axios";
import pinata from "../config/pinata.config";
import apiReturn from "@utils/apiReturn.util";
import { PIN_JSON_TO_IPFS_API_URL, PINATA_JWT } from "@utils/constant.util";

export const testConnection = async ({}: {}): Promise<{
  code: number;
  error: boolean;
  message: string;
  errors?: any;
  data?: any;
}> => {
  try {
    const auth = await pinata.testAuthentication();
    return apiReturn.success(200, "Connection Test Successfully", auth.message);
  } catch (error) {
    console.error(error);
    return apiReturn.error(400, "Error testing connection to Pinata");
  }
};

export const uploadFileToPinata = async ({
  fileName,
  metadata,
  groupId,
}: {
  fileName: string;
  metadata: string;
  groupId: string;
}) => {
  try {
    const data = {
      pinataContent: metadata,
      pinataOptions: {
        groupId: groupId,
      },
      pinataMetadata: {
        name: fileName,
      },
    };
    const res = await axios.post(PIN_JSON_TO_IPFS_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });
    console.log(res.data);
    return apiReturn.success(200, "Uploaded Successfully", res.data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error uploading JSON to Pinata");
  }
};
