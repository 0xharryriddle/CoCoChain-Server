// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";
import PinataRouter from "@routes/pinata.route";
import CircuitRouter from "@routes/circuit.route";
import AuthenticateRouter from "@routes/authenticate.route";
import CoCoChainRouter from "@routes/cocochain.route";
import FertilizeRoute from "@routes/fertilize.route";
import ProductRoute from "@routes/product.route";

const initialRoutes = (app: Express) => {
  app.use("/api/pinata", PinataRouter);
  app.use("/api/circuit", CircuitRouter);
  app.use("/api/authenticate", AuthenticateRouter);
  app.use("/api/cocochain", CoCoChainRouter);
  app.use("/api/fertilizer", FertilizeRoute);
  app.use("/api/product", ProductRoute);

  return app.use((req: Request, res: Response) => {
    res.status(404).send("404 not found");
  });
};

export default initialRoutes;
