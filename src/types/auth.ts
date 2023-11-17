import { formSchema } from "@/schema/form"
import { z } from "zod"

export type Form = z.infer<typeof formSchema>
