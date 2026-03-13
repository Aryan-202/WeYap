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
    return res.json({
      msg: "kuch to missing hai check kar",
    });
  }

  const isUserExisting = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const hashpassword = await prisma.user.findFirst({
    where: {
        password: password
    }
  })

  if (isUserExisting) {
    res.json({
      msg: "hai bhai tu jinda hai",
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
  return res.json({
    msg: "register kar le",
  });
};
