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
import Account from "./account";
// Model<Partial<Address>>

@Table
export default class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @ForeignKey(() => Account)
  @Column(DataType.BIGINT)
  accountId!: number;

  @Column(DataType.STRING)
  address!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
