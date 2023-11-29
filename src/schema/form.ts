import { z } from "zod"

export const enrollSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100)
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be over 8 characters"),
})

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100)
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  password: z.string().min(1, "Password is required"),
})

// Inferring types of either schema works
export type authForm = z.infer<typeof enrollSchema>
