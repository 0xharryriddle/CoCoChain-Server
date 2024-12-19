import axios from "axios";
import pinata from "../config/pinata.config";
import apiReturn from "@utils/apiReturn.util";
import {
  PIN_JSON_TO_IPFS_API_URL,
  PINATA_JWT,
  PIN_FILE_TO_IPFS_API_URL,
  PINATA_API_URL,
} from "@utils/constant.util";

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

export const uploadFileToPinata = async ({ file }: { file: any }) => {
  try {
    const blobFile = new Blob([file.buffer], { type: "image/png" });
    const imageName = file.originalname.split(".jpeg")[0];
    const form = new FormData();
    form.append("file", new File([blobFile], imageName));
    // form.append("pinataOptions", JSON.stringify({ groupId }));
    const response = await axios.post(PIN_FILE_TO_IPFS_API_URL, form, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return apiReturn.success(200, "Uploaded Successfully", {
      filename: file.originalname,
      cid: response.data.IpfsHash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error uploading JSON to Pinata");
  }
};

export const uploadMetadataToPinata = async ({
  // groupId,
  metadata,
  fileName,
}: {
  // groupId: string;
  metadata: any;
  fileName: string;
}) => {
  try {
    const data = {
      pinataContent: metadata,
      // pinataOptions: {
      //   groupId: groupId,
      // },
      pinataMetadata: {
        name: fileName,
      },
    };
    const response = await axios.post(PIN_JSON_TO_IPFS_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    console.log(response.data);
    return apiReturn.success(200, "Uploaded Successfully", {
      cid: response.data.IpfsHash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error uploading JSON to Pinata");
  }
};

export const fetchFile = async ({
  // groupId,
  cid,
}: {
  // groupId: string;
  cid: string;
}) => {
  try {
    const response = await axios.get(
      // `${PINATA_API_URL}/data/pinList?status=pinned${
      //   groupId ? `&groupId=${groupId}` : ""
      // }${cid ? `&cid=${cid}` : ""}`,
      `${PINATA_API_URL}/data/pinList?status=pinned${cid ? `&cid=${cid}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );
    return apiReturn.success(200, "Fetched Successfully", response.data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error fetching random image in folder");
  }
};
