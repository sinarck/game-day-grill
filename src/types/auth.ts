import { userSchema } from "@/schema/auth"
import { formSchema } from "@/schema/form"
import { z } from "zod"

export type Form = z.infer<typeof formSchema>

export type User = Omit<z.infer<typeof userSchema>, "password">

export interface Response {
  user: User | null
  message: string
}
