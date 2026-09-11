/**
 * @fileoverview User validation schemas using Zod.
 * Defines input validation schemas for user creation and updates.
 * @module validators/user
 */

import * as z from "zod";

/**
 * Zod validation schema for user payload.
 * @type {import('zod').ZodObject<any>}
 */
const User = z.object({
  username: z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  email: z.email(),
  password: z.string().min(6).max(72),
  avatar: z.url().optional(),
  isOnline: z.boolean().optional(),
  socketId: z.string().nullable().optional(),
  friends: z.array(z.string()).optional(),
});

export const signUpSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  email: z.email(),
  password: z.string().min(8).max(72),
})

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})
