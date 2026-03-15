import type { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { loginSchema, registerSchema } from "../validators/auth.validator";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        msg: validatedData.error.message,
      });
    }

    const { username, password } = validatedData.data;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "bhai tu exist nahi karta",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "bhai password galat hai",
      });
    }

    return res.json({
      msg: "login ho gya",
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
        msg: validatedData.error.message,
      });
    }

    const { email, name, username, password } = validatedData.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "bhai tu already exist karta hai",
      });
    }

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashpassword,
        email: email,
      },
    });

    return res.json({
      msg: "register ho gya",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error ho gya",
    });
  }
};
