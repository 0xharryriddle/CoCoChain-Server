import { loginService, signupService } from "@services/authenticate.service";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;
    const response = await loginService({
      phoneNumber,
      password,
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signupController = async (req: Request, res: Response) => {
  try {
    console.log("Sign up controller");
    const { phoneNumber, password, address, roleId, name } = req.body;

    console.log(req.body);
    const response = await signupService({
      phoneNumber,
      password,
      address,
      roleId,
      name,
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
