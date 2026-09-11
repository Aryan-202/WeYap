import * as z from 'zod'

export const createConversationSchema = z.object({
    name: z.string().min(1).max(50).optional(),
  isGroup: z.boolean().default(false),
  memberIds: z.array(z.number().int().positive()).min(1), 
})

export const addMemberSchema = z.object({
    userId: z.number().int().positive()
})