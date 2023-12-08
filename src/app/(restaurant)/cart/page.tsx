"use client"

import { useCartStore } from "@/lib/store"
import { MenuItem } from "@prisma/client"
import { useSession } from "next-auth/react"

const Page = () => {
  const { status } = useSession()
  const { cart, add, remove } = useCartStore()

  return (
    <div>
      <h1 className="text-lg font-bold tracking-wide ">
        {cart.length === 0 ? "Cart is empty" : "Cart has the following items:"}
      </h1>
      <div className="flex">
        {cart.map((item: MenuItem) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
