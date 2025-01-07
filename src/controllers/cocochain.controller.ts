import { Request, Response } from "express";
import { farmerTemplate, productTemplate } from "../utils/template.util";
import {
  uploadFileToPinata,
  uploadMetadataToPinata,
} from "@services/pinata.service";
import { getPinataFileName, getPinataURL } from "@utils/metadata.util";
import {
  addAgriculturalProduct,
  addFarmer,
  banFarmer,
  farmerIsApproved,
  requestFarmer,
  stopAgriculturalProduct,
} from "@services/cocochain.service";

export async function addAgriculturalProductController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, name, description } = req.body;
    const file = req.file;

    // TODO: Upload image
    const uploadImage = await uploadFileToPinata({ file });

    if (uploadImage.error) {
      throw Error("Upload image failed");
    }

    const metadata = productTemplate({
      name,
      description,
      image: getPinataURL((uploadImage.data as any).cid),
    });

    // TODO: Upload the metadata
    const metadataResponse = await uploadMetadataToPinata({
      metadata,
      fileName: getPinataFileName(accountId),
    });

    if (metadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const response = await addAgriculturalProduct({
      accountId,
      metadata: getPinataURL((metadataResponse.data as any).cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function stopAgriculturalProductController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, productId } = req.body;

    const response = await stopAgriculturalProduct({
      accountId,
      productId,
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function requestFarmerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, productId, name, address, commitment } = req.body;
    const file = req.file;

    if (file == null) {
      throw Error("Not found any images");
    }

    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const ipfsURL = getPinataURL((uploadImageResponse.data as any).cid);

    const metadata = farmerTemplate({
      name,
      address,
      commitment,
      image: ipfsURL,
    });

    // TODO: Upload the metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      metadata,
      fileName: getPinataFileName(productId),
    });

    if (
      uploadMetadataResponse.error ||
      (uploadMetadataResponse.data as any).cid == null
    ) {
      throw Error("Upload metadata failed");
    }

    // TODO: Call the service
    const requestFarmerResponse = await requestFarmer({
      accountId,
      productId,
      metadata: getPinataURL((uploadMetadataResponse.data as any).cid),
    });

    if (requestFarmerResponse.error) {
      throw Error("Request Farmer failed");
    }

    res.status(requestFarmerResponse.code).json(requestFarmerResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addFarmerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, productId, farmerAddress } = req.body;

    const response = await addFarmer({
      accountId,
      productId,
      farmerAddress,
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function banFarmerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, productId, farmerAddress } = req.body;

    const response = await banFarmer({
      accountId,
      productId,
      farmerAddress,
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function farmerIsApprovedController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { productId, farmerAddress } = req.params;

    const response = await farmerIsApproved({
      productId: Number(productId),
      farmerAddress,
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
