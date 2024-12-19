import {
  addFertilizer,
  modifyFertilizer,
  getFertilizer,
} from "@services/fertilizer.service";
import { Request, Response } from "express";

export async function addFertilizerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { fertilizerName, maxAllowedValue } = req.body;

    const response = await addFertilizer({ fertilizerName, maxAllowedValue });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function modifyFertilizerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id, fertilizerName, maxAllowedName, active } = req.body;

    const response = await modifyFertilizer({
      id,
      fertilizerName,
      maxAllowedName,
      active,
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getFertilizerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const response = await getFertilizer({ id: Number(id) });

    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
