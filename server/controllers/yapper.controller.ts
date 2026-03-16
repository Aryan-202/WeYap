import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { updateProfileSchema, searchYapperSchema } from "../validators/yapper.validator";

export const getMe = async (req: AuthRequest, res: Response): Promise<any> => {
  return res.status(200).json(req.user);
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const validatedData = updateProfileSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.issues[0]?.message || "Validation error" });
    }

    const updatedYapper = await prisma.yapper.update({
      where: { id: req.user!.id },
      data: validatedData.data,
    });

    return res.status(200).json(updatedYapper);
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    return res.status(500).json({ msg: "Profile update nahi ho paya" });
  }
};

export const searchYappers = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    // Fix q casting: Ensure req.query.q is treated as a string or undefined, then default to empty string
    const query = (req.query.q as string | undefined) || "";
    if (!query) {
      return res.status(400).json({ msg: "Search query toh de bhai" });
    }

    const yappers = await prisma.yapper.findMany({
      where: {
        OR: [
          { yapTag: { contains: query, mode: "insensitive" } },
          { displayName: { contains: query, mode: "insensitive" } },
        ],
        NOT: { id: req.user!.id }, // Don't show self in search
      },
      select: {
        id: true,
        yapTag: true,
        displayName: true,
        profilePic: true,
        vibe: true,
      },
      take: 10,
    });

    return res.status(200).json(yappers);
  } catch (error) {
    console.error("Error in searchYappers controller:", error);
    return res.status(500).json({ msg: "Search fail ho gaya" });
  }
};

export const getYapperByTag = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const tag = req.params.tag as string;
        const yapper = await prisma.yapper.findUnique({
            where: { yapTag: tag },
            select: {
                id: true,
                yapTag: true,
                displayName: true,
                profilePic: true,
                bio: true,
                vibe: true,
                yapStreak: true,
                createdAt: true,
            }
        });

        if (!yapper) {
            return res.status(404).json({ msg: "Ye yapper nahi mila bhai" });
        }

        return res.status(200).json(yapper);
    } catch (error) {
        console.error("Error in getYapperByTag controller:", error);
        return res.status(500).json({ msg: "Fetch fail ho gaya" });
    }
}
