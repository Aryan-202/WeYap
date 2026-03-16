import * as z from "zod";

export const registerSchema = z
  .object({
    yapTag: z.string().min(2, "bhai naam atleast 2 character ka daal"),
    displayName: z.string().min(3, "bhai username atleast 3 character ka daal"),
    email: z.string().email("bhai sahi email de"),
    password: z.string().min(6, "bhai password atleast 6 characters ka hona chahiye"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "bhai password match nahi kar rhe",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  yapTag: z.string().min(3, "bhai username sahi se daal atleast 3 characters"),
  password: z
    .string()
    .min(6, "bhai password sahi se daal atleast 6 characters"),
});
