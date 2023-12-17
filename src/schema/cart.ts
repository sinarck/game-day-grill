import { z } from "zod"

export const addToCartSchema = z.object({
  userId: z.number(),
})
export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
export const cartFormSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(25, "Name is too long"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  zipCode: z.string().min(5, "Zip Code is required").max(9, "Zip is too long"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
})
