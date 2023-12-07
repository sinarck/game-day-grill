import { z } from "zod"

/**
 * Schema built with Zod for validating the request body of orders
 *
 * @property restaurantId - ID of the restaurant with the order
 * @property orderId - ID of the user's order
 */
export const orderSchema = z.object({
  restaurantId: z.number().int().positive(),
  orderId: z.number().int().positive(),
})

/**
 * Schema built with Zod for validating the request body of menus
 *
 * @property restaurantId - ID of the restaurant with the menu
 */
export const menuSchema = z.object({
  restaurantId: z.number().int().positive(),
})

/**
 * Schema built with Zod for validating the request body of carts
 *
 * @property restaurantId - ID of the restaurant with the cart
 * @property orderId - ID of the user's order
 * @property itemId - ID of the item in the cart
 * @property quantity - quantity of the item in the cart
 */
export const cartSchema = z.object({
  restaurantId: z.number().int().positive(),
  userId: z.number().int().positive(),
  menuItemId: z.number().int().positive(),
  total: z.number(),
})

/**
 * Schema built with Zod for validating the request body of reservations
 *
 * @property restaurantId - ID of the restaurant with the reservation
 * @property name - name of the user with the reservation
 * @property date - date of the reservation
 * @property size - size of the reservation
 */
export const reservationsSchema = z.object({
  restaurantId: z.number().int().positive(),
  name: z.string().min(1).max(255),
  date: z
    .string()
    .or(z.date())
    .transform((arg) => new Date(arg)),
  size: z.number().int().positive(),
})
