import { GATEWAY_URL } from "./constant.util";

export const manufacturer = ({
  name,
  address,
  companyCode,
  walletAddress,
  images,
}: {
  name: string;
  address: string;
  companyCode: number;
  walletAddress: string;
  images: string[];
}) => {
  const json = {
    name,
    address,
    companyCode,
    walletAddress,
    images,
  };

  return JSON.stringify(json);
};

export const farmer = ({
  name,
  address,
  phoneNumber,
}: {
  name: string;
  address: string;
  phoneNumber: string;
}) => {
  const json = {
    name,
    address,
    phoneNumber,
  };

  return JSON.stringify(json);
};

export const cocoChainProduct = ({
  name,
  source,
  detail,
  images,
}: {
  name: string;
  source: string;
  detail: string;
  images: string[];
}) => {
  const json = {
    name,
    source,
    detail,
    images,
  };

  return JSON.stringify(json);
};

export const agriculturalProduct = ({
  name,
  images,
}: {
  name: string;
  images: string[];
}) => {
  const json = {
    name,
    images,
  };

  return JSON.stringify(json);
};

export function getPinataFileName(id: number) {
  const currentTime = new Date().getTime();
  return `${currentTime}-${id.toString()}`;
}

export function getPinataURL(cid: string) {
  return `https://${GATEWAY_URL}/ipfs/${cid}`;
}
