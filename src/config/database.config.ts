import Account from "@models/account";
import Address from "@models/address";
import Fertilizer from "@models/fertilizer";
import Role from "@models/role";
import User from "@models/user";
import {
  DATABASE_DATABASE,
  DATABASE_HOST,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} from "@utils/constant.util";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: DATABASE_DATABASE!,
  username: DATABASE_USER!,
  password: DATABASE_PASS!,
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  dialect: "postgres",
  models: [__dirname + "src/models/**/*.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});

sequelize.addModels([Role, Account, User, Address, Fertilizer]);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
