import { sequelize } from "@config/database.config";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import Role from "./role";
// Model<Partial<Account>>
@Table
export default class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  phoneNumber!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  walletAddress!: string;

  @Column(DataType.STRING)
  privateKey!: string;

  @ForeignKey(() => Role)
  @Column(DataType.ENUM("Admin", "Manufacturer", "Farmer"))
  roleId!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
