import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";

const app: Express = express();
const port = process.env.PORT || 3000;

import initialRoutes from "@routes/index.route";
import { sequelize } from "./config/database.config";

const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const ENDPOINT =
  env === "development"
    ? `${process.env.LOCAL_ENDPOINT}:${PORT}`
    : process.env.PRODUCTION_ENDPOINT;

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Express API with Swagger",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: ENDPOINT,
//       },
//     ],
//   },
//   apis: ["./src/routes/*.route.js"],
// };
// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

initialRoutes(app);

const connectDatabase = async () => {
  await sequelize.authenticate();
};

connectDatabase()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
