import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import appconfig from "../dotenv";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: appconfig.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: adapter });

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      msg: "kuch to missing hai check kar",
    });
  }

  const user = await prisma.user.findUnique({
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
    msg: "Login ho gya",
  });
};

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, name, username, password, confirmPassword } = req.body;

  if (!username || !name || !email || !password || !confirmPassword) {
    return res.status(400).json({
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

  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "password match nhi kar ra",
    });
  }

  const saltRounds = 10;
  const hashpassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
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
};
