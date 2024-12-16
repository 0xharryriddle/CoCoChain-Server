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
// Model<Partial<Fertilizer>>
@Table
export default class Fertilizer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  fertilizerName!: string;

  @Column(DataType.NUMBER)
  maxAllowedValue!: number;

  @Column(DataType.BOOLEAN)
  active!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
