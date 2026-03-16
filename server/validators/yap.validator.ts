import * as z from "zod";
import { YapType } from "../generated/prisma/enums";

export const sendYapSchema = z.object({
  roomId: z.string().min(1, "bhai room toh bata"),
  content: z.string().min(1, "kuch likh toh de bhai"),
  type: z.nativeEnum(YapType).optional().default(YapType.TEXT),
  replyToId: z.string().optional(),
});

export const updateYapSchema = z.object({
  content: z.string().min(1, "kuch content toh rakh bhai"),
});

export const reactYapSchema = z.object({
  emoji: z.string().min(1, "emoji toh bata bhai"),
});
