import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { sendYapSchema, updateYapSchema, reactYapSchema } from "../validators/yap.validator";
import * as yapService from "../services/yap.service";
import * as roomService from "../services/room.service";

export const sendYap = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const validatedData = sendYapSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.issues[0]?.message || "Validation error" });
    }

    const { roomId, content, type, replyToId } = validatedData.data;
    const userId = req.user!.id;

    const membership = await roomService.checkMembership(roomId, userId);
    if (!membership) {
      return res.status(403).json({ msg: "Tu iss room ka member nahi hai bhai" });
    }

    const yap = await yapService.sendYap(roomId, userId, content, type, replyToId);
    if (!yap) {
      return res.status(500).json({ msg: "Yap nahi bhej paaye" });
    }

    return res.status(201).json(yap);
  } catch (error) {
    console.error("Error in sendYap controller:", error);
    return res.status(500).json({ msg: "Server error ho gaya" });
  }
};

export const getRoomYaps = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.roomId as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const cursor = req.query.cursor as string;
    const userId = req.user!.id;

    const membership = await roomService.checkMembership(roomId, userId);
    if (!membership) {
      return res.status(403).json({ msg: "Andar aana mana hai" });
    }

    const yaps = await yapService.getRoomYaps(roomId, limit, cursor);
    return res.status(200).json(yaps);
  } catch (error) {
    console.error("Error in getRoomYaps controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const updateYap = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "ID toh de bhai" });

    const validatedData = updateYapSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.issues[0]?.message || "Validation error" });
    }

    const yap = await yapService.updateYap(id as string, req.user!.id, validatedData.data.content);
    if (!yap) {
      return res.status(404).json({ msg: "Yap nahi mila ya tu uska owner nahi hai" });
    }

    return res.status(200).json(yap);
  } catch (error) {
    console.error("Error in updateYap controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const deleteYap = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "ID toh de bhai" });

    const yap = await yapService.deleteYap(id as string, req.user!.id);
    if (!yap) {
      return res.status(404).json({ msg: "Yap nahi mila ya tu delete nahi kar sakta" });
    }

    return res.status(200).json({ msg: "Yap khatam" });
  } catch (error) {
    console.error("Error in deleteYap controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const reactYap = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Yap ID toh bata" });

    const validatedData = reactYapSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.issues[0]?.message || "Validation error" });
    }

    const reaction = await yapService.addReaction(id as string, req.user!.id, validatedData.data.emoji);
    return res.status(200).json(reaction);
  } catch (error) {
    console.error("Error in reactYap controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const unreactYap = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Yap ID toh bata" });

    const validatedData = reactYapSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.issues[0]?.message || "Validation error" });
    }

    await yapService.removeReaction(id as string, req.user!.id, validatedData.data.emoji);
    return res.status(200).json({ msg: "Reaction hata diya" });
  } catch (error) {
    console.error("Error in unreactYap controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

