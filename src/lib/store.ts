import { create } from "zustand"

interface CartStore {
  cart: string[]
  add: (item: string) => void
  remove: (item: string) => void
}

const useCartStore = create<CartStore>()((set) => ({
  cart: [""],
  remove(item) {
    set((state) => ({ cart: state.cart.filter((i) => i !== item) }))
  },
  add(item) {
    set((state) => ({ cart: [...state.cart, item] }))
  },
}))
