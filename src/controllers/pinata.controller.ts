import { Request, Response } from "express";
import { testConnection } from "@services/pinata.service";

export const testConnectionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await testConnection({});
    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
