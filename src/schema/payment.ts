import { z } from "zod"

export const detailsSchema = z.object({
  fullName: z.string().min(1, "Full Name is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email").max(50),
  location: z.string().min(1, "Location is required").max(50),
})
