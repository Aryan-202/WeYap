import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { createRoomSchema, updateRoomSchema, addMemberSchema, createDMSchema } from "../validators/room.validator";
import * as roomService from "../services/room.service";

export const createRoom = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const validatedData = createRoomSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.message });
    }

    const { name, memberIds } = validatedData.data;
    const room = await roomService.createRoom(name, req.user.id, memberIds);

    if (!room) {
      return res.status(500).json({ msg: "Room nahi bana paaye bhai" });
    }

    return res.status(201).json(room);
  } catch (error) {
    console.error("Error in createRoom controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const createDM = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const validatedData = createDMSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ msg: validatedData.error.message });
        }

        const room = await roomService.createDM(req.user.id, validatedData.data.yapperId);
        if (!room) {
            return res.status(500).json({ msg: "DM nahi bana paaye bhai" });
        }

        return res.status(201).json(room);
    } catch (error) {
        console.error("Error in createDM controller:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getMyRooms = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const rooms = await roomService.getYapperRooms(req.user.id);
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in getMyRooms controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getRoomById = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    const room = await roomService.getRoomById(roomId, req.user.id);
    if (!room) {
      return res.status(404).json({ msg: "Room nahi mila ya tu uska member nahi hai" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.error("Error in getRoomById controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateRoom = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    const validatedData = updateRoomSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.message });
    }

    // Check if user is owner/admin
    const membership = await roomService.checkMembership(roomId, req.user.id);
    if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
      return res.status(403).json({ msg: "Teri aukaat nahi hai ye karne ki" });
    }

    const room = await roomService.updateRoom(roomId, validatedData.data);
    return res.status(200).json(room);
  } catch (error) {
    console.error("Error in updateRoom controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    const membership = await roomService.checkMembership(roomId, req.user.id);
    if (!membership || membership.role !== "OWNER") {
      return res.status(403).json({ msg: "Sirf owner delete kar sakta hai bhai" });
    }

    await roomService.deleteRoom(roomId);
    return res.status(200).json({ msg: "Room uda diya gaya" });
  } catch (error) {
    console.error("Error in deleteRoom controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const leaveRoom = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    await roomService.leaveRoom(roomId, req.user.id);
    return res.status(200).json({ msg: "Tu room chhod ke chala gaya, sadge" });
  } catch (error) {
    console.error("Error in leaveRoom controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const addMember = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    const validatedData = addMemberSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ msg: validatedData.error.message });
    }

    const membership = await roomService.checkMembership(roomId, req.user.id);
    if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
      return res.status(403).json({ msg: "Tu members add nahi kar sakta" });
    }

    const member = await roomService.addMember(roomId, validatedData.data.yapperId);
    return res.status(201).json(member);
  } catch (error) {
    console.error("Error in addMember controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const removeMember = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const roomId = req.params.id as string;
    const yapperId = req.params.yapperId as string;
    const membership = await roomService.checkMembership(roomId, req.user.id);
    if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
      return res.status(403).json({ msg: "Tu members remove nahi kar sakta" });
    }

    await roomService.removeMember(roomId, yapperId);
    return res.status(200).json({ msg: "Member ko laat maar di gayi" });
  } catch (error) {
    console.error("Error in removeMember controller:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
