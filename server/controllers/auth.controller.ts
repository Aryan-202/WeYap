import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { registerService, loginService } from "../services/auth.service";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        msg: validatedData.error.message || "Login data galat hai",
      });
    }

    const { yapTag, password } = validatedData.data;

    const result = await loginService(yapTag, password);

    if (typeof result === "string") {
      return res.status(400).json({ msg: result });
    }

    return res.status(200).json({
      msg: "login successful",
      yapper: result.yapper,
      token: result.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error ho gya",
    });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        msg: validatedData.error.message || "Registration data galat hai",
      });
    }

    const { yapTag, displayName, password, email } = validatedData.data;

    const result = await registerService(yapTag, displayName, password, email);

    if (typeof result === "string") {
      return res.status(400).json({ msg: result });
    }

    return res.status(201).json({
      msg: "register ho gya",
      yapper: result.yapper,
      token: result.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error ho gya",
    });
  }
};
