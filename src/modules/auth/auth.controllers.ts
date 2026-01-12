import { Request, Response } from "express";
import { authServices } from "./auth.services";

const SignupController = async (req: Request, res: Response) => {
  try {
    const result = await authServices.SignupService(req.body);
    return res.status(201).json({
      success: true,
      message: "Registered Successful",
      data: result,
    });
  } catch (error: any) {
    console.log(`Something Went Wrong, Here's the Detail:\n ${error.message}`);
    if (error.message === "User already exists") {
      return res.status(409).json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.LoginService(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  SignupController,
  LoginController,
};
