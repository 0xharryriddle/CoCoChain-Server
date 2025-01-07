import { Request, Response } from "express";

export async function getMessage(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    message: "pong",
  });
}
