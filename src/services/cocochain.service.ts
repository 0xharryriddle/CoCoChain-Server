import Account from "@models/account";
import apiReturn from "@utils/apiReturn.util";
import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  ethers,
} from "ethers";
import * as contracts from "@utils/contracts.util";

export async function addAgriculturalProduct({
  accountId,
  metadata,
}: {
  accountId: number;
  metadata: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO: Check the wallet address

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.CoCoChainContract(null, signer);

    const txResponse: ContractTransactionResponse =
      await contract.addAgriculturalProduct(metadata);
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for addAgriculturalProduct() failed");
    }

    const logs = txReceipt.logs;

    const productId = logs[0].data;

    return apiReturn.success(
      200,
      "Called addAgriculturalProduct() successfully",
      { productId, tx: txReceipt.hash }
    );
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call addAgriculturalProduct() in CoCoChain contract"
    );
  }
}

export async function stopAgriculturalProduct({
  accountId,
  productId,
}: {
  accountId: number;
  productId: number;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.CoCoChainContract(null, signer);

    const txResponse: ContractTransactionResponse =
      await contract.stopAgriculturalProduct(BigInt(productId));
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for stopAgriculturalProduct() failed");
    }

    return apiReturn.success(
      200,
      "Called stopAgriculturalProduct() successfully",
      {
        tx: txReceipt.hash,
      }
    );
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call stopAgriculturalProduct() in CoCoChain contract"
    );
  }
}

export async function requestFarmer({
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

    const contract = contracts.CoCoChainContract(null, signer);

    const txResponse: ContractTransactionResponse =
      await contract.requestFarmer(BigInt(productId), metadata);
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for requestFarmer() failed");
    }

    return apiReturn.success(200, "Called requestFarmer() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call requestFarmer() in CoCoChain contract"
    );
  }
}

export async function addFarmer({
  accountId,
  productId,
  farmerAddress,
}: {
  accountId: number;
  productId: number;
  farmerAddress: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.CoCoChainContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.addFarmer(
      BigInt(productId),
      farmerAddress
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for addFarmer() failed");
    }

    return apiReturn.success(200, "Called addFarmer() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call addFarmer() in CoCoChain contract"
    );
  }
}

export async function banFarmer({
  accountId,
  productId,
  farmerAddress,
}: {
  accountId: number;
  productId: number;
  farmerAddress: string;
}) {
  try {
    const account = await Account.findByPk(accountId);

    if (account == null) {
      throw Error("Account is not existed yet");
    }

    const { privateKey, walletAddress } = account;

    // TODO

    const signer = contracts.getSigner(privateKey);

    const contract = contracts.CoCoChainContract(null, signer);

    const txResponse: ContractTransactionResponse = await contract.banFarmer(
      BigInt(productId),
      farmerAddress
    );
    const txReceipt = await txResponse.wait();

    if (txReceipt == null || txReceipt?.status != 1) {
      throw Error("Transaction for banFarmer() failed");
    }

    return apiReturn.success(200, "Called banFarmer() successfully", {
      tx: txReceipt.hash,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call banFarmer() in CoCoChain contract"
    );
  }
}

export async function farmerIsApproved({
  productId,
  farmerAddress,
}: {
  productId: number;
  farmerAddress: string;
}) {
  try {
    const contract = contracts.CoCoChainContract(contracts.provider, null);

    const isApproved = await contract.farmerIsApproved(
      BigInt(productId),
      farmerAddress
    );

    return apiReturn.success(200, "Called farmerIsApproved() successfully", {
      isApproved,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(
      400,
      "Failed to call farmerIsApproved() in CoCoChain contract"
    );
  }
}

// export async function verifyProof({

// })
