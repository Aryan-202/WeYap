import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import appconfig from "../dotenv";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: appconfig.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: adapter });

export const login = async (_req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: "Aryan-202",
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "available nahi hai user",
      });
    }
    return res.status(200).json({
      msg: "available hai user",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, name, username, password, confirmPassword } = req.body;

  if (!username || !name || !email || !password || !confirmPassword) {
    res.status(404).json({
      msg: "dekh kuch miss ho ra",
    });
  }

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
  if (password === confirmPassword) {
    const hashpassword = bcrypt.hash(password, saltRounds);
  } else {
    return res.json({
      msg: "password match nhi kar ra",
    });
  }
};
