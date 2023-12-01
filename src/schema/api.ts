import { z } from "zod"

export const orderSchema = z.object({
  restaurantId: z.number().int().positive(),
  orderId: z.number().int().positive(),
})

export const menuSchema = z.object({
  restaurantId: z.number().int().positive(),
})

export const cartSchema = z.object(
  {
    restaurantId: z.number().int().positive(),
    orderId: z.number().int().positive(),
    itemId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  } || {}
)
