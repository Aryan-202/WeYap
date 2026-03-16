import * as z from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(3, "bhai room ka naam kam se kam 3 characters ka ho"),
  memberIds: z.array(z.string()).optional(),
  isPrivate: z.boolean().optional(),
  roomTag: z.string().optional(),
});

export const updateRoomSchema = z.object({
  name: z.string().min(3, "bhai room ka naam kam se kam 3 characters ka ho").optional(),
  isPrivate: z.boolean().optional(),
  roomTag: z.string().optional(),
});

export const addMemberSchema = z.object({
  yapperId: z.string().min(1, "bhai kisko add karna hai bata toh"),
});

export const createDMSchema = z.object({
    yapperId: z.string().min(1, "bhai kisne kisse baat karni h bata toh")
})
