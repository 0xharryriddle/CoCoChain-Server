import RPC_URL from "@utils/rpcUrl.util";
import { ethers } from "ethers";
import apiReturn from "@utils/apiReturn.util";
import bcrypt from "bcrypt";
import Role from "@models/role";
import Account from "@models/account";
import { sequelize } from "@config/database.config";
import User from "@models/user";

const provider = new ethers.JsonRpcProvider(RPC_URL.sepolia);
const salt = bcrypt.genSaltSync(10);

export async function loginService({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) {
  try {
    const accountIsExisted = await Account.findOne({
      where: {
        phoneNumber,
      },
    });

    if (accountIsExisted == null) {
      throw Error("Login failed");
    }

    const comparePassword = bcrypt.compareSync(
      password,
      accountIsExisted.password
    );

    if (!comparePassword) {
      throw Error("Login failed");
    }

    const user = await User.findOne({
      where: {
        accountId: accountIsExisted.id,
      },
    });

    if (user == null) {
      throw Error("Login failed");
    }

    return apiReturn.success(200, "Login successfully", {
      account: accountIsExisted,
      user,
    });
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Login failed");
  }
}

export async function signupService({
  phoneNumber,
  password,
  address,
  roleId,
  name,
}: {
  phoneNumber: string;
  password: string;
  address: string;
  roleId: number;
  name: string;
}) {
  const t = await sequelize.transaction();
  try {
    // TODO: Check the information
    const accountIsExisted = await Account.findOne({
      where: {
        phoneNumber,
      },
    });
    if (accountIsExisted != null) {
      return apiReturn.error(400, "Phone number is existed");
    }
    // TODO: Generate the wallet
    const { address: walletAddress, privateKey } =
      ethers.Wallet.createRandom(provider);
    // TODO: Hash the password
    password = await bcrypt.hash(password, salt);
    // TODO: Create the account
    const createdAccount = new Account({
      phoneNumber,
      password,
      walletAddress,
      privateKey,
      roleId,
    });
    await createdAccount.save({
      transaction: t,
    });
    const createdUser = new User({
      accountId: createdAccount.id,
      name,
      address,
    });
    await createdUser.save({
      transaction: t,
    });
    if (createdUser == null) {
      throw Error("Creating user failed");
    }
    await t.commit();
    return apiReturn.success(200, "Sign up successfully");
  } catch (error) {
    console.log(error);
    await t.rollback();
    return apiReturn.error(400, "Sign up failed");
  }
}

export async function deleteUserService({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  try {
  } catch (error) {}
}
