import { userSchema } from "@/schema/auth"
import { enrollSchema, loginSchema } from "@/schema/form"
import { z } from "zod"

// Authentication form types
export type authForm = z.infer<typeof enrollSchema>

export type User = Omit<z.infer<typeof userSchema>, "password">

export interface FormAPIResponse {
  user: User | null
  message: string
}
