import { CartAPIResponse } from "@/types/api"
import { MenuItem } from "@prisma/client"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type CartItem = CartAPIResponse["cart"]

interface CartStore {
  cart: MenuItem[]
  add: (item: MenuItem) => void
  remove: (item: MenuItem) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      remove(item: MenuItem) {
        set((state) => {
          const index = state.cart.findIndex(
            (cartItem) => cartItem && cartItem.id === item.id
          )
          if (index !== -1) {
            return {
              cart: [
                ...state.cart.slice(0, index),
                ...state.cart.slice(index + 1),
              ],
            }
          }
          return state
        })
      },
      add(item) {
        set((state) => ({ cart: [...state.cart, item] }))
      },
    }),
    {
      name: "cart_storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
