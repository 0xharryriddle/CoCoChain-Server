import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import apiReturn from "../utils/apiReturn.util";

export const uploadArrayFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.array("files")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        const apiReturnMessage = apiReturn.error(
          400,
          "Multer error: " + err.message
        );
        return res.status(apiReturnMessage.code).send(apiReturnMessage);
      }
      next();
    });
  } catch (error) {
    console.error("Route error:", error);
    return res.status(500).send("Something went wrong");
  }
};

export const uploadSingleFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        const apiReturnMessage = apiReturn.error(
          400,
          "Multer error: " + err.message
        );
        return res.status(apiReturnMessage.code).send(apiReturnMessage);
      }
      next();
    });
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("Something went wrong");
  }
};
