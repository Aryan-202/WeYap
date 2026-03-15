import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "bhai naam atleast 2 character ka daal"),
  username: z.string().min(3, "bhai username atleast 3 character ka daal"),
  email: z.email("bhai sahi email de"),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string().min(3, "bhai username sahi se daal atleast 3 characters"),
  password: z.string().min(6, "bhai password sahi se daal atleast 6 characters"),
});
