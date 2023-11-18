import { userSchema } from "@/schema/auth"
import { enrollSchema, loginSchema } from "@/schema/form"
import { z } from "zod"

// Authentication form types
export type enrollForm = z.infer<typeof enrollSchema>
export type loginForm = z.infer<typeof loginSchema>

export type User = Omit<z.infer<typeof userSchema>, "password">

export interface Response {
  user: User | null
  message: string
}
