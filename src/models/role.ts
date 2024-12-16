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
} from "sequelize-typescript";
// Model<Partial<Role>>

@Table
export default class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  roleName!: string;

  @Column(DataType.ENUM("Admin", "Manufacturer", "Farmer"))
  roleValue!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
