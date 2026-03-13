import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import appconfig from "../dotenv";

const adapter = new PrismaPg({
  connectionString: appconfig.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: adapter });

export const login = async (_req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: 'Aryan-202'
            }
        })

        if (!user) {
            return res.status(404).json({
                msg: 'available nahi hai user'
            })
        }
        return res.status(200).json({
            msg: 'available hai user'
        })
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}