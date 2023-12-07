"use client"

import { useCartStore } from "@/lib/store"

const Page = () => {
  const state = useCartStore()

  return (
    <div>
      <p>User's cart is here</p>
      {state.cart}
    </div>
  )
}

export default Page
