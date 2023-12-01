import { z } from "zod"

export const orderSchema = z.object({
  restaurantId: z.number().int().positive(),
  orderId: z.number().int().positive(),
})

export const menuSchema = z.object({
  restaurantId: z.number().int().positive(),
})
