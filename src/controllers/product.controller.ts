import Fertilizer from "@models/fertilizer";
import { generateProof } from "@services/circuit.service";
import { getFertilizer } from "@services/fertilizer.service";
import {
  uploadFileToPinata,
  uploadMetadataToPinata,
} from "@services/pinata.service";
import {
  delivery,
  fertilize,
  harvest,
  plantSeed,
  spray,
  tokenURI,
  water,
} from "@services/product.service";
import { EventType } from "@utils/enum.util";
import { getPinataFileName, getPinataURL } from "@utils/metadata.util";
import { eventTemplate } from "@utils/template.util";
import { Request, Response } from "express";

export async function plantSeedController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, cocoChainId, seedName } = req.body;
    const file = req.file;

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.PLANT,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {
        seedName,
      },
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(cocoChainId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await plantSeed({
      accountId,
      cocoChainId,
      tokenURI: getPinataURL(cid),
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fertilizeController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, cocoChainId, productId, fertilizerId, value } = req.body;
    const file = req.file;

    // TODO: Get the fertilizer
    const fertilizerResponse = await getFertilizer({ id: fertilizerId });

    if (fertilizerResponse.error) {
      throw Error("Failed to fetch the fertilizer");
    }

    // TODO: Generate proof
    const proofResponse = await generateProof({
      actualQuantity: value,
      maxAllowedQuantity: (fertilizerResponse.data as Fertilizer)
        .maxAllowedValue,
    });

    if (proofResponse.error) {
      throw Error("Generate proof failed");
    }

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.FERTILIZE,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {
        proof: proofResponse.data,
      },
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(cocoChainId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await fertilize({
      accountId,
      cocoChainId,
      productId,
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function sprayController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, cocoChainId, productId, fertilizerId, value } = req.body;
    const file = req.file;

    // TODO: Get the fertilizer
    const fertilizerResponse = await getFertilizer({ id: fertilizerId });

    if (fertilizerResponse.error) {
      throw Error("Failed to fetch the fertilizer");
    }

    // TODO: Generate proof
    const proofResponse = await generateProof({
      actualQuantity: value,
      maxAllowedQuantity: (fertilizerResponse.data as Fertilizer)
        .maxAllowedValue,
    });

    if (proofResponse.error) {
      throw Error("Generate proof failed");
    }

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.SPRAY,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {
        proof: proofResponse.data,
      },
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(cocoChainId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await spray({
      accountId,
      cocoChainId,
      productId,
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function waterController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, cocoChainId, productId } = req.body;
    const file = req.file;

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.WATER,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {},
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(cocoChainId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await water({
      accountId,
      cocoChainId,
      productId,
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function harvestController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, cocoChainId, productId } = req.body;
    const file = req.file;

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.HARVEST,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {},
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(cocoChainId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await harvest({
      accountId,
      cocoChainId,
      productId,
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deliveryController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { accountId, productId } = req.body;
    const file = req.file;

    // TODO: Upload image
    const uploadImageResponse = await uploadFileToPinata({
      file: file,
    });

    if (uploadImageResponse.error) {
      throw Error("Upload image failed");
    }

    const metadata = eventTemplate({
      eventType: EventType.DELIVERY,
      image: getPinataURL((uploadImageResponse.data as any).cid),
      metadata: {},
    });

    // TODO: Upload metadata
    const uploadMetadataResponse = await uploadMetadataToPinata({
      fileName: getPinataFileName(productId),
      metadata,
    });

    if (uploadMetadataResponse.error) {
      throw Error("Upload metadata failed");
    }

    const cid = (uploadMetadataResponse.data as any).cid;

    const response = await delivery({
      accountId,
      productId,
      metadata: getPinataURL(cid),
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function tokenURIController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { tokenId } = req.params;

    const response = await tokenURI({ tokenId: Number(tokenId) });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
