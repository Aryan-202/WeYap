import prisma from "../config/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appconfig from "../dotenv";

export const registerService = async (
  yapTag: string,
  displayName: string,
  password: string,
  email: string,
) => {
  try {
    const existingYapper = await prisma.yapper.findFirst({
      where: {
        OR: [{ yapTag: yapTag }, { email: email }],
      },
    });

    if (existingYapper) {
      return existingYapper.email === email
        ? "Email pehle se system me hai"
        : "YapTag pehle se use ho rha hai";
    }

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const yapper = await prisma.yapper.create({
      data: {
        yapTag: yapTag,
        displayName: displayName,
        password: hashpassword,
        vibe: "ONLINE",
        email: email,
      },
    });

    const token = jwt.sign(
      { id: yapper.id, yapTag: yapper.yapTag },
      appconfig.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    return { yapper, token };
  } catch (error) {
    console.log(error);
    return "registration fail ho gya";
  }
};

export const loginService = async (yapTag: string, password: string) => {
  try {
    const yapper = await prisma.yapper.findUnique({
      where: {
        yapTag: yapTag,
      },
    });

    if (!yapper) {
      return "Ye Yapper nahi mila";
    }

    const isPasswordValid = await bcrypt.compare(password, yapper.password);

    if (!isPasswordValid) {
      return "Sahi password daal bhai";
    }

    await prisma.yapper.update({
      where: {
        id: yapper.id,
      },
      data: {
        lastYappedAt: new Date(),
      },
    });

    const token = jwt.sign(
      { id: yapper.id, yapTag: yapper.yapTag },
      appconfig.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    return { yapper, token };
  } catch (error) {
    console.log(error);
    return "login me error hai bhai";
  }
};

export const verifyToken = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, appconfig.JWT_SECRET as string);
    const yapper = await prisma.yapper.findUnique({
      where: {
        id: decoded.id,
      },
    });
    return yapper;
  } catch (error) {
    console.log(error);
    return null;
  }
};

