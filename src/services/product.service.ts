import Account from "@models/account";
import apiReturn from "@utils/apiReturn.util";
import * as contracts from "@utils/contracts.util";
import { ContractTransactionResponse } from "ethers";

// export const addProduct = async () => {};

export async function plantSeed({
  accountId,
  cocoChainId,
  tokenURI,
  metadata,
}: {
  accountId: number;
  cocoChainId: number;
  tokenURI: string;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.plantSeed(
      BigInt(cocoChainId),
      tokenURI,
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for plantSeed() failed");
    }

    return apiReturn.success(200, "Called plantSeed() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call plantSeed() in AgriculturalProduct contract"
    );
  }
}

export async function fertilize({
  accountId,
  cocoChainId,
  productId,
  metadata,
}: {
  accountId: number;
  cocoChainId: number;
  productId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.fertilize(
      BigInt(cocoChainId),
      BigInt(productId),
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for fertilize() failed");
    }

    return apiReturn.success(200, "Called fertilize() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call fertilize() in AgriculturalProduct contract"
    );
  }
}

export async function spray({
  accountId,
  cocoChainId,
  productId,
  metadata,
}: {
  accountId: number;
  cocoChainId: number;
  productId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.spray(
      BigInt(cocoChainId),
      BigInt(productId),
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for spray() failed");
    }

    return apiReturn.success(200, "Called spray() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call spray() in AgriculturalProduct contract"
    );
  }
}

export async function water({
  accountId,
  cocoChainId,
  productId,
  metadata,
}: {
  accountId: number;
  cocoChainId: number;
  productId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.water(
      BigInt(cocoChainId),
      BigInt(productId),
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for water() failed");
    }

    return apiReturn.success(200, "Called water() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call water() in AgriculturalProduct contract"
    );
  }
}

export async function harvest({
  accountId,
  cocoChainId,
  productId,
  metadata,
}: {
  accountId: number;
  cocoChainId: number;
  productId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.harvest(
      BigInt(cocoChainId),
      BigInt(productId),
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for harvest() failed");
    }

    return apiReturn.success(200, "Called harvest() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call harvest() in AgriculturalProduct contract"
    );
  }
}

export async function delivery({
  accountId,
  productId,
  metadata,
}: {
  accountId: number;
  productId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.AgriculturalProductContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.delivery(
      BigInt(productId),
      metadata
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for delivery() failed");
    }

    return apiReturn.success(200, "Called delivery() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call delivery() in AgriculturalProduct contract"
    );
  }
}

export async function tokenURI({ tokenId }: { tokenId: number }) {
  try {
    const contract = contracts.AgriculturalProductContract(
      contracts.provider,
      null
    );

    const tokenURIResult = await contract.tokenURI(BigInt(tokenId));

    return apiReturn.success(200, "Called tokenURI() successfully", {
      tokenURIResult,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call tokenURI() in AgriculturalProduct contract"
    );
  }
}
