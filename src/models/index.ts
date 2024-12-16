import { sequelize } from "@config/database.config";
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";

const db: { [key: string]: any } = {};
const modelsPath = __dirname;

// Dynamically load all models in the 'models' directory
fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".ts") // Adjust to `.js` or `.ts` based on your project
  .forEach((file) => {
    const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Set up associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize; // Access static properties like Sequelize.Op
db.sequelize = sequelize; // Access Sequelize instance for query or transaction

export default db;
